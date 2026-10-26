// Lê os arquivos de exercícios em formato de seções ("=== id | nível | tipo | título" e "--- seção")
const fs = require("fs"), path = require("path");
const LIST = new Set(["reqs", "hints", "screen", "behavior"]);

// itens dos exercícios de idioma:
//   ? choice | enunciado      com "- opção" e "* opção correta"
//   ? fill | frase com ___    com "= resposta | variação aceita"
//   > explicação              say: frase para ouvir
function parseItems(body, id) {
  const items = [];
  let cur = null;
  for (const raw of body.split("\n")) {
    const line = raw.trim();
    if (!line) continue;
    const m = line.match(/^\?\s*(choice|fill)\s*\|\s*(.+)$/);
    if (m) { cur = { type: m[1], prompt: m[2], options: [], answers: [] }; items.push(cur); continue; }
    if (!cur) continue;
    if (line.startsWith("* ")) { cur.answer = cur.options.length; cur.options.push(line.slice(2)); }
    else if (line.startsWith("- ")) cur.options.push(line.slice(2));
    else if (line.startsWith("= ")) cur.answers = line.slice(2).split("|").map(s => s.trim()).filter(Boolean);
    else if (line.startsWith("> ")) cur.explain = (cur.explain ? cur.explain + " " : "") + line.slice(2);
    else if (line.startsWith("say:")) cur.say = line.slice(4).trim();
  }
  items.forEach((it, i) => {
    const where = `${id} item ${i + 1}`;
    if (it.type === "choice") {
      const right = it.options.length && it.answer != null && body.split("\n").filter(l => l.trim().startsWith("* ")).length;
      if (it.answer == null || it.options.length < 3) throw new Error(`${where}: múltipla escolha precisa de 3+ opções e uma marcada com *`);
      if (!right) throw new Error(`${where}: sem opção correta`);
    } else {
      if (!it.answers.length) throw new Error(`${where}: lacuna sem resposta (=)`);
      if ((it.prompt.match(/___/g) || []).length !== 1) throw new Error(`${where}: a frase precisa ter exatamente uma lacuna ___`);
      if (!it.say) it.say = it.prompt.replace("___", it.answers[0]).replace(/\s*\([^)]*\)\s*$/, "");
    }
  });
  // embaralha as opções de forma determinística (sempre a mesma ordem para o mesmo item) e põe
  // a correta em rodízio (A, B, C, D, A...), para ela não se concentrar numa letra
  items.forEach((it, i) => {
    if (it.type !== "choice") return;
    const rand = seeded(`${id}#${i}`);
    const order = it.options.map((_, k) => k);
    for (let k = order.length - 1; k > 0; k--) { const j = Math.floor(rand() * (k + 1)); [order[k], order[j]] = [order[j], order[k]]; }
    const target = choiceCounter++ % order.length, at = order.indexOf(it.answer);
    [order[target], order[at]] = [order[at], order[target]];
    it.options = order.map(k => it.options[k]);
    it.answer = target;
  });
  return items;
}
let choiceCounter = 0;

// gerador pseudoaleatório com semente (mulberry32 sobre um hash da string)
function seeded(str) {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) { h = Math.imul(h ^ str.charCodeAt(i), 3432918353); h = (h << 13) | (h >>> 19); }
  let a = h >>> 0;
  return () => { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}

module.exports = function parseSections(file) {
  choiceCounter = 0;
  const txt = fs.readFileSync(path.join(__dirname, file), "utf8").replace(/\r\n/g, "\n");
  return txt.split(/^=== /m).slice(1).map(block => {
    const [head, ...rest] = block.split("\n");
    const [id, level, kind, title] = head.split("|").map(s => s.trim());
    const ex = { id, level: Number(level), kind, title };
    for (const sec of rest.join("\n").split(/^--- /m).slice(1)) {
      const nl = sec.indexOf("\n");
      const name = sec.slice(0, nl).trim(), body = sec.slice(nl + 1).replace(/\s+$/, "");
      if (name === "items") ex.items = parseItems(body, id);
      else ex[name] = LIST.has(name) ? body.split("\n").filter(l => l.startsWith("- ")).map(l => l.slice(2).trim()) : body;
    }
    if (ex.starter) ex.starter += "\n";
    // gabarito (mostrado depois de 3 tentativas e usado pelo tutor)
    if (ex.kind === "quiz") {
      if (!ex.items?.length) throw new Error(`${id}: quiz sem itens`);
      ex.solution = ex.items.map((it, i) => `${i + 1}. ${it.type === "choice" ? it.options[it.answer] : it.answers[0]}`).join("\n");
    }
    if (ex.kind === "write") {
      if (!ex.reference || !ex.reqs?.length) throw new Error(`${id}: redação precisa de reqs e reference`);
      ex.solution = ex.reference;
      ex.hints ||= [
        "Releia o exemplo da lição: ele mostra a estrutura e as expressões que você pode reaproveitar.",
        "Confira um critério de cada vez no quadro “O que vai ser avaliado” e prefira frases curtas e corretas.",
      ];
    }
    return ex;
  });
};
