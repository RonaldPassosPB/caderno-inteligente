// Caderno de Simulados: serve a página e faz a ponte com a IA
// (tutor e correção de C#, Flutter e T-SQL).
//
// Variáveis de ambiente (Configurações do App Service):
//   GEMINI_API_KEY     chave do Google AI Studio (tem prioridade)
//   ANTHROPIC_API_KEY  chave da API da Anthropic (usada se não houver a do Gemini)
//   ACCESS_PASSWORD    senha que a página pede antes de usar a IA
//   GEMINI_MODEL       opcional: troca o modelo Gemini principal
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import Anthropic from "@anthropic-ai/sdk";
import { GoogleGenAI, ApiError as GeminiApiError, ThinkingLevel } from "@google/genai";

const here = path.dirname(fileURLToPath(import.meta.url));
const PAGE = fs.readFileSync(path.join(here, "public", "index.html"));
// no App Service Windows (iisnode) a "porta" é um named pipe, por isso não converte para número
const PORT = process.env.PORT || 8080;
const MAX_BODY = 400 * 1024;
const MAX_BODY_IMAGES = 14 * 1024 * 1024;   // pedidos de IA com prints (até 6 imagens reduzidas)
const MAX_OUTPUT = 16000;

// o "nível" que a página pede (quick, default, complex) vira modelo + quanto ele raciocina
const CLAUDE_MODEL = "claude-opus-5-5";
const CLAUDE_EFFORT = { quick: "low", default: "medium", complex: "high" };
// gemini-3.8-flash não respondia na faixa gratuita (2026-10-26); o 3.6 responde em ~1,5 s.
// Cada nível tem uma lista: se um modelo não começa a responder a tempo ou está sobrecarregado,
// o servidor tenta o próximo.
const GEMINI_MAIN = process.env.GEMINI_MODEL || "gemini-3.6-flash";
const GEMINI_BACKUPS = ["gemini-3.6-flash", "gemini-3.5-flash-lite"];
const chain = first => [...new Set([first, ...GEMINI_BACKUPS])];
const GEMINI = {
  quick: { models: ["gemini-3.5-flash-lite", "gemini-3.6-flash"], thinking: ThinkingLevel.LOW },
  default: { models: chain(GEMINI_MAIN), thinking: ThinkingLevel.MEDIUM },
  complex: { models: chain(GEMINI_MAIN), thinking: ThinkingLevel.HIGH },
};
// tempo máximo até a primeira palavra, por nível: no "complex" o modelo pensa bastante antes de
// responder (ler prints levou ~35 s), então o limite é maior
const FIRST_TOKEN_TIMEOUT = { quick: 20000, default: 45000, complex: 120000 };
const GEMINI_REFUSAL = new Set(["SAFETY", "RECITATION", "BLOCKLIST", "PROHIBITED_CONTENT", "SPII", "IMAGE_SAFETY", "IMAGE_PROHIBITED_CONTENT"]);

// GEMINI_BASE_URL só é usado em testes locais, para apontar para uma API falsa
const gemini = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY, ...(process.env.GEMINI_BASE_URL ? { httpOptions: { baseUrl: process.env.GEMINI_BASE_URL } } : {}) })
  : null;
const client = !gemini && process.env.ANTHROPIC_API_KEY ? new Anthropic() : null;
const provider = gemini ? "gemini" : client ? "claude" : null;
const password = process.env.ACCESS_PASSWORD || "";

// limite simples por IP e por tipo de chamada (ex.: 40 chamadas de IA a cada 10 minutos)
const hits = new Map();
function rateLimited(ip, kind = "ia", max = 40) {
  const now = Date.now(), win = 10 * 60 * 1000, key = kind + "|" + ip;
  const list = (hits.get(key) || []).filter(t => now - t < win);
  list.push(now);
  hits.set(key, list);
  return list.length > max;
}
const clientIp = req => String(req.headers["x-forwarded-for"] || req.socket.remoteAddress || "").split(",")[0].trim();

// ---------- contas e progresso ----------
// Arquivos JSON numa pasta que sobrevive a reinícios e deploys: no App Service, %HOME%\data
// (fica fora do wwwroot, que é substituído a cada deploy).
const DATA_DIR = process.env.DATA_DIR
  || (process.env.WEBSITE_SITE_NAME && process.env.HOME ? path.join(process.env.HOME, "data", "caderno") : path.join(here, "data"));
const PROGRESS_DIR = path.join(DATA_DIR, "progresso");
fs.mkdirSync(PROGRESS_DIR, { recursive: true });
const USERS_FILE = path.join(DATA_DIR, "usuarios.json");
const MAX_STATE = 600 * 1024;

function readJson(file, fallback) {
  try { return JSON.parse(fs.readFileSync(file, "utf8")); } catch { return fallback; }
}
// grava num arquivo temporário e renomeia, para nunca deixar um JSON pela metade
function writeJson(file, data) {
  const tmp = file + "." + process.pid + ".tmp";
  fs.writeFileSync(tmp, JSON.stringify(data));
  fs.renameSync(tmp, file);
}

const SECRET = process.env.SESSION_SECRET || (() => {
  const file = path.join(DATA_DIR, "segredo.txt");
  try { return fs.readFileSync(file, "utf8").trim(); } catch {}
  const s = crypto.randomBytes(32).toString("hex");
  fs.writeFileSync(file, s);
  return s;
})();

const normUser = u => String(u || "").trim().toLowerCase();
const validUser = u => /^[a-z0-9._-]{3,30}$/.test(u);
const hashPass = (pass, salt) => crypto.scryptSync(String(pass), salt, 32).toString("hex");

// sessão: "<dados em base64url>.<assinatura HMAC>", válida por 180 dias
function makeToken(user) {
  const body = Buffer.from(JSON.stringify({ u: user, exp: Date.now() + 180 * 24 * 3600 * 1000 })).toString("base64url");
  const sig = crypto.createHmac("sha256", SECRET).update(body).digest("base64url");
  return body + "." + sig;
}
function tokenUser(req) {
  const m = String(req.headers.authorization || "").match(/^Bearer (.+)\.(.+)$/);
  if (!m) return null;
  const expected = crypto.createHmac("sha256", SECRET).update(m[1]).digest("base64url");
  if (expected.length !== m[2].length || !crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(m[2]))) return null;
  try {
    const { u, exp } = JSON.parse(Buffer.from(m[1], "base64url").toString("utf8"));
    return exp > Date.now() && readJson(USERS_FILE, {})[u] ? u : null;
  } catch { return null; }
}
const progressFile = user => path.join(PROGRESS_DIR, encodeURIComponent(user) + ".json");

async function handleAccount(req, res, action) {
  if (rateLimited(clientIp(req), "conta", 20)) return sendJson(res, 429, { code: "rate_limited", message: "Muitas tentativas. Espere alguns minutos." });
  let body;
  try { body = JSON.parse(await readBody(req)); } catch { return sendJson(res, 400, { code: "invalid_request" }); }
  const user = normUser(body.usuario), pass = String(body.senha || "");
  if (!validUser(user)) return sendJson(res, 400, { code: "usuario_invalido", message: "Use de 3 a 30 letras minúsculas, números, ponto, hífen ou sublinhado." });
  if (pass.length < 6) return sendJson(res, 400, { code: "senha_curta", message: "A senha precisa ter pelo menos 6 caracteres." });
  const users = readJson(USERS_FILE, {});
  if (action === "criar") {
    if (users[user]) return sendJson(res, 409, { code: "usuario_existe", message: "Esse nome de usuário já existe. Escolha outro ou entre na conta." });
    const salt = crypto.randomBytes(16).toString("hex");
    users[user] = { salt, hash: hashPass(pass, salt), criado: new Date().toISOString() };
    writeJson(USERS_FILE, users);
  } else {
    const u = users[user];
    const ok = u && crypto.timingSafeEqual(Buffer.from(hashPass(pass, u.salt), "hex"), Buffer.from(u.hash, "hex"));
    if (!ok) return sendJson(res, 401, { code: "login_invalido", message: "Usuário ou senha incorretos." });
  }
  sendJson(res, 200, { token: makeToken(user), usuario: user });
}

// backup: todas as contas e todo o progresso num JSON só. Protegido pelo token BACKUP_TOKEN
// (configuração do App Service); o script scripts/backup.ps1 baixa isso todo dia.
function handleBackup(req, res) {
  const token = process.env.BACKUP_TOKEN || "";
  const given = String(req.headers["x-backup-token"] || "");
  const a = crypto.createHash("sha256").update(given).digest(), b = crypto.createHash("sha256").update(token).digest();
  if (!token || !crypto.timingSafeEqual(a, b)) return sendJson(res, 401, { code: "nao_autorizado" });
  const progresso = {};
  for (const f of fs.readdirSync(PROGRESS_DIR).filter(f => f.endsWith(".json"))) {
    progresso[decodeURIComponent(f.slice(0, -5))] = readJson(path.join(PROGRESS_DIR, f), null);
  }
  sendJson(res, 200, { gerado: new Date().toISOString(), usuarios: readJson(USERS_FILE, {}), progresso });
}

async function handleProgress(req, res) {
  const user = tokenUser(req);
  if (!user) return sendJson(res, 401, { code: "sessao_invalida" });
  if (req.method === "GET") {
    const saved = readJson(progressFile(user), null);
    return sendJson(res, 200, { usuario: user, state: saved?.state ?? null, atualizado: saved?.atualizado ?? null });
  }
  let body;
  try { body = JSON.parse(await readBody(req, MAX_STATE)); } catch (err) { return sendJson(res, 400, { code: err.code || "invalid_request" }); }
  if (!body || typeof body.state !== "object" || Array.isArray(body.state)) return sendJson(res, 400, { code: "invalid_request" });
  const atualizado = new Date().toISOString();
  writeJson(progressFile(user), { state: body.state, atualizado });
  sendJson(res, 200, { ok: true, atualizado });
}

function passwordOk(given) {
  if (!password) return false;
  const a = crypto.createHash("sha256").update(String(given || "")).digest();
  const b = crypto.createHash("sha256").update(password).digest();
  return crypto.timingSafeEqual(a, b);
}

function sendJson(res, status, body) {
  res.writeHead(status, { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" });
  res.end(JSON.stringify(body));
}

function readBody(req, limit = MAX_BODY) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on("data", c => {
      size += c.length;
      if (size > limit) { reject(Object.assign(new Error("too large"), { code: "prompt_too_large" })); req.destroy(); return; }
      chunks.push(c);
    });
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

// valida as mensagens vindas da página: só papéis user/assistant, texto não vazio,
// começando e terminando em user
function cleanMessages(raw) {
  if (!Array.isArray(raw) || !raw.length) return null;
  const msgs = raw
    .filter(m => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string" && m.content.trim())
    .map(m => ({ role: m.role, content: m.content }));
  if (!msgs.length || msgs[0].role !== "user" || msgs[msgs.length - 1].role !== "user") return null;
  return msgs;
}

function errorCode(err) {
  if (err instanceof GeminiApiError) {
    if (err.status === 429) return "rate_limited";
    if (err.status === 401 || err.status === 403) return "server_misconfigured";
    if (err.status === 400) return "invalid_request";
    return "upstream_error";
  }
  if (err instanceof Anthropic.RateLimitError) return "rate_limited";
  if (err instanceof Anthropic.AuthenticationError) return "server_misconfigured";
  if (err instanceof Anthropic.PermissionDeniedError) return "server_misconfigured";
  if (err instanceof Anthropic.BadRequestError) return "invalid_request";
  return "upstream_error";
}

// Gemini: "assistant" vira "model" e turnos seguidos do mesmo papel são juntados
function geminiContents(messages) {
  const out = [];
  for (const m of messages) {
    const role = m.role === "assistant" ? "model" : "user";
    const last = out[out.length - 1];
    if (last && last.role === role) last.parts[0].text += "\n\n" + m.content;
    else out.push({ role, parts: [{ text: m.content }] });
  }
  return out;
}

// cada função recebe write({t:"delta"}) e devolve {truncated} ou {refused}
async function streamGemini(messages, tier, write, signal, images) {
  const { models, thinking } = GEMINI[tier] || GEMINI.default;
  const contents = geminiContents(messages);
  // imagens (prints) entram antes do texto da última mensagem
  if (images.length) contents[contents.length - 1].parts.unshift(...images.map(i => ({ inlineData: { mimeType: i.mimeType, data: i.data } })));
  let lastErr;
  for (const model of models) {
    // cancela se a página desistir ou se o modelo não mandar nada a tempo
    const ctl = new AbortController();
    const onAbort = () => ctl.abort();
    signal.addEventListener("abort", onAbort);
    let started = false, timedOut = false;
    const timer = setTimeout(() => { if (!started) { timedOut = true; ctl.abort(); } }, FIRST_TOKEN_TIMEOUT[tier] || FIRST_TOKEN_TIMEOUT.default);
    try {
      const response = await gemini.models.generateContentStream({
        model, contents,
        config: { maxOutputTokens: MAX_OUTPUT, thinkingConfig: { thinkingLevel: thinking }, abortSignal: ctl.signal },
      });
      let finish = null, blocked = false;
      for await (const chunk of response) {
        started = true;
        if (chunk.promptFeedback?.blockReason) blocked = true;
        const text = chunk.text;
        if (text) write({ t: "delta", text });
        finish = chunk.candidates?.[0]?.finishReason || finish;
      }
      return { refused: blocked || GEMINI_REFUSAL.has(finish), truncated: finish === "MAX_TOKENS" };
    } catch (err) {
      if (signal.aborted) throw err;
      // só troca de modelo se nada foi escrito ainda e o problema é do modelo (demora, sobrecarga, indisponível)
      const retryable = timedOut || (err instanceof GeminiApiError && [404, 429, 500, 503].includes(err.status));
      if (started || !retryable) throw err;
      console.error(`Gemini: ${model} ${timedOut ? "não respondeu a tempo" : "falhou (" + err.status + ")"}; tentando o próximo`);
      lastErr = err;
    } finally {
      clearTimeout(timer);
      signal.removeEventListener("abort", onAbort);
    }
  }
  throw lastErr || new Error("nenhum modelo Gemini respondeu");
}

async function streamClaude(messages, tier, write, signal, images) {
  if (images.length) {
    const last = messages[messages.length - 1];
    messages = [...messages.slice(0, -1), { role: "user", content: [
      ...images.map(i => ({ type: "image", source: { type: "base64", media_type: i.mimeType, data: i.data } })),
      { type: "text", text: last.content },
    ] }];
  }
  const stream = client.beta.messages.stream({
    model: CLAUDE_MODEL,
    max_tokens: MAX_OUTPUT,
    output_config: { effort: CLAUDE_EFFORT[tier] || CLAUDE_EFFORT.default },
    cache_control: { type: "ephemeral" },
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
    messages,
  }, { signal });
  stream.on("text", delta => write({ t: "delta", text: delta }));
  const final = await stream.finalMessage();
  return { refused: final.stop_reason === "refusal", truncated: final.stop_reason === "max_tokens" };
}

async function handleSample(req, res) {
  if (!provider) return sendJson(res, 503, { code: "server_misconfigured", message: "Nenhuma chave de IA configurada (GEMINI_API_KEY ou ANTHROPIC_API_KEY)" });
  if (!passwordOk(req.headers["x-access-key"])) return sendJson(res, 401, { code: "bad_password" });
  if (rateLimited(clientIp(req))) return sendJson(res, 429, { code: "rate_limited" });

  let body;
  try { body = JSON.parse(await readBody(req, MAX_BODY_IMAGES)); }
  catch (err) { return sendJson(res, 400, { code: err.code || "invalid_request" }); }
  const messages = cleanMessages(body.messages);
  if (!messages) return sendJson(res, 400, { code: "invalid_request" });
  const tier = ["quick", "default", "complex"].includes(body.tier) ? body.tier : "default";
  // prints para importar simulados: até 6 por pedido, só imagens
  const images = (Array.isArray(body.images) ? body.images : [])
    .filter(i => i && /^image\/(jpeg|png|webp|gif)$/.test(i.mimeType) && typeof i.data === "string" && /^[A-Za-z0-9+/=]+$/.test(i.data.slice(0, 200)));
  if (images.length > 6) return sendJson(res, 400, { code: "image_rejected", message: "No máximo 6 imagens por pedido." });

  // resposta em NDJSON: uma linha por evento ({t:"delta"}, {t:"done"} ou {t:"error"})
  res.writeHead(200, { "content-type": "application/x-ndjson; charset=utf-8", "cache-control": "no-store", "x-accel-buffering": "no" });
  const write = obj => res.write(JSON.stringify(obj) + "\n");

  const abort = new AbortController();
  res.on("close", () => { if (!res.writableFinished) abort.abort(); });

  try {
    const run = provider === "gemini" ? streamGemini : streamClaude;
    const result = await run(messages, tier, write, abort.signal, images);
    if (result.refused) write({ t: "error", code: "refused" });
    else write({ t: "done", truncated: result.truncated });
  } catch (err) {
    if (abort.signal.aborted) return res.end();
    console.error(`Erro na API (${provider}):`, err?.status, err?.message);
    write({ t: "error", code: errorCode(err) });
  }
  res.end();
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost");
  try {
    if (req.method === "GET" && (url.pathname === "/" || url.pathname === "/index.html")) {
      res.writeHead(200, { "content-type": "text/html; charset=utf-8", "cache-control": "no-cache" });
      return res.end(PAGE);
    }
    if (req.method === "GET" && url.pathname === "/api/health") {
      return sendJson(res, 200, { ok: true, ai: !!provider && !!password, provider, contas: true });
    }
    if (req.method === "POST" && url.pathname === "/api/sample") return await handleSample(req, res);
    if (req.method === "POST" && url.pathname === "/api/conta/criar") return await handleAccount(req, res, "criar");
    if (req.method === "POST" && url.pathname === "/api/conta/entrar") return await handleAccount(req, res, "entrar");
    if ((req.method === "GET" || req.method === "PUT") && url.pathname === "/api/progresso") return await handleProgress(req, res);
    if (req.method === "GET" && url.pathname === "/api/admin/backup") return handleBackup(req, res);
    sendJson(res, 404, { code: "not_found" });
  } catch (err) {
    console.error(err);
    if (!res.headersSent) sendJson(res, 500, { code: "upstream_error" });
    else res.end();
  }
});

server.listen(PORT, () => console.log(`Caderno de Simulados ouvindo na porta ${PORT}`));
