// Compila e executa cada solução de C# e grava a saída real em site/cs-expected.json
const fs = require("fs"), path = require("path"), { execFileSync } = require("child_process");
// SDK: variável DOTNET (caminho do dotnet.exe) ou "dotnet" no PATH
const here = path.join(__dirname, ".."), dotnet = process.env.DOTNET || "dotnet", proj = path.join(here, ".tools", "csrun");
const { EXERCISES } = require("../site/cs-data.js");
fs.mkdirSync(proj, { recursive: true });
fs.writeFileSync(path.join(proj, "csrun.csproj"), `<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup><OutputType>Exe</OutputType><TargetFramework>net8.0</TargetFramework>
  <ImplicitUsings>enable</ImplicitUsings><Nullable>enable</Nullable><InvariantGlobalization>true</InvariantGlobalization></PropertyGroup>
</Project>`);
fs.writeFileSync(path.join(proj, "Init.cs"), `static class Init { [System.Runtime.CompilerServices.ModuleInitializer] internal static void Run() => System.Console.OutputEncoding = new System.Text.UTF8Encoding(false); }`);
const env = { ...process.env, DOTNET_CLI_TELEMETRY_OPTOUT: "1", DOTNET_NOLOGO: "1", DOTNET_SKIP_FIRST_TIME_EXPERIENCE: "1" };
const only = process.argv[2];
const out = fs.existsSync(path.join(here, "site/cs-expected.json")) ? JSON.parse(fs.readFileSync(path.join(here, "site/cs-expected.json"), "utf8")) : {};
for (const e of EXERCISES) {
  if (only && e.id !== only) continue;
  fs.writeFileSync(path.join(proj, "Program.cs"), e.solution);
  try {
    execFileSync(dotnet, ["build", proj, "-o", path.join(proj, "out"), "-v", "q", "-nologo", "-clp:ErrorsOnly"], { env, stdio: "pipe" });
  } catch (err) { console.log("COMPILAÇÃO FALHOU:", e.id, "\n" + String(err.stdout)); continue; }
  const stdout = execFileSync(dotnet, [path.join(proj, "out", "csrun.dll")], { env, input: e.input ? e.input + "\n" : "", encoding: "utf8" });
  out[e.id] = stdout.replace(/\r\n/g, "\n").replace(/\s+$/, "");
  console.log(`--- ${e.id}\n${out[e.id]}`);
}
fs.writeFileSync(path.join(here, "site/cs-expected.json"), JSON.stringify(out, null, 1));
console.log("ok", Object.keys(out).length, "de", EXERCISES.length);
