#!/usr/bin/env bash
# Revisa que el equipo tenga lo necesario para el curso.
# Uso: ./scripts/verificar-entorno.sh
fallos=0
ok()   { printf "  ✔ %-12s %s\n" "$1" "$2"; }
mal()  { printf "  ✘ %-12s %s\n" "$1" "$2"; fallos=$((fallos+1)); }

echo "Herramientas obligatorias"
for h in git node npm jq claude gh; do
  if command -v "$h" >/dev/null 2>&1; then
    v=$("$h" --version 2>/dev/null | head -1)
    ok "$h" "$v"
  else
    mal "$h" "no está instalado (ver docs/setup.md)"
  fi
done

if command -v node >/dev/null 2>&1; then
  mayor=$(node -p 'process.versions.node.split(".")[0]')
  (( mayor >= 20 )) || mal "node" "se necesita la versión 20 o superior (tienes $mayor)"
fi

if command -v gh >/dev/null 2>&1; then
  if gh auth status >/dev/null 2>&1; then ok "gh auth" "sesión iniciada en GitHub"; else mal "gh auth" "ejecuta: gh auth login"; fi
fi

if git config user.email >/dev/null; then ok "git user" "$(git config user.name) <$(git config user.email)>"; else mal "git user" "configura git config --global user.name / user.email"; fi

echo
echo "Para la clase 7 (puedes instalarlas después)"
for h in docker terraform k6; do
  if command -v "$h" >/dev/null 2>&1; then
    ok "$h" "$("$h" --version 2>/dev/null | head -1)"
  else
    printf "  · %-12s %s\n" "$h" "pendiente (ver docs/setup.md)"
  fi
done
echo
if (( fallos == 0 )); then echo "Todo listo para empezar."; else echo "$fallos problema(s) por resolver. Guía: docs/setup.md"; exit 1; fi
