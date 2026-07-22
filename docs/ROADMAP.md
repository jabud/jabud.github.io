# Plan del sitio — Resoluble

Roadmap de trabajo para el sitio personal (Astro). Marca de responsables:

- 🙋 **Jorge** — te toca a ti (texto propio, decisiones, publicar).
- 🤖 **Claude** — me toca a mí (implementación, maquetado, técnico).
- 🤝 **Juntos** — requiere coordinación.

Estado: rama `feature/redesign`, commits locales, **sin push todavía**. El rediseño
(app-shell terminal, cajas, temas, secciones) está funcionando.

---

## 1. Publicar el sitio (deploy) — _pendiente_

- 🙋 Decidir cuándo es la **versión final** para publicar.
- 🤝 Cambiar la fuente de GitHub Pages a **"GitHub Actions"**
  (Settings → Pages, o `gh api --method PUT repos/jabud/jabud.github.io/pages -f build_type=workflow`).
  _El clasificador de seguridad me bloquea este comando, así que lo corres tú (con `!`) o lo cambias en la UI de GitHub._
- 🤖 Merge `feature/redesign` → `master` y **reconciliar la divergencia** con `origin/master`
  (tiene commits del sitio viejo vía PRs de `dev`).
- 🤝 Verificar que el GitHub Action corre en verde y que `https://jabud.github.io` sirve el sitio nuevo.

> El workflow `.github/workflows/deploy.yml` ya existe.

## 2. Documentación técnica del repo

- 🤖 Escribir la documentación con:
  - **Contenido** del sitio (qué secciones hay y qué va en cada una).
  - **Estructura** del proyecto (carpetas y su propósito).
  - **Stack** (Astro, colecciones de contenido, etc.).
  - **Cómo correrlo en local** (`npm install`, `npm run dev`…).
  - **Cómo echarlo a producción** (GitHub Actions + Pages).
- 🙋 Revisar y aprobar.

## 3. Contenido — sección `contexto`

- 🙋 Escribir el texto: quién eres, a qué te dedicas, por qué creaste el sitio y la
  **filosofía** detrás de notas/proyectos/reseñas. Puntos que quieres transmitir:
  - Proyectos hechos **con ayuda de IA** pero **sostenibles sin suscripción ni costo por APIs**.
  - **Notas** = ideas, conceptos o detalles técnicos que pueden servirle a alguien más.
  - **Reseñas** = hablar de libros que te gustaron; escribir te ayuda a estructurarlos y entenderlos.
  - **Abierto a colaborar** en proyectos de **energía, cambio climático y bien social**.
- 🤖 Maquetar el texto en la página.

## 4. Contenido — home

- 🙋 Definir qué va en la home (evitar duplicar lo de `contexto`).
- 🤖 Implementar: **quitar el emoji de saludo** y cambiar el texto.

## 5. Contenido — notas existentes

- 🙋 Reescribir con tus palabras, sobre todo **Astro** y **ambiente de trabajo DS**.
- 🤖 Completar la nota de ambiente DS con el contenido del **Dockerfile** y del
  **`requirements.txt`** (del repo `jabud/sandbox/ds_work_environment`), y maquetar.

## 6. Proyectos — páginas de detalle

- 🤖 Crear la ruta `projects/[slug]` + estructura + un ejemplo: que cada caja, además
  del link al código, entre a un **post del proyecto** (de qué trata, detalles
  interesantes, link al código o al sitio).
- 🙋 Escribir el contenido de cada proyecto.

---

## Ideas futuras (sin prioridad)

- Toggle de tema ya existe; integrar el **fondo mesh** opcional en alguna sección.
- Más notas, reseñas y proyectos.

### Buscador de texto — 🤖 técnico

Búsqueda de texto en todo el sitio (notas, reseñas, proyectos) para encontrar
contenido fácil. En un sitio estático encaja bien **Pagefind**: indexa el
contenido en build time y la búsqueda corre en el cliente, sin servidor ni
costo. Alternativas más ligeras: Fuse.js / Lunr sobre un JSON precomputado.
Complementa el filtro por temas que ya vive en la home.

### Inteligencia de contenido (NLP) — 🤖 técnico

Dos ideas relacionadas que comparten una misma tubería
(`Markdown → script Python → JSON → Astro`), en build time, con modelos
open-source (sin APIs de pago). **Rinden con decenas de notas**, no con pocas.

**A. Análisis NLP de temas que sobresalen.** Factibilidad alta. Por fases:
1. Agregar `tags` existentes → nube/conteo. _(quick win, ya iniciado)_
2. Keyphrases (YAKE / KeyBERT / TextRank) + TF-IDF → conceptos distintivos.
3. Embeddings (sentence-transformers) + topic modeling (BERTopic) → temas
   semánticos agrupados. Página `/temas`.

**B. Grafo tipo Obsidian.** Factibilidad media. Las aristas pueden venir de:
tags compartidos (gratis), links explícitos / `[[wikilinks]]` (más auténtico),
o similitud semántica de embeddings (automático, reusa la Fase A). Se renderiza
con una librería JS (force-graph / D3) cargada como island solo en `/grafo`,
con nodos/aristas precomputados en `graph.json`.

> El NLP de A alimenta el grafo de B: hacer A primero deja los datos listos.
> Reto: agregar un paso de Python al build (local o `setup-python` en Actions).
