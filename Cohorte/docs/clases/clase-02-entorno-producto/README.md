# Clase 2 · Tu entorno y tu producto: Claude Code, tus primeros agentes y la ficha de tu idea

| Campo | Valor |
|---|---|
| Fecha | Lun 23 nov · 7–9 p. m. |
| Rama | `clase-02-entorno-producto` |
| Duración | 2 h |
| Requiere | Instalación de `docs/setup.md` y cuenta de GitHub |

**Al terminar podrás:** usar Claude Code desde tu editor, guiar al agente con plan mode y permisos, definir tu producto en una ficha de una página y abrir tu primer PR.

> El agente no adivina lo que quieres construir: lo lee. Hoy escribes lo primero que va a leer.

---

## 0. Arranque

1. En GitHub abre el repositorio de la cohorte y pulsa **Use this template → Create a new repository**. Ponle el nombre de tu producto (puedes cambiarlo después).
2. Clónalo y prepara la rama:

```bash
git clone https://github.com/<tu-usuario>/<tu-producto>.git
cd <tu-producto>
./scripts/verificar-entorno.sh        # Windows: .\scripts\verificar-entorno.ps1
./scripts/iniciar-clase.sh 2          # Windows: .\scripts\iniciar-clase.ps1 2
code .                                # abre VS Code (o Cursor) en la carpeta
```

## Conceptos clave

| Concepto | En una línea |
|---|---|
| Agente | Un modelo que **actúa en un bucle**: lee, planea, usa herramientas, verifica y repite |
| Claude Code | El agente que trabaja en tu repositorio desde la terminal o el editor |
| CLAUDE.md | Instrucciones que el agente carga **siempre** al empezar en esta carpeta |
| Plan mode | El agente investiga y propone un plan **sin tocar nada** hasta que lo apruebes |
| Permisos | Cada acción con efecto (editar, ejecutar) pide tu "sí" hasta que tú decidas lo contrario |
| Ventana de contexto | Lo que el agente "tiene en mente". Si se llena, olvida: por eso escribimos las cosas en archivos |

---

## Paso a paso

### Paso 1 · Claude Code en tu editor (15 min)

1. En VS Code instala la extensión **Claude Code** (Extensiones → busca "Claude Code", editor Anthropic).
2. Abre la terminal integrada (`Ctrl + ñ` o `Ctrl + \``) y arranca el agente:

```bash
claude
```

3. La primera vez elige **Claude.ai Subscription** e inicia sesión. Confía en la carpeta cuando lo pregunte: es tu repositorio.
4. Comprueba que todo está bien:

```text
/status
```

Primera tarea, solo de lectura:

```text
Explícame en 5 viñetas qué hay en este repositorio y para qué sirve cada carpeta. No cambies nada.
```

✅ El agente responde citando archivos reales (`PLAN.md`, `docs/clases/`, `scripts/`).

### Paso 2 · Tus primeros agentes: el bucle en acción (20 min)

Activa **plan mode** con `Shift + Tab` (hasta ver "plan mode" abajo) y pide algo con efecto:

```text
Quiero un script scripts/hola.sh que imprima la rama actual y la fecha.
Propón el plan antes de crear nada.
```

Observa el bucle: **lee** (busca archivos), **planea** (te muestra el plan), **espera** tu aprobación, **actúa** (crea el archivo) y **verifica** (lo ejecuta). Aprueba el plan y, cuando pida permiso para ejecutar, lee el comando antes de decir que sí.

Ahora un **subagente**: el agente principal puede delegar una investigación a otro agente con su propio contexto.

```text
Usa un subagente para revisar todos los .md de docs/ y dime qué clase usa Docker por primera vez.
Solo quiero la respuesta, no el detalle de cada archivo.
```

Borra el script de prueba: no es parte de tu producto.

```bash
rm scripts/hola.sh
```

> Interrumpe con `Esc` cuando el agente se desvíe. `Esc Esc` vuelve a un mensaje anterior para reformular.

### Paso 3 · La ficha de tu idea (25 min)

En lugar de escribir tú la ficha, deja que el agente **te entreviste**. Sal de plan mode (`Shift + Tab`) y pega:

```text
Actúa como product manager. Voy a construir un producto en esta cohorte y necesito su ficha de una página.
Entrevístame con UNA pregunta a la vez, en este orden:
1. ¿Qué problema resuelve?
2. ¿Para quién? (usuario principal, en concreto)
3. ¿Cómo lo resuelven hoy y qué les duele de eso?
4. ¿Qué propones? (en una frase)
5. ¿Cómo sabremos que funciona? (una métrica)
6. ¿Qué NO es este producto?
Si mi respuesta es vaga, repregunta. Al final escribe docs/ficha-idea.md con una sección por pregunta
y un nombre tentativo del producto. No inventes datos que no te di.
```

**Demo del mentor (Turnos):** "Los negocios pequeños (peluquerías, consultorios) agendan citas por WhatsApp y se les cruzan los horarios. Turnos deja que el cliente reserve un horario libre y el negocio vea su agenda del día. Métrica: 80 % de las citas reservadas sin intervención del dueño. No es un sistema de pagos ni un CRM."

✅ `docs/ficha-idea.md` existe y cada sección habla de **tu** producto, no de uno genérico.

### Paso 4 · Tu CLAUDE.md y tu primer PR (15 min)

Completa la sección **Producto** de `CLAUDE.md` con ayuda del agente:

```text
Lee docs/ficha-idea.md y completa la sección "Producto" de CLAUDE.md (nombre y frase).
No cambies las otras secciones. Muéstrame el diff.
```

Llena también **Estado actual** y **Mi perfil** en `CONTEXT.md` (a mano, son tus datos).

Guarda y abre el PR:

```bash
git add docs/ficha-idea.md CLAUDE.md CONTEXT.md
git commit -m "docs: ficha de la idea y contexto del producto"
git push -u origin HEAD
gh pr create --base main --fill
gh pr view --web
```

Revisa el PR en GitHub y fusiónalo tú (**Merge pull request**, sin borrar la rama).

---

## Verificación

```bash
claude --version
gh auth status
test -f docs/ficha-idea.md && grep -c "^## " docs/ficha-idea.md    # 6 o más secciones
git log --oneline main -3
```

**Hecho cuando:**

- [ ] Claude Code abre en tu editor y responde `/status`.
- [ ] `docs/ficha-idea.md` responde las 6 preguntas.
- [ ] `CLAUDE.md` tiene el nombre y la frase de tu producto.
- [ ] El PR de `clase-02-entorno-producto` está fusionado en `main`.

## Para el laboratorio

1. ⏩ Si no alcanzaste a fusionar el PR, termínalo el Vie 27 nov.
2. Lee tu ficha en voz alta: si alguien de afuera no entiende el problema en 30 segundos, reescríbela.
3. Pide al agente que encuentre **tres supuestos sin validar** en tu ficha y anótalos al final.

## Cierre

```text
Resume en 3 líneas qué hicimos hoy y cuál es el siguiente paso, y agrégalo arriba en la bitácora de CONTEXT.md.
```

## Problemas comunes

| Síntoma | Solución |
|---|---|
| `claude` no se reconoce | Agrega `%USERPROFILE%\.local\bin` al PATH (ver `docs/setup.md`) y abre otra terminal |
| "La ejecución de scripts está deshabilitada" | `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` |
| `gh pr create` pide autenticación | `gh auth login` y repite |
| El agente cambió algo que no pediste | `git diff` para verlo y `git checkout -- <archivo>` para descartarlo |

## Conexión con lo siguiente

La ficha es la entrada de la **clase 3**: de ahí sale el PRD, el MVP y las historias de usuario.
