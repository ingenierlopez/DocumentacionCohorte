# Crea (o retoma) la rama de una clase desde main actualizado.
# Uso: .\scripts\iniciar-clase.ps1 4
param([Parameter(Mandatory = $true)][int]$Clase)
$ErrorActionPreference = "Stop"

Set-Location (git rev-parse --show-toplevel)
$num = "{0:D2}" -f $Clase
$linea = Get-Content scripts/clases.txt | Where-Object { $_ -like "$num *" }
if (-not $linea) { Write-Host "No existe la clase $num. Revisa scripts/clases.txt"; exit 1 }
$partes = $linea -split " ", 3
$rama = $partes[1]; $titulo = $partes[2]

if (git status --porcelain) {
  Write-Host "Tienes cambios sin guardar. Haz commit o 'git stash' antes de cambiar de clase:"
  git status --short
  exit 1
}

Write-Host "-> Actualizando main"
git switch main
git remote get-url origin *> $null
if ($LASTEXITCODE -eq 0) { git pull --ff-only } else { Write-Host "  (sin remoto 'origin': se usa main local)" }

git show-ref --verify --quiet "refs/heads/$rama"
if ($LASTEXITCODE -eq 0) {
  Write-Host "-> La rama $rama ya existe: cambio a ella"; git switch $rama
} else {
  Write-Host "-> Creando la rama $rama desde main"; git switch -c $rama
}

Write-Host ""
Write-Host "Clase $Clase · $titulo"
Write-Host "Guía: docs/clases/$rama/README.md"
Write-Host "Siguiente: abre Claude Code con 'claude' y escribe: Empecemos la clase $Clase siguiendo su guía."
