# Chuleta de comandos

## Flujo de cada clase

```bash
./scripts/iniciar-clase.sh N         # crea/retoma clase-NN-slug desde main (Windows: .\scripts\iniciar-clase.ps1 N)
claude                               # abre el agente en la raíz del repo
# … trabajo de la clase …
git push -u origin HEAD              # sube la rama
gh pr create --base main --fill      # abre el PR
gh pr view --web                     # revísalo y fusiónalo tú, sin borrar la rama
```

Desde la clase 5 el cierre lo hace tu skill: `/cierre-de-clase`.

## Git

| Comando | Para qué |
|---|---|
| `git status --short` | Qué cambió |
| `git switch main && git pull --ff-only` | Traer main actualizado sin crear merges |
| `git add -p` | Agregar cambios por partes (commits pequeños) |
| `git commit -m "feat: …"` | Commit con prefijo: `feat`, `fix`, `docs`, `test`, `chore` |
| `git log --oneline main..HEAD` | Commits de la clase |
| `git diff main...HEAD` | Todo lo que cambió en la clase |
| `git stash` / `git stash pop` | Guardar y recuperar cambios temporales |
| `git worktree add ../app-h2 -b feat/h2` | Otra copia de trabajo para un agente en paralelo (clase 6) |
| `git worktree list` / `git worktree remove ../app-h2` | Ver y quitar copias de trabajo |

## GitHub CLI

| Comando | Para qué |
|---|---|
| `gh auth status` | Verificar la sesión |
| `gh repo create <nombre> --private --source=. --push` | Crear el repo remoto desde la carpeta actual |
| `gh pr create --base main --fill` | Abrir el PR de la rama actual |
| `gh pr checks --watch` | Seguir los checks de CI del PR |
| `gh run view --log-failed` | Ver el log de un check que falló |

## Claude Code

| Comando / atajo | Para qué |
|---|---|
| `claude` | Iniciar en la carpeta actual |
| `claude -c` | Continuar la última conversación |
| `Shift + Tab` | Cambiar de modo (normal → aceptar cambios → **plan mode**) |
| `/init` | Generar un CLAUDE.md a partir del código |
| `/memory` | Editar CLAUDE.md y memorias |
| `/context` | Cuánto de la ventana de contexto está ocupado |
| `/compact` | Resumir la conversación para liberar contexto |
| `/clear` | Empezar de cero (ahorra tokens al cambiar de tarea) |
| `/model` | Cambiar de modelo (uno rápido para tareas simples) |
| `/agents` · `/hooks` · `/mcp` | Subagentes, hooks y servidores MCP |
| `/permissions` | Ver y ajustar permisos |
| `/cost` | Consumo de la conversación |
| `Esc` / `Esc Esc` | Interrumpir / volver a un mensaje anterior |

Prompts útiles:

```text
Empecemos la clase N siguiendo su guía.
Antes de cambiar nada, entra en plan mode y propón el plan.
¿Qué parte de esto pertenece a otra clase? Anótala y no la construyas.
Usa el subagente revisor para revisar la rama actual frente a main.
```

## App y pruebas (desde la clase 4)

| Comando | Para qué |
|---|---|
| `npm run dev` | App en http://localhost:3000 |
| `npm test` | Pruebas unitarias (Vitest) |
| `npx playwright test` | Pruebas E2E (clase 6) |
| `npm run build` | Compilar para producción |

## Despliegue (clase 7)

| Comando | Para qué |
|---|---|
| `docker build -t mi-app .` | Construir la imagen |
| `docker run --rm -p 3000:3000 mi-app` | Probar la imagen |
| `terraform init` · `plan` · `apply` · `destroy` | Ciclo de Terraform |
| `terraform workspace new pruebas` / `select produccion` | Cambiar de ambiente |
| `k6 run carga/humo.js` | Prueba de carga |
| `npx vercel` / `npx vercel --prod` | Vista previa / producción en Vercel |
