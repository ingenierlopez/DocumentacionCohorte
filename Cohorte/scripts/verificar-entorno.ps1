# Revisa que el equipo (Windows) tenga lo necesario para el curso.
# Uso: .\scripts\verificar-entorno.ps1
$fallos = 0
if (Get-Command git -ErrorAction SilentlyContinue) { Set-Location (git rev-parse --show-toplevel) }
function Ok($n, $t)  { Write-Host ("  OK  {0,-12} {1}" -f $n, $t) -ForegroundColor Green }
function Mal($n, $t) { Write-Host ("  X   {0,-12} {1}" -f $n, $t) -ForegroundColor Red; $script:fallos++ }

Write-Host "Herramientas obligatorias"
foreach ($h in "git", "node", "npm", "jq", "claude", "gh") {
  if (Get-Command $h -ErrorAction SilentlyContinue) { Ok $h ((& $h --version 2>$null | Select-Object -First 1)) }
  else { Mal $h "no está instalado (ver docs/setup.md)" }
}

$bash = "C:\Program Files\Git\bin\bash.exe"
if (Test-Path $bash) { Ok "git bash" $bash } else { Mal "git bash" "instala Git for Windows: Claude Code y los hooks lo necesitan" }

if (Get-Command node -ErrorAction SilentlyContinue) {
  $mayor = [int](node -p "process.versions.node.split('.')[0]")
  if ($mayor -lt 20) { Mal "node" "se necesita la versión 20 o superior (tienes $mayor)" }
}
if (Get-Command gh -ErrorAction SilentlyContinue) {
  gh auth status *> $null
  if ($LASTEXITCODE -eq 0) { Ok "gh auth" "sesión iniciada en GitHub" } else { Mal "gh auth" "ejecuta: gh auth login" }
}

Write-Host ""
Write-Host "Para la clase 7 (puedes instalarlas después)"
foreach ($h in "docker", "terraform", "k6") {
  if (Get-Command $h -ErrorAction SilentlyContinue) { Ok $h ((& $h --version 2>$null | Select-Object -First 1)) }
  else { Write-Host ("  ·   {0,-12} pendiente (ver docs/setup.md)" -f $h) }
}
Write-Host ""
if ($fallos -eq 0) { Write-Host "Todo listo para empezar." } else { Write-Host "$fallos problema(s) por resolver. Guía: docs/setup.md"; exit 1 }
