// Genera una presentación de PowerPoint por clase a partir de las guías de docs/clases/.
//
//   cd tools/presentaciones && npm install && npm run generar          # las 6 (clases 2 a 7)
//   node generar.js 3                                                   # solo la clase 3
//
// Salida: docs/presentaciones/clase-NN-slug.pptx
// Diseño: fondo noche, acento lila, dorado para lo importante, marca
// "DE DEV A AGENTIC ENGINEER ✦ TATIANA ESPONDA".

const fs = require("fs");
const path = require("path");
const pptxgen = require("pptxgenjs");
const JSZip = require("jszip");
const { parsear } = require("./parsear.js");

const RAIZ = path.resolve(__dirname, "../..");
const LECCIONES = path.join(RAIZ, "docs/clases");
const SALIDA = path.join(RAIZ, "docs/presentaciones");
const ASSETS = path.join(__dirname, "assets");
const MARCA = "DE DEV A AGENTIC ENGINEER  ✦  TATIANA ESPONDA";

const C = {
  noche: "0F0B0A", crema: "F7F2EC", sup: "1C1526", mut: "BEB2C8", lila: "C7B6F5",
  lila2: "9A82E0", tinta: "5B3FB0", linea: "2E2440", oro: "E9B949", ok: "9BE39B",
};
const FUENTE = "Arial";
const MONO = "Courier New";

const SESIONES = fs.readFileSync(path.join(RAIZ, "scripts/clases.txt"), "utf8").trim().split("\n")
  .map((l) => { const [n, rama, ...t] = l.split(" "); return { n: Number(n), rama, titulo: t.join(" ") }; });
// A dónde se va después de cada clase
const SIGUIENTE = { 3: ["el ", "laboratorio 1."], 5: ["el ", "laboratorio 2."], 7: ["el ", "lanzamiento."] };

// ---------- utilidades de texto ----------
const recortar = (t, max) => (t.length > max ? t.slice(0, max - 1).replace(/\s+\S*$/, "") + "…" : t);
function envolver(linea, max) {
  if (linea.length <= max) return [linea];
  const out = [];
  let resto = linea;
  while (resto.length > max) {
    let corte = resto.lastIndexOf(" ", max);
    if (corte < max * 0.5) corte = max;
    out.push(resto.slice(0, corte));
    resto = "  " + resto.slice(corte).trimStart();
  }
  out.push(resto);
  return out;
}
const lineasTexto = (t, cpl) => t.split("\n").reduce((n, l) => n + Math.max(1, Math.ceil(l.length / cpl)), 0);
const acento = (titulo) => {
  const pal = titulo.split(" ");
  if (pal.length === 1) return ["", titulo];
  return [pal.slice(0, -1).join(" ") + " ", pal[pal.length - 1]];
};

// ---------- deck ----------
function nuevoDeck() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "De Dev a Agentic Engineer";
  pres.theme = { headFontFace: FUENTE, bodyFontFace: FUENTE };

  pres.defineSlideMaster({
    title: "PORTADA",
    background: { path: path.join(ASSETS, "fondo-portada.png") },
    objects: [
      { placeholder: { options: { name: "title", type: "title", x: 0.6, y: 1.45, w: 8.6, h: 1.0, align: "left", fontFace: FUENTE, fontSize: 42, bold: true, color: C.crema, valign: "top", margin: 0, charSpacing: -1 }, text: "" } },
      { placeholder: { options: { name: "body", type: "body", x: 0.6, y: 2.55, w: 7.4, h: 0.7, fontFace: FUENTE, fontSize: 15, color: C.mut, valign: "top", margin: 0 }, text: "" } },
      { text: { text: MARCA, options: { x: 0.6, y: 5.12, w: 7, h: 0.25, fontFace: FUENTE, fontSize: 9, bold: true, color: C.mut, margin: 0, charSpacing: 2 } } },
    ],
  });
  pres.defineSlideMaster({
    title: "PORTADA_LARGA",
    background: { path: path.join(ASSETS, "fondo-portada.png") },
    objects: [
      { placeholder: { options: { name: "title", type: "title", x: 0.6, y: 1.3, w: 8.6, h: 1.3, align: "left", fontFace: FUENTE, fontSize: 34, bold: true, color: C.crema, valign: "top", margin: 0, charSpacing: -0.8 }, text: "" } },
      { placeholder: { options: { name: "body", type: "body", x: 0.6, y: 2.72, w: 7.4, h: 0.6, fontFace: FUENTE, fontSize: 14, color: C.mut, valign: "top", margin: 0 }, text: "" } },
      { text: { text: MARCA, options: { x: 0.6, y: 5.12, w: 7, h: 0.25, fontFace: FUENTE, fontSize: 9, bold: true, color: C.mut, margin: 0, charSpacing: 2 } } },
    ],
  });
  pres.defineSlideMaster({
    title: "CONTENIDO",
    background: { path: path.join(ASSETS, "fondo-contenido.png") },
    objects: [
      { placeholder: { options: { name: "kicker", type: "body", x: 0.5, y: 0.36, w: 8, h: 0.26, fontFace: FUENTE, fontSize: 10, bold: true, color: C.lila, charSpacing: 2.5, margin: 0, valign: "middle" }, text: "" } },
      { placeholder: { options: { name: "title", type: "title", x: 0.5, y: 0.64, w: 9, h: 0.62, align: "left", fontFace: FUENTE, fontSize: 27, bold: true, color: C.crema, valign: "top", margin: 0, charSpacing: -0.6 }, text: "" } },
      { text: { text: MARCA, options: { x: 0.5, y: 5.2, w: 7, h: 0.25, fontFace: FUENTE, fontSize: 9, color: C.mut, margin: 0, charSpacing: 1 } } },
    ],
    slideNumber: { x: 9.0, y: 5.2, w: 0.5, h: 0.25, fontFace: FUENTE, fontSize: 9, color: C.mut, align: "right", margin: 0 },
  });
  pres.defineSlideMaster({
    title: "CIERRE",
    background: { path: path.join(ASSETS, "fondo-portada.png") },
    objects: [
      { placeholder: { options: { name: "title", type: "title", x: 0.6, y: 1.8, w: 8.8, h: 1.1, align: "left", fontFace: FUENTE, fontSize: 44, bold: true, color: C.crema, valign: "middle", margin: 0, charSpacing: -1.2 }, text: "" } },
      { placeholder: { options: { name: "body", type: "body", x: 0.6, y: 3.0, w: 8.2, h: 0.9, fontFace: FUENTE, fontSize: 15, color: C.mut, valign: "top", margin: 0 }, text: "" } },
      { text: { text: MARCA, options: { x: 0.6, y: 4.85, w: 7, h: 0.3, fontFace: FUENTE, fontSize: 10, bold: true, color: C.mut, margin: 0, charSpacing: 2.5 } } },
    ],
  });
  return pres;
}

const tx = (s, nombre, texto, o) =>
  s.addText(texto, Object.assign({ margin: 0, valign: "top", isTextBox: true, objectName: nombre, color: C.crema, fontFace: FUENTE, fontSize: 12 }, o));
const card = (pres, s, nombre, x, y, w, h, o = {}) =>
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: 0.1, fill: { color: o.fill || C.sup }, line: { color: o.line || C.linea, width: 0.75 }, objectName: nombre });
const titulo = (s, plano, acentuado, despues = "") => {
  const runs = [{ text: plano }, { text: acentuado, options: { color: C.lila } }];
  if (despues) runs.push({ text: despues });
  s.addText(runs, { placeholder: "title" });
};
const pill = (pres, s, nombre, texto, x, y, w, o = {}) => {
  const h = o.h || 0.32;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: h / 2, fill: { color: o.fill || C.sup }, line: { color: o.line || C.linea, width: 0.75 }, objectName: nombre });
  tx(s, nombre + " texto", texto, { x, y, w, h, fontSize: o.size || 10, bold: o.bold !== false, color: o.color || C.crema, align: "center", valign: "middle", charSpacing: o.cs || 0 });
};

// ---------- cajas (código, tabla, lista) ----------
const ETIQUETA = (b) => {
  if (b.tipo === "tabla") return "TABLA";
  if (b.tipo === "lista") return "CHECKLIST";
  if (b.lang === "text") return b.lineas[0] && b.lineas[0].startsWith("/") ? "CLAUDE CODE" : "PROMPT PARA CLAUDE CODE";
  if (["bash", "powershell", "sh"].includes(b.lang)) return b.lang === "powershell" ? "POWERSHELL" : "TERMINAL";
  if (b.lang === "gherkin") return "CRITERIO GIVEN / WHEN / THEN";
  return "ARCHIVO · " + b.lang.toUpperCase();
};
const CPI_MONO = 1 / 0.08; // caracteres por pulgada, Courier New 9.5 pt
const ALTO_MONO = 0.155;

function medirCaja(b, w) {
  const interior = w - 0.36;
  if (b.tipo === "codigo") {
    const cpl = Math.floor(interior * CPI_MONO);
    const lineas = b.lineas.flatMap((l) => envolver(l, cpl));
    return { lineas, alto: 0.48 + lineas.length * ALTO_MONO };
  }
  if (b.tipo === "lista") {
    const cpl = Math.floor((interior - 0.3) * 13);
    const n = b.items.reduce((a, it) => a + Math.max(1, Math.ceil(it.length / cpl)), 0);
    return { alto: 0.42 + n * 0.21 + b.items.length * 0.05 };
  }
  // tabla
  const cols = b.filas[0].length;
  const anchos = anchosTabla(b, interior);
  let alto = 0.3;
  for (const f of b.filas) {
    const lineas = Math.max(...f.map((c, k) => Math.max(1, Math.ceil(c.length / Math.max(6, anchos[k] * 13)))));
    alto += 0.08 + lineas * 0.17;
  }
  return { alto: alto + 0.1, cols };
}
function anchosTabla(b, total) {
  const cols = b.filas[0].length;
  const largo = Array.from({ length: cols }, (_, k) => Math.min(60, Math.max(8, ...b.filas.map((f) => (f[k] || "").length))));
  const suma = largo.reduce((a, c) => a + c, 0);
  return largo.map((l) => (l / suma) * total);
}

function dibujarCaja(pres, s, b, x, y, w, altoMax, nombre) {
  const interior = w - 0.36;
  const m = medirCaja(b, w);
  const h = Math.min(altoMax, m.alto);
  card(pres, s, nombre, x, y, w, h, { fill: b.tipo === "codigo" ? "140F1C" : C.sup, line: b.tipo === "codigo" && b.lang === "text" ? C.tinta : C.linea });
  tx(s, nombre + " etiqueta", ETIQUETA(b), { x: x + 0.18, y: y + 0.12, w: interior, h: 0.18, fontSize: 7.5, bold: true, color: b.tipo === "codigo" && b.lang !== "text" ? C.mut : C.lila, charSpacing: 1.5 });
  const cuerpoY = y + 0.36, cuerpoH = h - 0.42;
  let recortado = false;
  if (b.tipo === "codigo") {
    const caben = Math.max(1, Math.floor((cuerpoH + 0.02) / ALTO_MONO));
    let lineas = m.lineas;
    if (lineas.length > caben) { lineas = lineas.slice(0, caben - 1).concat(["…"]); recortado = true; }
    const runs = lineas.map((l, k) => ({
      text: l === "" ? " " : l,
      options: { color: /^\s*#/.test(l) ? C.mut : b.lang === "text" ? C.lila : C.crema, breakLine: k < lineas.length - 1 },
    }));
    tx(s, nombre + " código", runs, { x: x + 0.18, y: cuerpoY, w: interior, h: cuerpoH, fontFace: MONO, fontSize: 9.5, wrap: false, paraSpaceAfter: 0, lineSpacingMultiple: 1.0 });
  } else if (b.tipo === "lista") {
    tx(s, nombre + " lista", b.items.map((it, k) => ({ text: it, options: { bullet: { code: "2726" }, breakLine: k < b.items.length - 1 } })), { x: x + 0.18, y: cuerpoY, w: interior, h: cuerpoH, fontSize: 11, paraSpaceAfter: 4 });
  } else {
    const anchos = anchosTabla(b, interior);
    const filas = b.filas.map((f, r) => f.map((c) => ({
      text: c,
      options: { bold: r === 0, color: r === 0 ? C.lila : C.crema, fontSize: r === 0 ? 8.5 : 9.5, fontFace: FUENTE, fill: { color: r === 0 ? "251C33" : C.sup }, margin: [3, 5, 3, 5], valign: "middle" },
    })));
    s.addTable(filas, { x: x + 0.18, y: cuerpoY, w: interior, colW: anchos, border: { type: "solid", pt: 0.5, color: C.linea }, autoPage: false, objectName: nombre + " tabla" });
  }
  return { alto: h, recortado };
}

// ---------- sección genérica: intro + cajas paginadas + franja ----------
function renderSeccion(pres, s0, ctx) {
  const { kicker, tituloPlano, tituloAcento, bloques, notasExtra = "" } = ctx;
  const intro = [];
  const cajas = []; // { caja, leyenda }
  const franjas = [];
  const notas = [];
  let leyenda = null;
  for (const b of bloques) {
    if (b.tipo === "parrafo") {
      if (/^✅/.test(b.texto)) { franjas.push({ tipo: "ok", texto: b.texto.replace(/^✅\s*/, "").replace(/^Resultado esperado:\s*/i, "") }); continue; }
      if (!cajas.length && !intro.length) intro.push(b.texto);
      else if (leyenda === null) leyenda = b.texto; else { notas.push(leyenda); leyenda = b.texto; }
      continue;
    }
    if (b.tipo === "nota") { franjas.push({ tipo: "nota", texto: b.texto }); continue; }
    if (["codigo", "tabla", "lista"].includes(b.tipo)) { cajas.push({ caja: b, leyenda }); leyenda = null; continue; }
  }
  if (leyenda) notas.push(leyenda);

  // paginación: cajas apiladas a lo ancho mientras quepan; si no, otra diapositiva
  const altoLeyenda = (c) => (!c.leyenda ? 0 : recortar(c.leyenda, 200).length > 105 ? 0.44 : 0.3);
  const altoCaja = (c) => altoLeyenda(c) + medirCaja(c.caja, 9).alto + 0.14;
  const paginas = [];
  let pag = [], usado = 0;
  cajas.forEach((c) => {
    const zona = (franjas.length ? 4.45 : 4.95) - (paginas.length === 0 && intro.length ? 1.98 : 1.5);
    const a = altoCaja(c);
    if (pag.length && usado + a > zona) { paginas.push(pag); pag = []; usado = 0; }
    pag.push(c); usado += a;
  });
  if (pag.length || !paginas.length) paginas.push(pag);

  paginas.forEach((pag, p) => {
    const s = p === 0 ? s0 : pres.addSlide({ masterName: "CONTENIDO", sectionTitle: ctx.seccion });
    s.addText(kicker + (paginas.length > 1 ? `  ·  ${p + 1}/${paginas.length}` : ""), { placeholder: "kicker" });
    titulo(s, tituloPlano, tituloAcento);
    let y = 1.5;
    if (p === 0 && intro.length) {
      tx(s, "Introducción", recortar(intro[0], 230), { x: 0.5, y, w: 9, h: 0.42, fontSize: 12, color: C.mut });
      y = 1.98;
    }
    const franja = p === paginas.length - 1 ? franjas[0] : null;
    const fondo = franja ? 4.45 : 4.95;
    pag.forEach((c, k) => {
      if (c.leyenda) {
        const ley = recortar(c.leyenda, 200);
        const dos = ley.length > 105;
        tx(s, `Leyenda ${k + 1}`, ley, { x: 0.5, y, w: 9, h: dos ? 0.38 : 0.22, fontSize: 10.5, bold: true, color: C.crema });
        y += dos ? 0.44 : 0.3;
      }
      const r = dibujarCaja(pres, s, c.caja, 0.5, y, 9, fondo - y, `Caja ${k + 1}`);
      if (r.recortado) notas.push("(Contenido completo en la guía de la clase.)");
      y += r.alto + 0.14;
    });
    if (franja) {
      card(pres, s, "Franja", 0.5, 4.58, 9, 0.46, { fill: C.sup, line: franja.tipo === "ok" ? C.ok : C.oro });
      tx(s, "Franja texto", [
        { text: franja.tipo === "ok" ? "RESULTADO ESPERADO   " : "IMPORTANTE   ", options: { bold: true, color: franja.tipo === "ok" ? C.ok : C.oro, fontSize: 8.5, charSpacing: 1.5 } },
        { text: recortar(franja.texto, 150), options: { color: C.crema } },
      ], { x: 0.7, y: 4.58, w: 8.6, h: 0.46, fontSize: 11, valign: "middle" });
    }
    const todasNotas = [ctx.notasBase || "", ...intro.slice(1), ...notas, ...franjas.slice(1).map((f) => f.texto), notasExtra]
      .filter(Boolean).join("\n\n");
    s.addNotes(todasNotas || kicker);
  });
}

// ---------- diapositivas especiales ----------
function portada(pres, g) {
  const s = pres.addSlide({ masterName: g.titulo.length > 22 ? "PORTADA_LARGA" : "PORTADA", sectionTitle: "Apertura" });
  pill(pres, s, "Etiqueta clase", `CLASE ${g.numero}`, 0.6, 0.72, 1.3, { fill: C.lila2, line: C.lila2, color: C.noche, cs: 1.5 });
  tx(s, "Fecha", g.meta.Fecha.toUpperCase(), { x: 2.1, y: 0.72, w: 7, h: 0.32, fontSize: 10, bold: true, color: C.lila, charSpacing: 2.2, valign: "middle" });
  const [pl, ac] = acento(g.titulo);
  s.addText([{ text: pl }, { text: ac + ".", options: { color: C.lila } }], { placeholder: "title" });
  s.addText(g.subtitulo ? g.subtitulo.charAt(0).toUpperCase() + g.subtitulo.slice(1) : "", { placeholder: "body" });
  const meta = [["RAMA", g.meta.Rama], ["DURACIÓN", g.meta["Duración"]], ["REQUIERE", g.meta.Requiere]];
  meta.forEach(([k, v], i) => {
    const x = 0.6 + i * 2.95, y = 3.55;
    card(pres, s, `Meta ${k}`, x, y, 2.8, 0.95);
    tx(s, `Meta ${k} etiqueta`, k, { x: x + 0.18, y: y + 0.14, w: 2.4, h: 0.2, fontSize: 8.5, bold: true, color: C.lila, charSpacing: 1.5 });
    tx(s, `Meta ${k} valor`, recortar(v, 72), { x: x + 0.18, y: y + 0.36, w: 2.45, h: 0.52, fontSize: 10.5, bold: true, fontFace: k === "RAMA" ? MONO : FUENTE, color: k === "DURACIÓN" ? C.oro : C.crema });
  });
  s.addNotes(`Clase ${g.numero} · ${g.titulo}${g.subtitulo ? ": " + g.subtitulo : ""}.\n\n${g.meta.Fecha}. Rama ${g.meta.Rama}. Duración ${g.meta["Duración"]}. Requiere: ${g.meta.Requiere}.`);
}

function objetivo(pres, g) {
  const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "Apertura" });
  s.addText("OBJETIVO DE LA CLASE", { placeholder: "kicker" });
  titulo(s, "Al terminar ", "podrás…");
  const partes = g.objetivo.replace(/\.$/, "").split(/,\s*(?:y\s+)?(?![^(]*\))/).map((t) => t.trim()).filter(Boolean);
  const items = partes.length >= 2 && partes.length <= 6 ? partes : [g.objetivo];
  tx(s, "Objetivos", items.map((t, k) => ({ text: t.charAt(0).toUpperCase() + t.slice(1), options: { bullet: { code: "2726" }, breakLine: k < items.length - 1 } })), { x: 0.5, y: 1.5, w: 5.3, h: 2.75, fontSize: items.length === 1 ? 16 : 13, paraSpaceAfter: 7, bullet: items.length === 1 ? false : undefined });
  if (g.frase) {
    card(pres, s, "Frase", 0.5, 4.4, 5.3, 0.6, { fill: C.sup, line: C.tinta });
    tx(s, "Frase texto", recortar(g.frase, 120), { x: 0.68, y: 4.4, w: 5.0, h: 0.6, fontSize: 11, italic: true, bold: true, color: C.lila, valign: "middle" });
  }
  // mapa del programa
  card(pres, s, "Mapa programa", 6.1, 1.5, 3.4, 3.5);
  tx(s, "Mapa título", "TU RECORRIDO", { x: 6.3, y: 1.65, w: 3, h: 0.2, fontSize: 8.5, bold: true, color: C.lila, charSpacing: 1.5 });
  SESIONES.forEach((ses, k) => {
    const col = k % 3, fila = Math.floor(k / 3);
    const x = 6.55 + col * 0.95, y = 2.05 + fila * 0.85;
    const hoy = ses.n === g.numero, hecha = ses.n < g.numero;
    s.addShape(pres.shapes.OVAL, { x, y, w: 0.6, h: 0.6, fill: { color: hoy ? C.lila2 : hecha ? C.tinta : C.noche }, line: { color: hoy ? C.lila : C.linea, width: hoy ? 1.5 : 0.75 }, objectName: `Mapa S${ses.n}` });
    tx(s, `Mapa S${ses.n} n`, String(ses.n), { x, y, w: 0.6, h: 0.6, fontSize: 14, bold: true, align: "center", valign: "middle", color: hoy ? C.noche : hecha ? C.crema : C.mut });
  });
  tx(s, "Mapa módulo", [{ text: "Cohorte 1 · clases 2 a 7", options: { bold: true, color: C.crema, breakLine: true } }, { text: "Hechas en lila oscuro · hoy resaltada", options: { color: C.mut, fontSize: 8.5 } }], { x: 6.3, y: 4.0, w: 3.05, h: 0.85, fontSize: 10 });
  s.addNotes(`Al terminar podrás: ${g.objetivo}${g.frase ? "\n\n" + g.frase : ""}`);
}

function conceptos(pres, g, sec) {
  const tabla = sec.bloques.find((b) => b.tipo === "tabla");
  const filas = tabla ? tabla.filas.slice(1) : [];
  const porPag = 6;
  for (let p = 0; p * porPag < filas.length; p++) {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "Conceptos" });
    const tot = Math.ceil(filas.length / porPag);
    s.addText("CONCEPTOS CLAVE" + (tot > 1 ? `  ·  ${p + 1}/${tot}` : ""), { placeholder: "kicker" });
    titulo(s, "Lo que necesitas ", "saber");
    const grupo = filas.slice(p * porPag, (p + 1) * porPag);
    const ancho3 = tabla.filas[0].length >= 3;
    grupo.forEach((f, k) => {
      const col = k % 2, fila = Math.floor(k / 2);
      const x = 0.5 + col * 4.6, y = 1.5 + fila * 1.18, w = 4.4, h = 1.04;
      card(pres, s, `Concepto ${k + 1}`, x, y, w, h);
      tx(s, `Concepto ${k + 1} nombre`, recortar(f[0], 60), { x: x + 0.2, y: y + 0.13, w: w - 0.4, h: 0.28, fontSize: 13, bold: true, color: C.lila });
      const desc = ancho3 ? f.slice(1).join(" · ") : f[1];
      tx(s, `Concepto ${k + 1} texto`, recortar(desc, 150), { x: x + 0.2, y: y + 0.45, w: w - 0.4, h: 0.55, fontSize: 10.5, color: C.crema });
    });
    const resto = sec.bloques.filter((b) => b.tipo !== "tabla").map((b) => b.texto || (b.items || []).join("\n") || "").filter(Boolean);
    s.addNotes(grupo.map((f) => `${f[0]}: ${f.slice(1).join(" · ")}`).join("\n") + (resto.length ? "\n\n" + resto.join("\n\n") : ""));
  }
}

function ejercicios(pres, g, sec, kicker = "PRÁCTICA", tp = "Ejercicios para ", ta = "practicar") {
  const lista = sec.bloques.find((b) => b.tipo === "lista");
  if (!lista) return;
  const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "Cierre" });
  s.addText(kicker, { placeholder: "kicker" });
  titulo(s, tp, ta);
  const n = lista.items.length, w = (9 - (n - 1) * 0.2) / n;
  lista.items.forEach((it, k) => {
    const x = 0.5 + k * (w + 0.2);
    card(pres, s, `Ejercicio ${k + 1}`, x, 1.55, w, 2.6);
    tx(s, `Ejercicio ${k + 1} número`, String(k + 1).padStart(2, "0"), { x: x + 0.22, y: 1.75, w: 0.8, h: 0.42, fontSize: 22, bold: true, color: C.lila });
    tx(s, `Ejercicio ${k + 1} texto`, recortar(it, 190), { x: x + 0.22, y: 2.3, w: w - 0.44, h: 1.75, fontSize: 12 });
  });
  s.addNotes(lista.items.map((t, k) => `${k + 1}. ${t}`).join("\n"));
}

function cierre(pres, g, conexion) {
  const s = pres.addSlide({ masterName: "CIERRE", sectionTitle: "Cierre" });
  tx(s, "Estrellas", "✦  ✦  ✦", { x: 0.6, y: 1.3, w: 3, h: 0.35, fontSize: 14, color: C.lila, charSpacing: 4 });
  const [pre, dest] = SIGUIENTE[g.numero] || ["la ", `clase ${g.numero + 1}.`];
  s.addText([{ text: "Nos vemos en " + pre }, { text: dest, options: { color: C.lila } }], { placeholder: "title" });
  s.addText(recortar(conexion || "Cierra la clase y fusiona el PR sin borrar la rama.", 200), { placeholder: "body" });
  s.addNotes(conexion || "");
}

// ---------- una clase ----------
async function generarClase(ses) {
  const md = fs.readFileSync(path.join(LECCIONES, ses.rama, "README.md"), "utf8");
  const g = parsear(md);
  const pres = nuevoDeck();
  pres.title = `Clase ${g.numero} · ${g.titulo}`;
  pres.addSection({ title: "Apertura" });
  portada(pres, g);
  objetivo(pres, g);

  const usadas = new Set();
  const usar = (re) => { const s = g.secciones.find((x) => re.test(x.titulo)); if (s) usadas.add(s); return s; };

  const arranque = usar(/^0\. Arranque/);
  if (arranque) {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "Apertura" });
    const t = (arranque.titulo.match(/\(([^)]+)\)/) || [])[1];
    renderSeccion(pres, s, { seccion: "Apertura", kicker: "PASO 0" + (t ? "  ·  " + t.toUpperCase() : ""), tituloPlano: "Arranque de la ", tituloAcento: "clase", bloques: arranque.bloques });
  }
  // secciones propias antes del paso a paso (ej. Reglas del War Room)
  const conocidas = /^(0\. Arranque|Conceptos clave|Paso a paso|Verificación|Ejercicios|Para el laboratorio|Para el lanzamiento|Cierre|Problemas comunes|Conexión con lo siguiente)/;
  pres.addSection({ title: "Conceptos" });
  const conc = usar(/^Conceptos clave/);
  if (conc) conceptos(pres, g, conc);
  for (const sec of g.secciones.filter((x) => !conocidas.test(x.titulo))) {
    usadas.add(sec);
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "Conceptos" });
    const [pl, ac] = acento(sec.titulo.replace(/\s*\(.*\)$/, ""));
    renderSeccion(pres, s, { seccion: "Conceptos", kicker: "ANTES DE EMPEZAR", tituloPlano: pl, tituloAcento: ac, bloques: sec.bloques });
  }

  pres.addSection({ title: "Paso a paso" });
  for (const paso of g.pasos) {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "Paso a paso" });
    const [pl, ac] = acento(recortar(paso.titulo, 52));
    renderSeccion(pres, s, { seccion: "Paso a paso", kicker: `PASO ${paso.n}` + (paso.tiempo ? `  ·  ${paso.tiempo.toUpperCase()}` : ""), tituloPlano: pl, tituloAcento: ac, bloques: paso.bloques });
  }

  pres.addSection({ title: "Cierre" });
  const verif = usar(/^Verificación/);
  if (verif) {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "Cierre" });
    renderSeccion(pres, s, { seccion: "Cierre", kicker: "VERIFICACIÓN", tituloPlano: "¿Está ", tituloAcento: "hecho?", bloques: verif.bloques });
  }
  const ejer = usar(/^Ejercicios/);
  if (ejer) ejercicios(pres, g, ejer);
  const lab = usar(/^Para el laboratorio/);
  if (lab) ejercicios(pres, g, lab, "⏩  LABORATORIO", "Para el ", "laboratorio");
  const lanz = usar(/^Para el lanzamiento/);
  if (lanz) ejercicios(pres, g, lanz, "⏩  ANTES DEL LANZAMIENTO", "Para el ", "lanzamiento");
  const prob = usar(/^Problemas comunes/);
  if (prob) {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "Cierre" });
    renderSeccion(pres, s, { seccion: "Cierre", kicker: "SI ALGO FALLA", tituloPlano: "Problemas ", tituloAcento: "comunes", bloques: prob.bloques });
  }
  const cie = usar(/^Cierre/);
  if (cie) {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "Cierre" });
    const pasosCierre = { tipo: "lista", items: g.numero >= 5 ? [
      "En Claude Code ejecuta /cierre-de-clase: verifica el entregable y actualiza CONTEXT.md.",
      "Anota horas reales, decisiones y aprendizajes cuando la skill te los pida.",
      "Revisa el PR y espera los checks en verde (gh pr checks --watch).",
      "Fusiona el PR en GitHub sin borrar la rama: queda como foto de la clase.",
    ] : [
      "Commit con prefijo y push de la rama de la clase.",
      "Abre el PR a main (gh pr create --base main --fill).",
      "Agrega la entrada de la clase arriba en la bitácora de CONTEXT.md.",
      "Fusiona el PR en GitHub sin borrar la rama: queda como foto de la clase.",
    ] };
    const bloquesCierre = cie.bloques.some((b) => b.tipo === "lista") ? cie.bloques : [...cie.bloques, { tipo: "parrafo", texto: "Paso a paso del cierre:" }, pasosCierre];
    renderSeccion(pres, s, { seccion: "Cierre", kicker: "CIERRE", tituloPlano: "Cerrar la ", tituloAcento: "clase", bloques: bloquesCierre });
  }
  const con = usar(/^Conexión con lo siguiente/);
  const textoFinal = con
    ? con.bloques.filter((b) => b.tipo === "parrafo").map((b) => b.texto).join(" ")
    : (cie ? cie.bloques.filter((b) => b.tipo === "parrafo").map((b) => b.texto).pop() : "") || "";
  cierre(pres, g, textoFinal);

  fs.mkdirSync(SALIDA, { recursive: true });
  const archivo = path.join(SALIDA, `${ses.rama}.pptx`);
  // pptxgenjs guarda entradas de carpeta en el .zip; algunos servicios en la nube no abren esos archivos.
  const origen = await JSZip.loadAsync(await pres.write({ outputType: "nodebuffer" }));
  const limpio = new JSZip();
  for (const [nombre, entrada] of Object.entries(origen.files)) {
    if (!entrada.dir) limpio.file(nombre, await entrada.async("nodebuffer"), { createFolders: false });
  }
  fs.writeFileSync(archivo, await limpio.generateAsync({ type: "nodebuffer", compression: "DEFLATE" }));
  return archivo;
}

(async () => {
  const filtro = process.argv[2] ? Number(process.argv[2]) : null;
  for (const ses of SESIONES.filter((s) => !filtro || s.n === filtro)) {
    const f = await generarClase(ses);
    console.log("✔", path.relative(RAIZ, f));
  }
})().catch((e) => { console.error(e); process.exit(1); });
