# PLAN.md · Cohorte 1 · De Dev a Agentic Engineer

Plan de las clases que dicta el mentor, alineado con el temario publicado en [ventas.tatianaesponda.com/cohortes](https://ventas.tatianaesponda.com/cohortes). Hora Bogotá.

## Calendario de la cohorte

| # | Fecha | Clase | Quién | En este repo |
|---|---|---|---|---|
| 0 | Vie 13 nov · 7 p. m. | Bienvenida en vivo | En conjunto | — |
| 1 | Jue 19 nov · 7–9 p. m. | Bienvenida y fundamentos | En conjunto | — (ver presentación de nivelación) |
| **2** | **Lun 23 nov · 7–9 p. m.** | **Tu entorno y tu producto** | Mentor | [clase-02-entorno-producto](docs/clases/clase-02-entorno-producto/README.md) |
| **3** | **Mié 25 nov · 7–9 p. m. (+30 min dudas)** | **Tu PRD con IA** | Mentor | [clase-03-prd](docs/clases/clase-03-prd/README.md) |
| — | Vie 27 nov · 6–7 p. m. | Laboratorio 1 | Mentor | [laboratorios](docs/laboratorios.md#laboratorio-1--vie-27-nov) |
| **4** | **Lun 30 nov · 7–9 p. m.** | **Especificación y arquitectura** | Mentor | [clase-04-spec-arquitectura](docs/clases/clase-04-spec-arquitectura/README.md) |
| **5** | **Mié 2 dic · 7–9 p. m. (+30 min dudas)** | **Taller agéntico** | Mentor | [clase-05-taller-agentico](docs/clases/clase-05-taller-agentico/README.md) |
| — | Vie 4 dic · 6–7 p. m. | Laboratorio 2 | Mentor | [laboratorios](docs/laboratorios.md#laboratorio-2--vie-4-dic) |
| **6** | **Lun 7 dic · 7–9 p. m.** | **Construcción dirigida y calidad** | Mentor | [clase-06-construccion-calidad](docs/clases/clase-06-construccion-calidad/README.md) |
| **7** | **Mié 9 dic · 7–9 p. m. (+30 min dudas)** | **Despliegue: de lo ligero a lo corporativo** | Mentor | [clase-07-despliegue](docs/clases/clase-07-despliegue/README.md) |
| 8 | Contenido grabado | Prospecta y cobra | Grabado | — |
| 9 | Vie 11 dic · 6–8 p. m. | Lanzamiento y Play Store | En conjunto | Entrega del producto |

## Qué construye cada estudiante

**Su propio producto**, no un ejercicio común. Cada clase deja un entregable que es la entrada de la siguiente:

```
Clase 2            Clase 3        Clase 4                     Clase 5               Clase 6                 Clase 7
ficha de la idea → PRD + Gherkin → spec + dominio + C4 + ADR → harness + 1ª historia → historias en paralelo → en línea con CI,
+ entorno            (MVP)          + esqueleto del proyecto     con TDD               + PR con revisión IA    Docker, Terraform
                                                                                     + E2E                   y pruebas de carga
```

El mentor hace la demo con un producto de ejemplo (**Turnos**: reservas de citas para un negocio pequeño) para que todos vean el mismo flujo, mientras cada estudiante lo aplica a su idea.

## Cada clase en 2 horas

| Bloque | Tiempo |
|---|---|
| Arranque (rama de la clase, abrir el agente) | 5 min |
| Conceptos clave | 20 min |
| Demo + construcción guiada | 75 min |
| Verificación del entregable | 10 min |
| Cierre (commit, PR) y tarea | 10 min |
| *Miércoles:* dudas | +30 min |

Lo que no alcanza en clase se marca **⏩ Laboratorio** en la guía y se termina el viernes.

## Stack por defecto

| Capa | Herramienta | Clase |
|---|---|---|
| Agente | Claude Code | 2 |
| App | Next.js (App Router) + TypeScript | 4 |
| Pruebas | Vitest (unitarias), Playwright (E2E) | 5, 6 |
| Integración continua | GitHub Actions | 6, 7 |
| Contenedor | Docker | 7 |
| Infraestructura como código | Terraform (proveedor Docker, local) | 7 |
| Despliegue ligero | Vercel | 7 |
| Carga | k6 | 7 |

Si el producto de un estudiante pide otro stack, lo decide y lo deja en un ADR en la clase 4.

## Cobertura del temario publicado

| Clase | Temas publicados | Dónde están en la guía |
|---|---|---|
| 2 | Claude Code y tu editor · Tus primeros agentes · La ficha de tu idea | Pasos 1–4 |
| 3 | Visión y usuarios · MVP: qué entra y qué no · Historias de usuario · Criterios de aceptación (Gherkin) | Pasos 1–4 |
| 4 | Specs vivas · DDD · Diagramas C4 · ADR | Pasos 1–5 |
| 5 | Subagentes · Skills · Comandos y hooks · MCP · TDD · Ahorro de tokens | Pasos 1–6 |
| 6 | Agentes en paralelo · PR revisados por IA · Playwright | Pasos 1–4 |
| 7 | GitHub Actions · Docker · Terraform · Ambientes · OWASP y prompt injection · Logs, métricas y k6 | Pasos 1–6 |
