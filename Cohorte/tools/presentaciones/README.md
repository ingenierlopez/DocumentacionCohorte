# Generador de presentaciones

Convierte cada guía de `docs/clases/clase-NN-slug/README.md` en `docs/presentaciones/clase-NN-slug.pptx`.

```bash
npm install
npm run generar          # todas
node generar.js 3        # solo la clase 3
```

| Archivo | Para qué sirve |
|---|---|
| `parsear.js` | Lee el Markdown de la guía: encabezado, conceptos, pasos (`### Paso N · Título (tiempo)`), bloques de código, tablas, listas y notas (`>`) |
| `generar.js` | Arma las diapositivas con [pptxgenjs](https://gitbrent.github.io/PptxGenJS/): portada, objetivo, arranque, conceptos, pasos, verificación, laboratorio, cierre |
| `assets/` | Fondos (noche con resplandor lila) |

## Convenciones que el generador entiende en las guías

| En la guía | En la presentación |
|---|---|
| ` ```bash ` / ` ```powershell ` | Caja **TERMINAL** |
| ` ```text ` | Caja **PROMPT PARA CLAUDE CODE** (o **CLAUDE CODE** si empieza con `/`) |
| ` ```json `, ` ```ts `, ` ```markdown ` … | Caja **ARCHIVO · LENGUAJE** |
| Párrafo justo antes de un bloque | Leyenda en negrita sobre la caja |
| Párrafo que empieza con `✅` | Franja verde **RESULTADO ESPERADO** |
| Nota `> …` | Franja dorada **IMPORTANTE** |
| `## Problemas comunes` | Diapositiva de tabla "Problemas comunes" |
| `## Para el laboratorio` (lista) | Diapositiva **⏩ LABORATORIO** con una tarjeta por punto |
| Cualquier otra sección `## …` antes del paso a paso | Diapositiva "Antes de empezar" |

Lo que no cabe en pantalla se recorta con "…" y queda completo en las **notas del orador**.

## Cambiar el diseño

Colores, fuente y marca están al inicio de `generar.js` (`C`, `FUENTE`, `MARCA`). Los fondos están en `assets/`.
