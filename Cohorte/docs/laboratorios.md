# Laboratorios

Una hora en vivo los viernes, 6–7 p. m. (hora Bogotá). Sirven para **terminar lo marcado ⏩ Laboratorio** en las guías y destrabar a quien se atrasó. No hay tema nuevo.

## Cómo funciona

| Bloque | Tiempo |
|---|---|
| Ronda rápida: ¿en qué paso estás? (cada uno en una línea en el chat) | 5 min |
| Trabajo guiado por grupos según el paso en que van | 45 min |
| Demo de 1–2 estudiantes: muestran su entregable | 10 min |

Llega con tu rama al día (`git status` limpio y `git push` hecho) para que el mentor pueda ver tu repo.

---

## Laboratorio 1 · Vie 27 nov

Cubre las clases 2 y 3. Al salir debes tener **la ficha de la idea y el PRD fusionados en `main`**.

| Pendiente típico | Dónde está | Hecho cuando |
|---|---|---|
| Subir el repo a GitHub y abrir el primer PR | Clase 2 · Paso 4 | El PR de `clase-02-entorno-producto` está fusionado |
| Pulir la ficha de la idea | Clase 2 · Paso 3 | `docs/ficha-idea.md` responde las 6 preguntas |
| Historias que faltan del MVP | Clase 3 · Paso 3 | Cada historia del MVP tiene su archivo en `docs/historias/` |
| Escenarios Gherkin de casos de error | Clase 3 · Paso 4 | Cada historia tiene al menos un escenario feliz y uno de error |
| Revisión del PRD con el agente como crítico | Clase 3 · ⏩ | Los hallazgos están resueltos o anotados como "fuera del MVP" |

**Reto opcional:** pide al agente que se haga pasar por tu usuario principal y te entreviste sobre el PRD. Anota tres cosas que cambiarías.

---

## Laboratorio 2 · Vie 4 dic

Cubre las clases 4 y 5. Al salir debes tener **el harness funcionando y la primera historia en verde** con TDD.

| Pendiente típico | Dónde está | Hecho cuando |
|---|---|---|
| Diagrama C4 de contenedores | Clase 4 · Paso 3 | `docs/arquitectura.md` muestra el nivel 1 y el 2 en Mermaid |
| Segundo ADR | Clase 4 · Paso 4 | Hay al menos 2 ADR en `docs/adr/` |
| Hooks del harness | Clase 5 · Paso 3 | `bash .claude/hooks/test-proteger-git.sh` pasa y el agente no puede hacer commit en `main` |
| Servidor MCP | Clase 5 · Paso 4 | `/mcp` muestra `playwright` conectado |
| Terminar la primera historia | Clase 5 · Paso 5 | `npm test` pasa y el PR está abierto |

**Antes de salir:** instala Docker Desktop, Terraform y k6 (ver [setup](setup.md#para-la-clase-7-docker-terraform-y-k6)). La clase 7 los usa desde el minuto uno.
