# Clase 6 · Construcción dirigida y calidad: agentes en paralelo, PR revisados por IA y Playwright

| Campo | Valor |
|---|---|
| Fecha | Lun 7 dic · 7–9 p. m. |
| Rama | `clase-06-construccion-calidad` |
| Duración | 2 h |
| Requiere | Clase 5 fusionada (harness y HU-001 en verde en `main`) |

**Al terminar podrás:** dirigir dos agentes en paralelo con git worktrees, hacer que cada PR lo revise la IA en GitHub y probar el flujo principal de punta a punta con Playwright.

> Ya no escribes el código: diriges a quien lo escribe y decides qué entra.

---

## 0. Arranque

```bash
./scripts/iniciar-clase.sh 6
git push -u origin HEAD          # la rama de la clase recibe los PR de las historias
```

## Conceptos clave

| Concepto | En una línea |
|---|---|
| Git worktree | Otra carpeta de trabajo del **mismo** repo, en otra rama. Cada agente tiene la suya |
| Historias independientes | Se pueden construir a la vez porque no tocan los mismos archivos |
| PR revisado por IA | Un agente en GitHub Actions comenta el PR; la persona decide |
| E2E | Prueba de punta a punta en un navegador real, como lo usaría tu usuario |
| Playwright | Herramienta de E2E: abre el navegador, hace clic, verifica lo que se ve |
| Integración | Lo que pasa en paralelo se une en un solo lugar, con pruebas en verde |

---

## Paso a paso

### Paso 1 · Elegir dos historias independientes (10 min)

```text
Lee docs/historias y specs/. Propón dos historias que se puedan construir en paralelo sin tocar
los mismos archivos. Para cada una, lista los archivos que crearía o cambiaría.
Si alguna no tiene spec, escríbela en specs/HU-00N/spec.md con el formato de HU-001.
```

**Demo (Turnos):** `HU-002 Cancelar un turno` (dominio) y `HU-003 Ver la agenda del día` (pantalla). Haz commit de las specs y súbelas:

```bash
git add specs && git commit -m "docs: specs de HU-002 y HU-003" && git push
```

### Paso 2 · Agentes en paralelo con worktrees (30 min)

Crea una carpeta de trabajo por historia, cada una con su rama:

```bash
git worktree add ../mi-app-hu002 -b feat/hu-002 clase-06-construccion-calidad
git worktree add ../mi-app-hu003 -b feat/hu-003 clase-06-construccion-calidad
git worktree list
```

Abre **dos terminales**. En cada una:

```bash
cd ../mi-app-hu002        # en la otra: ../mi-app-hu003
npm install
claude
```

El mismo prompt en las dos, cambiando la historia:

```text
Construye HU-002 desde specs/HU-002/spec.md con TDD: tests en rojo, código mínimo, verde.
Solo toca los archivos de esta historia. Al terminar corre npm test, haz commit y
abre el PR con: gh pr create --base clase-06-construccion-calidad --fill
```

Mientras trabajan, **alterna entre las dos terminales**: aprueba planes, contesta preguntas, frena desvíos con `Esc`. Si las dos necesitan el servidor, usa otro puerto en una: `npm run dev -- -p 3001`.

> El hook de Git sigue activo en cada worktree: ningún agente puede hacer merge ni push a `main`.

### Paso 3 · PR revisados por IA (15 min)

Instala la integración de GitHub desde Claude Code (en la carpeta principal del repo):

```text
/install-github-app
```

Sigue el asistente: instala la app de Claude en tu repo y guarda el token como secreto. Crea `.github/workflows/revision-ia.yml`:

```yaml
name: Revisión con IA
on:
  pull_request:
    types: [opened, synchronize]
jobs:
  revisar:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pull-requests: write
      id-token: write
    steps:
      - uses: actions/checkout@v5
        with:
          fetch-depth: 0
      - uses: anthropics/claude-code-action@v1
        with:
          claude_code_oauth_token: ${{ secrets.CLAUDE_CODE_OAUTH_TOKEN }}
          prompt: |
            REPO: ${{ github.repository }}
            PR: ${{ github.event.pull_request.number }}
            Revisa este PR contra la spec de la historia en specs/ y las reglas de CLAUDE.md.
            Publica un solo comentario con: veredicto, hallazgos con archivo y línea, y qué no revisaste.
          claude_args: '--allowedTools "Bash(gh pr comment:*),Bash(gh pr diff:*),Bash(gh pr view:*)"'
```

```bash
git add .github && git commit -m "ci: revisión de PR con IA" && git push
```

Vuelve a abrir los PR de las historias (o haz `git commit --allow-empty -m "chore: revisar" && git push` en cada worktree). Lee el comentario del revisor, decide qué aceptar y **fusiona tú** los dos PR en la rama de la clase.

### Paso 4 · Playwright E2E (20 min)

En la carpeta principal, trae lo fusionado e instala Playwright:

```bash
git pull
npm i -D @playwright/test
npx playwright install chromium
```

Crea `playwright.config.ts`:

```ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "tests/e2e",
  use: { baseURL: "http://localhost:3000", trace: "on-first-retry" },
  webServer: {
    command: process.env.CI ? "npm run build && npm run start" : "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});
```

Deja que el agente explore la app con el **MCP de Playwright** antes de escribir la prueba:

```text
Levanta la app con npm run dev. Usa el MCP de playwright para abrir http://localhost:3000 y recorrer el
flujo principal (en Turnos: reservar un turno y verlo en la agenda). Luego escribe tests/e2e/flujo-principal.spec.ts
con ese recorrido, usando getByRole y getByText, no selectores CSS. Corre npx playwright test.
```

```bash
npx playwright test
npx playwright show-report        # informe con cada paso
```

⏩ **Laboratorio:** E2E del escenario de error.

---

## Verificación

```bash
git worktree list                   # las copias de trabajo
gh pr list --state merged --base clase-06-construccion-calidad
npm test
npx playwright test
```

**Hecho cuando:**

- [ ] Dos historias se construyeron en paralelo, cada una en su worktree y su PR.
- [ ] Cada PR tiene un comentario del revisor de IA.
- [ ] Los PR están fusionados en la rama de la clase por ti.
- [ ] `npx playwright test` pasa con el flujo principal.

## Para el laboratorio

1. ⏩ Escribe un E2E del escenario de error (horario ocupado) y míralo fallar si quitas la validación.
2. Limpia los worktrees: `git worktree remove ../mi-app-hu002` y `../mi-app-hu003`.
3. Lanza tres agentes en vez de dos. ¿Dónde se vuelve difícil seguirles el paso?

## Cierre

```text
/cierre-de-clase
```

## Problemas comunes

| Síntoma | Solución |
|---|---|
| `fatal: '…' is already checked out` | Una rama solo puede estar en un worktree. Usa otra rama |
| Puerto 3000 ocupado | `npm run dev -- -p 3001` en el segundo worktree |
| El workflow de revisión no comenta | Revisa en **Actions** el log; casi siempre falta el secreto `CLAUDE_CODE_OAUTH_TOKEN` |
| Los dos PR chocan al fusionar | Las historias no eran independientes: resuelve el conflicto tú y vuelve a correr las pruebas |
| `npx playwright test` no encuentra el navegador | `npx playwright install chromium` |

## Conexión con lo siguiente

En la **clase 7** las pruebas unitarias y E2E pasan a ser **puertas** del pipeline: nada llega a producción si no están en verde.
