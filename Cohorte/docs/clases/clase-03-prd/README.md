# Clase 3 · Tu PRD con IA: visión, MVP, historias y criterios de aceptación

| Campo | Valor |
|---|---|
| Fecha | Mié 25 nov · 7–9 p. m. (+30 min de dudas) |
| Rama | `clase-03-prd` |
| Duración | 2 h |
| Requiere | Clase 2 fusionada (`docs/ficha-idea.md` en `main`) |

**Al terminar podrás:** convertir tu ficha en un PRD con visión y usuarios, recortar un MVP que se pueda construir en dos semanas, escribir historias de usuario y criterios de aceptación en Gherkin que el agente pueda probar.

> Un agente construye exactamente lo que le pides. El PRD es cómo le pides lo correcto.

---

## 0. Arranque

```bash
./scripts/iniciar-clase.sh 3
mkdir -p docs/historias
claude
```

## Conceptos clave

| Concepto | En una línea |
|---|---|
| PRD | Documento de requisitos del producto: qué se construye, para quién y por qué |
| Visión | Hacia dónde va el producto en una frase; sirve para decir "no" |
| MVP | Lo mínimo que entrega valor real y se puede probar con usuarios |
| MoSCoW | Clasificar en Must, Should, Could y Won't (lo que **no** entra) |
| Historia de usuario | Como \<usuario\> quiero \<acción\> para \<beneficio\> |
| Gherkin | Criterios en Dado / Cuando / Entonces: se leen como texto y se prueban como código |

---

## Paso a paso

### Paso 1 · Visión y usuarios (20 min)

Plan mode activado (`Shift + Tab`):

```text
Lee docs/ficha-idea.md. Propón la estructura de docs/prd.md con estas secciones:
1. Visión (una frase)  2. Problema  3. Usuarios (máximo 2 perfiles, con su objetivo y su dolor)
4. Métricas de éxito  5. Alcance del MVP  6. Fuera del MVP  7. Supuestos y riesgos
Llena 1 a 4 a partir de la ficha. Si falta información, hazme preguntas antes de inventar.
```

Revisa los perfiles: deben ser **personas concretas** ("Laura, dueña de una peluquería con 2 empleadas"), no categorías ("pymes").

✅ `docs/prd.md` tiene visión, problema, usuarios y métricas propios de tu producto.

### Paso 2 · MVP: qué entra y qué no (20 min)

```text
Lista todas las funcionalidades que se te ocurran para este producto (máximo 15).
Clasifícalas con MoSCoW en una tabla. Regla: el MVP (solo los Must) debe poder construirse
en 4 clases con un agente y cubrir el flujo principal de punta a punta.
Llena las secciones 5 y 6 del PRD. Lo que sea Won't va a "Fuera del MVP" con una línea de por qué.
```

Discute con el agente: si hay más de 5 Must, pídele que te ayude a recortar.

**Demo (Turnos):** Must: ver horarios libres, reservar un turno, cancelarlo, ver la agenda del día. Won't: pagos, recordatorios por WhatsApp, varios locales.

✅ La sección "Fuera del MVP" tiene al menos 3 cosas.

### Paso 3 · Historias de usuario (20 min)

```text
Por cada Must del MVP crea un archivo docs/historias/HU-00N-<slug>.md con:
- Título y la historia en formato "Como … quiero … para …"
- Prioridad y dependencias con otras historias
- Notas: reglas de negocio que ya conocemos
Revisa cada historia con INVEST (independiente, negociable, valiosa, estimable, pequeña, verificable)
y dime cuál no lo cumple.
```

```bash
ls docs/historias
```

✅ Hay un archivo por cada Must y ninguno mezcla dos historias.

### Paso 4 · Criterios de aceptación en Gherkin (15 min)

```text
Agrega a cada historia una sección "Criterios de aceptación" con escenarios Gherkin en un bloque ```gherkin.
Mínimo un escenario feliz y uno de error por historia. Usa datos concretos (fechas, horas, nombres),
no "un valor válido".
```

**Demo (Turnos), HU-001 Reservar un turno:**

```gherkin
Escenario: Reservar un horario libre
  Dado que el negocio atiende de 09:00 a 18:00 y el servicio "Corte" dura 30 minutos
  Y no hay turnos el 2 de diciembre a las 10:00
  Cuando Ana reserva "Corte" el 2 de diciembre a las 10:00
  Entonces el turno queda "reservado" a nombre de Ana

Escenario: Horario ocupado
  Dado que ya existe un turno el 2 de diciembre de 10:00 a 10:30
  Cuando Luis intenta reservar el 2 de diciembre a las 10:15
  Entonces la reserva se rechaza con el mensaje "Ese horario ya está ocupado"
```

⏩ **Laboratorio:** casos de error que falten y la revisión crítica del PRD.

---

## Verificación

```bash
grep -c "^## " docs/prd.md                     # 7 secciones
ls docs/historias | wc -l                      # una por cada Must
grep -L "Escenario" docs/historias/*.md        # no debe listar ningún archivo
```

**Hecho cuando:**

- [ ] `docs/prd.md` tiene las 7 secciones y "Fuera del MVP" no está vacía.
- [ ] Cada Must tiene su historia en `docs/historias/`.
- [ ] Cada historia tiene al menos un escenario feliz y uno de error en Gherkin.
- [ ] El PR de `clase-03-prd` está abierto (o fusionado).

## Para el laboratorio

1. ⏩ Pide al agente que actúe como **crítico**: "Revisa docs/prd.md y las historias como un tech lead escéptico. Lista contradicciones, huecos y criterios que no se pueden probar." Resuelve o anota cada hallazgo.
2. Pídele que se haga pasar por tu usuario principal y te entreviste sobre el PRD. Anota tres cosas que cambiarías.
3. Ordena las historias: ¿cuál construirías primero para tener algo de punta a punta?

## Cierre

```bash
git add docs/
git commit -m "docs: PRD, MVP e historias con criterios Gherkin"
git push -u origin HEAD
gh pr create --base main --fill
```

Agrega la entrada de la clase 3 en la bitácora de `CONTEXT.md`.

## Problemas comunes

| Síntoma | Solución |
|---|---|
| El agente inventa funcionalidades | Recuérdale: "Solo lo que está en la ficha o lo que yo te diga. Pregunta si falta algo" |
| Historias demasiado grandes ("gestionar turnos") | Pide que la parta por acción del usuario: reservar, cancelar, ver |
| Escenarios vagos ("datos válidos") | Exige valores concretos: el agente los usará como datos de prueba en la clase 5 |

## Conexión con lo siguiente

En la **clase 4** la primera historia se convierte en una **spec viva** y se diseña el dominio y la arquitectura. Los escenarios Gherkin serán los tests de la **clase 5**.
