---
title: Cómo agrego una nota a este blog
description: Guía rápida para mí mismo — el flujo para publicar una nota nueva.
pubDate: 2026-07-18
tags: ["meta"]
---

Nota para mi yo del futuro. Para publicar algo nuevo:

1. Crea un archivo `.md` dentro de `src/content/blog/`. El nombre del archivo
   será la URL (ej. `mi-idea.md` → `/blog/mi-idea/`).
2. Copia el bloque de *frontmatter* de otro post y ajústalo:
   - `title`: el título.
   - `description`: una línea de resumen (aparece en el listado).
   - `pubDate`: la fecha (`AAAA-MM-DD`).
   - `tags`: etiquetas opcionales.
3. Escribe el contenido en Markdown debajo del bloque.
4. Guarda, revisa en local con `npm run dev`, y haz `git push`. GitHub Pages
   publica solo.

> ¿Aún no está listo? Pon `draft: true` en el frontmatter y no se publicará.
