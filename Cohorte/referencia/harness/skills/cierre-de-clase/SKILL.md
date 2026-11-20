---
name: cierre-de-clase
description: Cierra la clase actual. Verifica el entregable de la guía de la clase, corre pruebas, actualiza CONTEXT.md (estado y bitácora) y abre el PR a main para que el estudiante lo apruebe y fusione manualmente.
disable-model-invocation: true
---

# Cierre de clase

Sigue las fases en orden. Cada **⏸** es un punto de parada: muestra el resultado y espera un "ok" explícito antes de continuar. Si algo falla, detente y repórtalo; no lo rodees.

## 1. Precondiciones
- Rama actual: debe ser `clase-NN-slug`. Si es `main`, detente.
- `git status --short` limpio. Si hay cambios, lístalos y pregunta qué hacer con ellos.
- Identifica la clase N por la rama y abre su guía: `docs/clases/clase-NN-slug/README.md`.

## 2. Verificar el entregable
- Toma la lista **"Hecho cuando"** de la sección "Verificación" de la guía y corre sus comandos.
- Comprueba cada elemento con evidencia (archivo, comando, enlace al PR). Presenta una tabla: elemento · cumple sí/no · evidencia.
- Si falta algo, detente. Se puede recortar lo opcional, **nunca el entregable de salida**.
- **⏸**

## 3. Pruebas
- Si el proyecto tiene pruebas (por ejemplo, un script `test` en `package.json`, `pytest` o similar), ejecútalas. Deben pasar en verde.
- Si todavía no hay pruebas, dilo explícitamente. No las inventes.

## 4. Datos que solo tiene el estudiante
Pregunta en un solo bloque. No los deduzcas del repositorio:
- Horas reales dedicadas fuera de clase.
- Decisiones tomadas (y por qué), dudas pendientes y aprendizajes clave.

**Información sensible:** `CONTEXT.md` se publica en GitHub. No escribas nombres de terceros (mentores, compañeros), correos, tokens ni datos privados. Si el estudiante los menciona, propón una versión anonimizada y pregunta antes de incluir nada.

## 5. Actualizar `CONTEXT.md`
- **Estado actual:** clase en curso, última completada, fecha de hoy, siguiente paso concreto y progreso (N / 7).
- **Stack:** solo si cambió durante la clase.
- **Bitácora:** agrega una entrada **arriba** con la plantilla de la bitácora.
- **Nunca reescribas entradas anteriores.** Compruébalo: en `git diff CONTEXT.md` no puede haber líneas eliminadas (`-`) dentro de la bitácora.
- Muestra el diff completo. **⏸**
- Commit: `docs: cerrar clase N en CONTEXT.md`.

## 6. Pull request
- `git push -u origin <rama>`.
- `gh pr create --base main --head <rama>` con el título `Clase N — <título>` y un cuerpo que resuma qué se construyó y cómo se verificó el entregable.

## 7. Validaciones de GitHub
- `gh pr checks <número> --watch`. Todas deben terminar en verde.
- Si el repositorio aún no tiene checks configurados, dilo explícitamente.
- Si alguno falla, detente y muestra el log (`gh run view --log-failed`).
- **⏸**

## 8. Entrega del PR al estudiante
- **No hagas merge.** El estudiante aprueba y fusiona el PR manualmente en GitHub, sin borrar la rama. El hook de Git bloquea `git merge` y `gh pr merge`.
- Resume el cierre: entregable, enlace al PR, horas y siguiente paso.
- Cuando el estudiante confirme que hizo el merge, verifica que la rama sigue existiendo en el remoto: `git ls-remote --heads origin <rama>`.
