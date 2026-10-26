// Compila e executa cada solução de Java e grava a saída real em site/java-expected.json
const fs = require("fs"), path = require("path"), { execFileSync } = require("child_process");
// JDK 21+: variável JAVA (caminho do java.exe) ou "java" no PATH
const here = path.join(__dirname, ".."), java = process.env.JAVA || "java", dir = path.join(here, ".tools", "javarun");
const { EXERCISES } = require("../site/java-data.js");
fs.mkdirSync(dir, { recursive: true });
// locale en-US: printf("%.2f") sai com ponto, como a correção espera
const flags = ["-Duser.language=en", "-Duser.country=US", "-Dfile.encoding=UTF-8", "-Dstdout.encoding=UTF-8", "-Dstderr.encoding=UTF-8"];
const only = process.argv[2];
const file = path.join(here, "site/java-expected.json");
const out = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, "utf8")) : {};
let falhas = 0;
for (const e of EXERCISES) {
  if (only && e.id !== only) continue;
  if (!/public\s+class\s+Main\b/.test(e.solution)) { console.log("SEM public class Main:", e.id); falhas++; continue; }
  fs.writeFileSync(path.join(dir, "Main.java"), e.solution);
  let stdout;
  try {
    stdout = execFileSync(java, [...flags, path.join(dir, "Main.java")], { input: e.input ? e.input + "\n" : "", encoding: "utf8", stdio: ["pipe", "pipe", "pipe"] });
  } catch (err) { console.log("FALHOU:", e.id, "\n" + String(err.stderr || err.message)); falhas++; continue; }
  out[e.id] = stdout.replace(/\r\n/g, "\n").replace(/\s+$/, "");
  console.log(`--- ${e.id}\n${out[e.id]}`);
}
fs.writeFileSync(file, JSON.stringify(out, null, 1));
console.log("ok", Object.keys(out).length, "de", EXERCISES.length, falhas ? `(${falhas} falhas)` : "");
if (falhas) process.exitCode = 1;
