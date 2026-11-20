#!/usr/bin/env bash
# Crea (o retoma) la rama de una clase desde main actualizado.
# Uso: ./scripts/iniciar-clase.sh 4
set -euo pipefail

raiz=$(git rev-parse --show-toplevel)
cd "$raiz"

if [[ $# -ne 1 || ! "$1" =~ ^[0-9]{1,2}$ ]]; then
  echo "Uso: ./scripts/iniciar-clase.sh <número de clase 2-7>"
  exit 1
fi
num=$(printf "%02d" "$((10#$1))")
linea=$(grep "^$num " scripts/clases.txt || true)
if [[ -z "$linea" ]]; then
  echo "No existe la clase $num. Revisa scripts/clases.txt"
  exit 1
fi
rama=$(awk '{print $2}' <<<"$linea")
titulo=$(cut -d' ' -f3- <<<"$linea")

if [[ -n "$(git status --porcelain)" ]]; then
  echo "Tienes cambios sin guardar. Haz commit o 'git stash' antes de cambiar de clase:"
  git status --short
  exit 1
fi

echo "→ Actualizando main"
git switch main
if git remote get-url origin >/dev/null 2>&1; then
  git pull --ff-only
else
  echo "  (sin remoto 'origin': se usa main local)"
fi

if git show-ref --verify --quiet "refs/heads/$rama"; then
  echo "→ La rama $rama ya existe: cambio a ella"
  git switch "$rama"
else
  echo "→ Creando la rama $rama desde main"
  git switch -c "$rama"
fi

echo
echo "Clase $((10#$num)) · $titulo"
echo "Guía: docs/clases/$rama/README.md"
echo "Siguiente: abre Claude Code con 'claude' y escribe: Empecemos la clase $((10#$num)) siguiendo su guía."
