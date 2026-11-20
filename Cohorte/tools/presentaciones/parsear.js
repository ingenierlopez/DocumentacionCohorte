// Convierte una guía de clase (docs/clases/clase-NN-slug/README.md) en una estructura
// que generar.js transforma en diapositivas.
//
// Se apoya en el formato común de las guías:
//   # Clase N · Título: subtítulo
//   | Campo | Valor |  (Fecha, Rama, Duración, Requiere)
//   **Al terminar podrás:** …
//   ## 0. Arranque · ## Conceptos clave · ## Paso a paso (### Paso N · …) · ## Verificación
//   ## Para el laboratorio · ## Cierre · ## Problemas comunes · ## Conexión con lo siguiente

const limpiar = (t) =>
  t
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // enlaces
    .replace(/\*\*([^*]+)\*\*/g, "$1")       // negrita
    .replace(/\*([^*]+)\*/g, "$1")           // cursiva
    .replace(/`([^`]+)`/g, "$1")             // código en línea
    .trim();

// Parte el markdown en bloques: titulo, parrafo, codigo, tabla, lista, nota, regla.
function bloques(md) {
  const lineas = md.replace(/\r/g, "").split("\n");
  const out = [];
  let i = 0;
  while (i < lineas.length) {
    const l = lineas[i];
    if (/^```/.test(l)) {
      const lang = l.replace(/```/, "").trim() || "text";
      const cuerpo = [];
      i++;
      while (i < lineas.length && !/^```/.test(lineas[i])) cuerpo.push(lineas[i++]);
      i++;
      out.push({ tipo: "codigo", lang, lineas: cuerpo });
      continue;
    }
    if (/^#{1,3} /.test(l)) {
      const nivel = l.match(/^#+/)[0].length;
      out.push({ tipo: "titulo", nivel, texto: l.replace(/^#+ /, "").trim() });
      i++;
      continue;
    }
    if (/^\|/.test(l)) {
      const filas = [];
      while (i < lineas.length && /^\|/.test(lineas[i])) {
        const f = lineas[i].split("|").slice(1, -1).map((c) => limpiar(c));
        if (!f.every((c) => /^-+$/.test(c.replace(/:/g, "")))) filas.push(f);
        i++;
      }
      out.push({ tipo: "tabla", filas });
      continue;
    }
    if (/^\s*([-*]|\d+\.) /.test(l)) {
      const items = [];
      while (i < lineas.length && /^\s*([-*]|\d+\.) /.test(lineas[i])) {
        items.push(limpiar(lineas[i].replace(/^\s*([-*]|\d+\.) /, "").replace(/^\[[ xX]\]\s*/, "")));
        i++;
      }
      out.push({ tipo: "lista", items });
      continue;
    }
    if (/^> /.test(l)) {
      const t = [];
      while (i < lineas.length && /^> /.test(lineas[i])) t.push(lineas[i++].replace(/^> /, ""));
      out.push({ tipo: "nota", texto: limpiar(t.join(" ")) });
      continue;
    }
    if (/^---\s*$/.test(l)) { out.push({ tipo: "regla" }); i++; continue; }
    if (l.trim() === "") { i++; continue; }
    const t = [];
    while (i < lineas.length && lineas[i].trim() !== "" && !/^(```|#|\||>|---|\s*([-*]|\d+\.) )/.test(lineas[i])) t.push(lineas[i++]);
    out.push({ tipo: "parrafo", texto: limpiar(t.join(" ")) });
  }
  return out;
}

function parsear(md) {
  const bs = bloques(md);
  const g = { meta: {}, secciones: [], pasos: [] };
  const h1 = bs.find((b) => b.tipo === "titulo" && b.nivel === 1);
  const m = h1.texto.match(/^(?:Clase|Sesión) (\d+) · (.+)$/);
  g.numero = Number(m[1]);
  const [corto, ...resto] = m[2].split(":");
  g.titulo = corto.trim();
  g.subtitulo = resto.join(":").trim();
  const meta = bs.find((b) => b.tipo === "tabla");
  for (const [k, v] of meta.filas.slice(1)) g.meta[k] = v;
  const obj = bs.find((b) => b.tipo === "parrafo" && /^Al terminar podrás:/.test(b.texto));
  g.objetivo = obj ? obj.texto.replace(/^Al terminar podrás:\s*/, "") : "";
  const frase = bs.find((b) => b.tipo === "nota" && bs.indexOf(b) < bs.indexOf(obj || h1) + 3);
  g.frase = frase && bs.indexOf(frase) < 6 ? frase.texto : "";

  // Secciones de nivel 2 y pasos de nivel 3
  let actual = null;
  let paso = null;
  for (const b of bs) {
    if (b.tipo === "titulo" && b.nivel === 2) {
      actual = { titulo: b.texto, bloques: [] };
      g.secciones.push(actual);
      paso = null;
      continue;
    }
    if (b.tipo === "titulo" && b.nivel === 3 && /^Paso \d+/.test(b.texto)) {
      const mm = b.texto.match(/^Paso (\d+) · (.+?)(?: \(([^)]*)\))?$/);
      paso = { n: Number(mm[1]), titulo: limpiar(mm[2]), tiempo: mm[3] ? limpiar(mm[3]) : "", bloques: [] };
      g.pasos.push(paso);
      continue;
    }
    if (b.tipo === "regla") continue;
    if (paso) paso.bloques.push(b);
    else if (actual) actual.bloques.push(b);
  }
  g.seccion = (re) => g.secciones.find((s) => re.test(s.titulo));
  return g;
}

module.exports = { parsear, limpiar };
