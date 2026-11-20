# Harness de referencia

Solución de la **clase 5 (Taller agéntico)**. No está activo: vive aquí y no en `.claude/` para que cada estudiante construya el suyo en clase. Úsalo para comparar o para rescatarte si te atrasas.

| Archivo | Qué es | Se arma en |
|---|---|---|
| `settings.json` | Registro de los dos hooks | Clase 5 · Paso 3 |
| `hooks/estado-actual.sh` | Hook `SessionStart`: inyecta la rama y la tabla "Estado actual" de `CONTEXT.md` | Clase 5 · Paso 3 |
| `hooks/proteger-git.sh` | Hook `PreToolUse` (guardarraíl): bloquea commit/push en `main`, merge y `push --force` | Clase 5 · Paso 3 |
| `hooks/test-proteger-git.sh` | 35 casos que prueban el guardarraíl | Clase 5 · Paso 3 |
| `skills/cierre-de-clase/SKILL.md` | Skill que cierra la clase y abre el PR | Clase 5 · Paso 2 |
| `agents/revisor.md` | Subagente revisor de solo lectura | Clase 5 · Paso 1 |
| `mcp.json` | Servidor MCP de Playwright (en la raíz se llama `.mcp.json`) | Clase 5 · Paso 4 |

## Activarlo de golpe (solo si te atrasaste)

```bash
mkdir -p .claude && cp -r referencia/harness/{settings.json,hooks,skills,agents} .claude/
cp referencia/harness/mcp.json .mcp.json
chmod +x .claude/hooks/*.sh
bash .claude/hooks/test-proteger-git.sh     # debe decir "Todos los casos pasan"
```

Requiere `jq` y, en Windows, Git Bash (Claude Code ejecuta los hooks con él).
