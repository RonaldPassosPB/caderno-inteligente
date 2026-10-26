# Caderno de Simulados

Site de estudos para as provas da Estácio: simulados comentados com alternativas A–E, trilhas práticas de
**SQL**, **C#**, **Flutter**, **inglês** e **espanhol**, tutor IA, contas com progresso salvo e trava de progresso
(o próximo exercício só libera quando você acerta o atual).

- Azure: https://caderno-simulados-ronald.azurewebsites.net
- claude.ai: https://claude.ai/artifact/1VJ2sTHUS6eRhdueRQH4CV

## Estrutura

| Pasta | O que tem |
|---|---|
| `site/` | A página (`template.html`) e o conteúdo: exercícios de SQL, C#, Flutter, T-SQL, inglês e espanhol, alternativas dos simulados |
| `azure-app/` | Servidor Node.js: entrega a página, faz a ponte com a IA (Gemini ou Claude) e guarda contas e progresso |
| `tools/` | Validação do conteúdo: roda as soluções de SQL, C# e Dart para conferir a saída esperada |
| `scripts/` | Deploy no Azure e backup diário |

Os simulados vêm dos CSVs na pasta de cima (`Simulados estacio/*.csv`).

## Como atualizar

```powershell
npm install                # uma vez, instala o sql.js para os testes
npm run build              # gera dist/caderno.html e azure-app/public/index.html
npm run test:sql           # roda todas as soluções de SQL no SQLite
.\scripts\deploy.ps1       # publica no Azure
```

A versão do claude.ai é publicada a partir de `dist/caderno.html`.

Ao mudar uma solução de C# ou Dart, atualize a saída esperada com o SDK instalado:

```powershell
$env:DOTNET = "caminho\do\dotnet.exe"; npm run expected:cs
$env:DART = "caminho\do\dart.exe"; npm run expected:dart
```

## Formato dos exercícios

- **SQL** (`sql-data.js`): solução de referência; a correção compara o resultado no SQLite. Exercícios que alteram dados usam `check`.
- **C#** (`cs-data.js`) e **Flutter** (`flutter-data.txt`): requisitos e saída esperada; a IA compila, executa e confere.
- **T-SQL**, **inglês** e **espanhol** (`*.txt`): formato em seções (`=== id | nível | tipo | título`, `--- lesson`, `--- items`...). Veja o cabeçalho de `en-data.txt`.

## Servidor (Azure App Service, plano F1 Windows)

Configurações (variáveis de ambiente do App Service):

| Nome | Para quê |
|---|---|
| `GEMINI_API_KEY` | IA do tutor e das correções (faixa gratuita do Google AI Studio) |
| `ANTHROPIC_API_KEY` | Alternativa ao Gemini, se a chave do Gemini não existir |
| `ACCESS_PASSWORD` | Senha que a página pede antes de usar a IA |
| `BACKUP_TOKEN` | Protege a rota de backup |
| `WEBSITE_NODE_DEFAULT_VERSION` | `~22` (o F1 roda em 32 bits e não tem Node 24) |

Contas e progresso ficam em `D:\home\data\caderno` no App Service (fora do `wwwroot`, então sobrevivem aos deploys).

## Backup

`scripts\backup.ps1` baixa todas as contas e o progresso para `Simulados estacio\backups` (mantém os últimos 30).
Para rodar todo dia às 21h: `.\scripts\agendar-backup.ps1`.
O token fica em `%USERPROFILE%\.caderno-backup.token`, fora do OneDrive e do Git.

Para restaurar, envie o conteúdo de um backup de volta para `D:\home\data\caderno` (pelo Kudu: `usuarios.json` e um
arquivo por usuário em `progresso\`).
