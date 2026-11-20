# Clase 5 · Taller agéntico: subagentes, skills, hooks, MCP y TDD

| Campo | Valor |
|---|---|
| Fecha | Mié 2 dic · 7–9 p. m. (+30 min de dudas) |
| Rama | `clase-05-taller-agentico` |
| Duración | 2 h |
| Requiere | Clase 4 fusionada (spec de HU-001 y esqueleto en `main`) |

**Al terminar podrás:** crear un subagente revisor, escribir una skill de cierre, programar hooks que actúan como guardarraíles, conectar un servidor MCP y construir tu primera historia con TDD gastando menos tokens.

> Una instrucción se puede ignorar. Un guardarraíl, no. El harness es el código que convierte tus reglas en guardarraíles.

---

## 0. Arranque

```bash
./scripts/iniciar-clase.sh 5
mkdir -p .claude/agents .claude/skills .claude/hooks
claude
```

## Conceptos clave

| Concepto | En una línea |
|---|---|
| Harness | Todo lo que rodea al modelo en tu repo: CLAUDE.md, subagentes, skills, hooks y MCP |
| Subagente | Un agente con su propio contexto, herramientas y rol; devuelve solo el resultado |
| Skill | Instrucciones empaquetadas que el agente carga cuando las necesita; con `/nombre` es un comando |
| Hook | Script que corre en un evento (al iniciar, antes de una herramienta). Si sale con código 2, **bloquea** |
| MCP | Protocolo para conectar herramientas externas (navegador, bases de datos, APIs) |
| TDD | Test en rojo → código mínimo para verde → refactor. Los Gherkin son los tests |

---

## Paso a paso

### Paso 1 · Subagente revisor (15 min)

```text
/agents
```

Elige **Create new agent → Project**, y descríbelo: "Revisor de código de solo lectura. Revisa la rama actual frente a main contra la spec de la historia y CLAUDE.md. Devuelve un veredicto y hallazgos con archivo y línea. No edita archivos." Dale solo las herramientas **Read, Grep, Glob y Bash**.

Compara lo que generó con la referencia:

```bash
cat .claude/agents/*.md
cat referencia/harness/agents/revisor.md
```

Toma de la referencia lo que te sirva: el **formato de salida exacto** es lo que hace útil a un revisor.

### Paso 2 · Skill de cierre como comando (10 min)

```bash
mkdir -p .claude/skills/cierre-de-clase
cp referencia/harness/skills/cierre-de-clase/SKILL.md .claude/skills/cierre-de-clase/
```

Léela con el agente:

```text
Explícame la skill .claude/skills/cierre-de-clase/SKILL.md: qué hace cada fase y para qué sirven los puntos de parada.
¿Qué hace disable-model-invocation: true?
```

`disable-model-invocation: true` significa que **solo tú** la lanzas con `/cierre-de-clase`: el agente no decide cerrar la clase por su cuenta.

### Paso 3 · Hooks: el guardarraíl (15 min)

```bash
cp referencia/harness/hooks/*.sh .claude/hooks/
cp referencia/harness/settings.json .claude/settings.json
chmod +x .claude/hooks/*.sh
bash .claude/hooks/test-proteger-git.sh          # "Todos los casos pasan"
```

Reinicia Claude Code (`/exit` y `claude`) para que cargue los hooks. Pruébalo **en vivo**:

```bash
git switch main
claude
```

```text
Crea un archivo prueba.txt y haz commit directamente en main.
```

El hook `proteger-git.sh` bloquea el commit y el agente te explica por qué. Eso es un **guardarraíl**: no depende de que el modelo obedezca. Vuelve a la rama de la clase y borra `prueba.txt`.

```bash
rm prueba.txt
git switch clase-05-taller-agentico
```

### Paso 4 · Servidor MCP (5 min)

```bash
cp referencia/harness/mcp.json .mcp.json
```

Reinicia el agente, acepta el servidor del proyecto y comprueba:

```text
/mcp
```

`playwright` debe aparecer conectado. Lo usarás en la clase 6 para que el agente abra tu app en un navegador.

### Paso 5 · Primera historia con TDD (25 min)

Instala Vitest. El `@types/node@22` es necesario: el esqueleto trae la versión 20 y Vitest pide 22 o más.

```bash
npm i -D vitest @types/node@22
npm pkg set scripts.test="vitest run"
```

Crea `vitest.config.mts` en la raíz:

```ts
import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

export default defineConfig({
  resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
  test: { include: ["tests/unit/**/*.test.ts"] },
});
```

**Rojo.** Plan mode:

```text
Lee specs/HU-001/spec.md. Escribe tests/unit/hu-001.test.ts con UN test por escenario Gherkin,
nombrado con el escenario. Todavía NO crees código en src/dominio. Corre npm test y muéstrame que fallan.
```

**Verde.**

```text
Ahora escribe el código mínimo en src/dominio para que pasen. No cambies los tests.
Corre npm test.
```

**Refactor.**

```text
Usa el subagente revisor para revisar la rama frente a la spec. Aplica solo los hallazgos de severidad alta
y vuelve a correr npm test.
```

Así se ve un test de Turnos:

```ts
it("Dado un turno de 10:00 a 10:30, cuando Luis reserva a las 10:15, entonces se rechaza", () => {
  const agenda = agendaVacia();
  reservar(agenda, "Ana", el2dic(10), 30);
  expect(() => reservar(agenda, "Luis", el2dic(10, 15), 30)).toThrow("Ese horario ya está ocupado");
});
```

> Si el agente "arregla" un test para que pase, recházalo con `Esc`: los tests salen de la spec, no del código.

### Paso 6 · Ahorro de tokens (5 min)

```text
/context
```

| Práctica | Por qué ahorra |
|---|---|
| `/clear` al cambiar de tarea | No arrastras contexto que ya no sirve |
| Subagentes para explorar | La búsqueda gasta su contexto, no el tuyo; vuelve solo el resumen |
| Señalar archivos con `@ruta` | El agente no tiene que buscarlos |
| CLAUDE.md corto | Se carga en **cada** conversación |
| Plan mode antes de editar | Un plan corregido cuesta menos que código rehecho |
| `/model` para tareas simples | Un modelo más rápido basta para renombrar o formatear |

⏩ **Laboratorio:** terminar la historia si no llegaste a verde.

---

## Verificación

```bash
bash .claude/hooks/test-proteger-git.sh
ls .claude/agents .claude/skills/cierre-de-clase .mcp.json
npm test
```

Prueba de fuego: cambia un `<` por `<=` en la regla de solapamiento y corre `npm test`. **Debe fallar.** Revierte con `git checkout -- src`.

**Hecho cuando:**

- [ ] Hay un subagente revisor en `.claude/agents/` de solo lectura.
- [ ] `/cierre-de-clase` aparece como comando.
- [ ] Los hooks pasan sus pruebas y bloquean un commit en `main`.
- [ ] `/mcp` muestra `playwright` conectado.
- [ ] `npm test` pasa y cada escenario Gherkin de HU-001 tiene su test.

## Para el laboratorio

1. ⏩ Termina HU-001 en verde y ciérrala con `/cierre-de-clase`.
2. Escribe un hook propio: por ejemplo, que avise si el agente intenta editar un archivo de `tests/` mientras implementa.
3. Mide: corre `/cost` al terminar. ¿Cuánto gastó la historia? Anótalo en la bitácora.

## Cierre

```text
/cierre-de-clase
```

## Problemas comunes

| Síntoma | Solución |
|---|---|
| `\r: command not found` al correr un hook | Finales de línea de Windows: ver `docs/setup.md` (sección finales de línea) |
| `jq: command not found` | Instálalo (`winget install jqlang.jq`) y reinicia la terminal |
| Los hooks no se ejecutan | Reinicia Claude Code y revisa con `/hooks` que estén registrados |
| `ERESOLVE` al instalar Vitest | Faltó `@types/node@22` en el mismo `npm i` |
| `Cannot find module '@/dominio/…'` en los tests | Falta el `alias` en `vitest.config.mts` |

## Conexión con lo siguiente

En la **clase 6** este harness trabaja con varios agentes a la vez: cada uno construye una historia en su propia copia del repo y el revisor (local y en GitHub) revisa cada PR.
