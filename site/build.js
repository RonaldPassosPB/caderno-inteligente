// Monta a página do Caderno a partir dos CSVs da pasta de simulados e dos arquivos de exercícios.
// Uso: node site/build.js [pasta dos CSVs]   (padrão: a pasta "Simulados estacio", dois níveis acima)
// Saídas: dist/caderno.html (claude.ai) e azure-app/public/index.html (Azure)
const fs = require("fs");
const path = require("path");

const here = __dirname;
const srcDir = process.argv[2] || path.join(here, "..", "..");
const distDir = path.join(here, "..", "dist");

const SUBJECTS = [
  { id: "bd", name: "Processamento Paralelo e Distribuído em BD", short: "BD Paralelo e Distribuído", file: "Processamento Paralelo e Distribuído em BD.csv" },
  { id: "ia", name: "Inteligência Artificial para Devs", short: "IA para Devs", json: "ia.json" },
  { id: "alg", name: "Algoritmos e Complexidade", short: "Algoritmos", file: "Algoritmos e Complexidade - SM1.csv" },
  { id: "dc", name: "Gestão de Infraestrutura de Datacenter", short: "Datacenter", file: "Gestão de Infraestrutura de Datacenter.csv" },
  { id: "cobit", name: "Implantação de Governança com COBIT", short: "COBIT", file: "Implantação de Governança com COBIT.csv" },
];

function parseCsv(file) {
  const text = fs.readFileSync(file, "utf8").replace(/^﻿/, "");
  const rows = [];
  for (const line of text.split(/\r?\n/).slice(1)) {
    if (!line.trim()) continue;
    // a pergunta pode conter ";", então ancoramos na letra da resposta
    const m = line.match(/^(\d+);(.*?);([A-E]);(.*)$/);
    if (!m) throw new Error(`Linha não reconhecida em ${file}: ${line.slice(0, 80)}`);
    const rest = m[4];
    const cut = rest.indexOf(";");
    rows.push({ n: m[1], q: m[2], r: m[3], c: rest.slice(0, cut), j: rest.slice(cut + 1) });
  }
  return rows.sort((a, b) => Number(a.n) - Number(b.n));
}

const data = SUBJECTS.map(({ file, json, ...s }) => ({
  ...s,
  questions: file
    ? parseCsv(path.join(srcDir, file))
    : JSON.parse(fs.readFileSync(path.join(here, json), "utf8")),
}));

// alternativas A–E transcritas dos prints; a letra correta é a da alternativa cujo texto
// mais se parece com a "Alternativa correta" do CSV (a ordem pode mudar entre tentativas da prova)
const ALTS = JSON.parse(fs.readFileSync(path.join(here, "alternativas.json"), "utf8"));
const words = s => new Set(s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().match(/[a-z0-9]+/g) || []);
const overlap = (a, b) => { const A = words(a), B = words(b); let n = 0; for (const w of A) if (B.has(w)) n++; return n / Math.max(A.size, B.size, 1); };
for (const s of data) {
  // matérias sem print: alternativas erradas escritas para treino (a correta é a do CSV)
  if ((ALTS._geradas || []).includes(s.id)) s.altsGenerated = true;
  for (const q of s.questions) {
    const opts = ALTS[s.id]?.[q.n];
    if (!opts) continue;
    if (opts.length !== 5) throw new Error(`${s.id} ${q.n}: esperava 5 alternativas`);
    // texto idêntico primeiro (alternativas que só diferem por símbolos ou ordem, como "+" e "*");
    // se não houver, a mais parecida por palavras
    const same = s => s.toLowerCase().replace(/\s+/g, " ").replace(/[.\s]+$/, "").trim();
    const scores = opts.map(o => overlap(o, q.c));
    const exact = opts.findIndex(o => same(o) === same(q.c));
    const best = exact >= 0 ? exact : scores.indexOf(Math.max(...scores)), letter = "ABCDE"[best];
    if (exact < 0 && scores[best] < 0.6) throw new Error(`${s.id} ${q.n}: alternativa correta não encontrada (${q.c})`);
    if (letter !== q.r) console.log(`  ${s.id} ${q.n}: letra ajustada de ${q.r} para ${letter} (ordem das alternativas do print)`);
    q.opts = opts;
    q.r = letter;
  }
}

for (const s of data) console.log(s.id, s.questions.length, s.questions.map((q) => q.n + q.r + (q.opts ? "*" : "")).join(" "));

const tpl = fs.readFileSync(path.join(here, "template.html"), "utf8");
const { SEED, EXERCISES } = require("./sql-data.js");
console.log("sql", EXERCISES.length, "exercícios");
const inline = v => JSON.stringify(v).replace(/<\//g, "<\\/");
// trilhas de código: a saída esperada vem da execução real (run-cs.js / run-dart.js)
const withExpected = (exs, file, kind) => {
  const exp = JSON.parse(fs.readFileSync(path.join(here, file), "utf8"));
  return exs.map(e => {
    const k = e.kind || kind;
    if (k !== "flutter" && exp[e.id] == null) throw new Error(`Sem saída esperada para ${e.id}`);
    return { ...e, kind: k, expected: k === "flutter" ? undefined : exp[e.id] };
  });
};
const CS = withExpected(require("./cs-data.js").EXERCISES, "cs-expected.json", "cs");
const FL = withExpected(require("./flutter-data.js").EXERCISES, "flutter-expected.json");
console.log("cs", CS.length, "| flutter", FL.length);
const out = tpl
  .replace("/*__DATA__*/null", () => inline(data))
  .replace("/*__SQL__*/null", () => inline({ SEED, EXERCISES: [...EXERCISES, ...require("./tsql-data.js").EXERCISES] }))
  .replace("/*__CS__*/null", () => inline(CS))
  .replace("/*__FL__*/null", () => inline(FL))
  .replace("/*__EN__*/null", () => inline(require("./en-data.js").EXERCISES))
  .replace("/*__ES__*/null", () => inline(require("./es-data.js").EXERCISES));
fs.mkdirSync(distDir, { recursive: true });
fs.writeFileSync(path.join(distDir, "caderno.html"), out);

// versão para o Azure: documento completo (no claude.ai o esqueleto é adicionado na publicação)
const azurePublic = path.join(here, "..", "azure-app", "public");
fs.mkdirSync(azurePublic, { recursive: true });
fs.writeFileSync(path.join(azurePublic, "index.html"),
  `<!doctype html>\n<html lang="pt-BR">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n</head>\n<body>\n${out}\n</body>\n</html>\n`);
console.log("ok", out.length, "bytes");
