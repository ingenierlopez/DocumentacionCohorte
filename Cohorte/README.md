# De Dev a Agentic Engineer · Cohorte 1

Repositorio de clase de la cohorte **De Dev a Agentic Engineer** (Tatiana Esponda). Cada estudiante construye **su propio producto** con agentes de IA (Claude Code), desde la idea hasta producción, en 6 clases de 2 horas.

Cada clase tiene una **guía paso a paso con los prompts y comandos**, cómo verificar el entregable y lo que queda para el laboratorio.

---

## Inicio rápido

```bash
# 1. Crea tu copia ("Use this template" en GitHub) y clónala
git clone https://github.com/<tu-usuario>/<tu-producto>.git
cd <tu-producto>

# 2. Revisa que tengas todo instalado
./scripts/verificar-entorno.sh          # macOS / Linux / Git Bash
.\scripts\verificar-entorno.ps1         # Windows PowerShell

# 3. Empieza la clase 2 (crea la rama clase-02-entorno-producto)
./scripts/iniciar-clase.sh 2            # o: .\scripts\iniciar-clase.ps1 2

# 4. Abre el agente y sigue la guía
claude
> Empecemos la clase 2 siguiendo su guía.
```

¿Te falta algo? Instalación por sistema operativo en [`docs/setup.md`](docs/setup.md).

---

## Clases

| Clase | Fecha (hora Bogotá) | Guía | Entregable |
|---|---|---|---|
| 2 · Tu entorno y tu producto | Lun 23 nov · 7–9 p. m. | [guía](docs/clases/clase-02-entorno-producto/README.md) | Entorno listo + `docs/ficha-idea.md` + primer PR |
| 3 · Tu PRD con IA | Mié 25 nov · 7–9 p. m. | [guía](docs/clases/clase-03-prd/README.md) | `docs/prd.md` + historias del MVP con Gherkin |
| Laboratorio 1 | Vie 27 nov · 6–7 p. m. | [laboratorios](docs/laboratorios.md#laboratorio-1--vie-27-nov) | Clases 2 y 3 fusionadas |
| 4 · Especificación y arquitectura | Lun 30 nov · 7–9 p. m. | [guía](docs/clases/clase-04-spec-arquitectura/README.md) | `specs/` + dominio + C4 + ADR + esqueleto de la app |
| 5 · Taller agéntico | Mié 2 dic · 7–9 p. m. | [guía](docs/clases/clase-05-taller-agentico/README.md) | Harness propio + primera historia con TDD |
| Laboratorio 2 | Vie 4 dic · 6–7 p. m. | [laboratorios](docs/laboratorios.md#laboratorio-2--vie-4-dic) | Clases 4 y 5 fusionadas |
| 6 · Construcción dirigida y calidad | Lun 7 dic · 7–9 p. m. | [guía](docs/clases/clase-06-construccion-calidad/README.md) | Historias en paralelo + PR revisado por IA + E2E |
| 7 · Despliegue | Mié 9 dic · 7–9 p. m. | [guía](docs/clases/clase-07-despliegue/README.md) | App en línea con CI, Docker, Terraform y k6 |

Calendario completo y decisiones del programa: [`PLAN.md`](PLAN.md).

---

## Cómo se trabaja: una rama por clase

```
main ──●──────────●──────────●──────▶   (recibe cada clase cerrada por PR)
        \        /  \        /
         clase-02    clase-03 ...       (la rama se conserva como foto de la clase)
```

1. **Iniciar:** `./scripts/iniciar-clase.sh N` crea `clase-NN-slug` desde `main` actualizado.
2. **Trabajar:** commits pequeños en español con prefijo (`feat:`, `docs:`, `test:`, `fix:`, `chore:`).
3. **Cerrar:** push y PR a `main`. Desde la clase 5 lo hace tu skill `/cierre-de-clase`.
4. **Fusionar:** tú apruebas y fusionas el PR en GitHub **sin borrar la rama**.

---

## Qué hay en el repositorio

| Archivo / carpeta | Para qué sirve |
|---|---|
| [`CLAUDE.md`](CLAUDE.md) | Instrucciones que el agente carga siempre. Lo completas en la clase 2 |
| [`CONTEXT.md`](CONTEXT.md) | Estado actual, perfil y bitácora entre clases |
| [`PLAN.md`](PLAN.md) | Calendario, estructura de 2 h y stack |
| `docs/clases/` | Una guía por clase |
| [`docs/laboratorios.md`](docs/laboratorios.md) | Qué terminar en cada laboratorio |
| [`docs/presentaciones/`](docs/presentaciones/README.md) | Una presentación de PowerPoint por clase |
| [`docs/setup.md`](docs/setup.md) · [`docs/comandos.md`](docs/comandos.md) | Instalación y chuleta de comandos |
| [`docs/guia-mentor.md`](docs/guia-mentor.md) | Para quien dicta |
| [`referencia/harness/`](referencia/harness/README.md) | Solución del harness de la clase 5 |
| `scripts/` | `iniciar-clase` y `verificar-entorno`, en bash y PowerShell |
| `tools/presentaciones/` | Generador de las presentaciones (`npm run generar`) |
