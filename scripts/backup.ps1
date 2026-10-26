# Baixa o backup de contas e progresso do Caderno (Azure) para a pasta "backups" no OneDrive.
# Roda todo dia pela tarefa agendada "Caderno - backup" (criada por scripts\agendar-backup.ps1).
# O token fica em %USERPROFILE%\.caderno-backup.token, fora do OneDrive e do Git.
$ErrorActionPreference = "Stop"
$root = Split-Path $PSScriptRoot -Parent
$dest = Join-Path (Split-Path $root -Parent) "backups"
$tokenFile = Join-Path $env:USERPROFILE ".caderno-backup.token"
New-Item -ItemType Directory -Force $dest | Out-Null

$token = (Get-Content $tokenFile -Raw).Trim()
$file = Join-Path $dest ("caderno-" + (Get-Date -Format "yyyy-MM-dd") + ".json")
Invoke-WebRequest -UseBasicParsing -TimeoutSec 120 -Headers @{ "x-backup-token" = $token } `
  -Uri "https://caderno-simulados-ronald.azurewebsites.net/api/admin/backup" -OutFile $file

# confere se veio um JSON de backup de verdade antes de apagar os antigos
$json = Get-Content $file -Raw -Encoding UTF8 | ConvertFrom-Json
if (-not $json.gerado) { throw "Backup inválido: $file" }

# guarda os últimos 30
Get-ChildItem $dest -Filter "caderno-*.json" | Sort-Object Name -Descending | Select-Object -Skip 30 | Remove-Item
Write-Host "Backup salvo: $file ($(@($json.usuarios.PSObject.Properties).Count) contas)"
