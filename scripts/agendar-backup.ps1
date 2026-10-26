# Cria (ou atualiza) a tarefa agendada que roda scripts\backup.ps1 todo dia às 21h.
# Se o computador estiver desligado nesse horário, roda assim que ele for ligado.
$script = Join-Path $PSScriptRoot "backup.ps1"
$action = New-ScheduledTaskAction -Execute "powershell.exe" -Argument "-NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File `"$script`""
$trigger = New-ScheduledTaskTrigger -Daily -At 21:00
$settings = New-ScheduledTaskSettingsSet -StartWhenAvailable -RunOnlyIfNetworkAvailable -ExecutionTimeLimit (New-TimeSpan -Minutes 10)
Register-ScheduledTask -TaskName "Caderno - backup" -Action $action -Trigger $trigger -Settings $settings `
  -Description "Backup diário das contas e do progresso do Caderno de Simulados (Azure) para o OneDrive" -Force | Out-Null
Write-Host "Tarefa 'Caderno - backup' agendada para todo dia às 21h."
