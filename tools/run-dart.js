// Executa as soluções Dart da trilha de Flutter e grava a saída real; checa sintaxe das soluções Flutter
const fs = require("fs"), path = require("path"), { execFileSync, spawnSync } = require("child_process");
// SDK: variável DART (caminho do dart.exe) ou "dart" no PATH
const here = path.join(__dirname, ".."), dart = process.env.DART || "dart", dir = path.join(here, ".tools", "dartrun");
const { EXERCISES } = require("../site/flutter-data.js");
fs.mkdirSync(dir, { recursive: true });
const out = {};
for (const e of EXERCISES) {
  const file = path.join(dir, e.id.replace(/-/g, "_") + ".dart");
  fs.writeFileSync(file, e.solution);
  if (e.kind === "dart") {
    const r = spawnSync(dart, ["run", file], { encoding: "utf8" });
    if (r.status !== 0) { console.log("FALHOU", e.id, r.stderr || r.stdout); continue; }
    out[e.id] = r.stdout.replace(/\r\n/g, "\n").replace(/\s+$/, "");
    console.log(`--- ${e.id}\n${out[e.id]}`);
  }
}
fs.writeFileSync(path.join(here, "site/flutter-expected.json"), JSON.stringify(out, null, 1));
console.log("dart ok:", Object.keys(out).length, "de", EXERCISES.filter(e => e.kind === "dart").length, "| total:", EXERCISES.length,
  "| níveis:", [1, 2, 3, 4].map(l => EXERCISES.filter(e => e.level === l).length).join("/"));
