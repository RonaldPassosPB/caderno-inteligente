# Gera a página e publica o servidor no Azure (Web App caderno-simulados-ronald).
# Uso: .\scripts\deploy.ps1
# As dependências são instaladas numa pasta temporária, para o node_modules não ir para o OneDrive.
$ErrorActionPreference = "Stop"
$root = Split-Path $PSScriptRoot -Parent
$app = "caderno-simulados-ronald"
$rg = "rg-coachcenter"

$az = (Get-Command az -ErrorAction SilentlyContinue).Source
if (-not $az) { $az = "C:\Program Files\Microsoft SDKs\Azure\CLI2\wbin\az.cmd" }

Write-Host "1/3 Gerando a página..."
node "$root\site\build.js"
if ($LASTEXITCODE -ne 0) { throw "O build falhou." }

Write-Host "2/3 Montando o pacote..."
$tmp = Join-Path $env:TEMP "caderno-deploy"
Remove-Item -Recurse -Force $tmp -ErrorAction SilentlyContinue
New-Item -ItemType Directory $tmp | Out-Null
Copy-Item "$root\azure-app\*" $tmp -Recurse -Exclude "node_modules", "data"
Push-Location $tmp
npm ci --omit=dev --no-audit --no-fund
if ($LASTEXITCODE -ne 0) { Pop-Location; throw "npm ci falhou." }
Pop-Location
$zip = Join-Path $env:TEMP "caderno-app.zip"
Compress-Archive -Path "$tmp\*" -DestinationPath $zip -Force

Write-Host "3/3 Publicando no Azure..."
& $az webapp deploy -g $rg -n $app --src-path $zip --type zip --only-show-errors -o none
if ($LASTEXITCODE -ne 0) { throw "O deploy falhou." }
Write-Host "Publicado: https://$app.azurewebsites.net"
