---
title: Cómo agrego una nota a este sitio
description: Guía rápida para mí mismo — el flujo para publicar una nota nueva, con o sin código que se ejecute.
date: 2026-10-16
categories: ["meta", "quarto"]
---

Nota para mi yo del futuro. Para publicar algo nuevo:

1. Crea un archivo `.md` dentro de `notas/`. El nombre del archivo será la URL
   (ej. `mi-idea.md` → `/notas/mi-idea.html`).
2. Copia el bloque de *frontmatter* de otra nota y ajústalo:
   - `title`: el título.
   - `description`: una línea de resumen (aparece en el listado).
   - `date`: la fecha (`AAAA-MM-DD`).
   - `categories`: etiquetas opcionales. Alimentan las píldoras con contador de
     la portada y de cada sección, así que conviene reutilizar las que ya existen.
3. Escribe el contenido en Markdown debajo del bloque.
4. Revisa en local con `quarto preview`, que se recarga solo al guardar.
5. Haz `git push`. Al llegar a `master`, GitHub Pages publica solo.

> ¿Aún no está listo? Pon `draft: true` en el frontmatter y no se publicará.

Las reseñas y los proyectos funcionan igual, en sus carpetas `resenas/` y
`projects/`. Una reseña admite además `author` y `rating`; un proyecto, `repo`,
`link` y `featured`.

## Si la nota lleva código

Esta es la razón por la que el sitio usa Quarto: el código no se pega como captura,
se ejecuta al publicar.

Aquí sí cambia la extensión: **la nota tiene que ser `.qmd` en vez de `.md`**. Es la
única diferencia entre ambas — un `.md` es texto y ya, un `.qmd` además puede
ejecutar celdas.

1. Agrega `jupyter: python3` al frontmatter.
2. Escribe las celdas entre ```` ```{python} ```` y ```` ``` ````.
3. Activa el ambiente antes de previsualizar, para que Quarto encuentre Jupyter:
   `conda activate quarto-site`.

Al renderizar, las salidas quedan guardadas en la carpeta `_freeze/`. **Hay que
hacer commit de esa carpeta junto con la nota**: así el servidor que publica el
sitio no necesita instalar Python, solo reutiliza lo ya calculado. Si olvido
subirla, la nota se publica con los resultados viejos.

Gracias a ese mismo `_freeze`, el código solo se vuelve a ejecutar cuando lo
modifico; corregir una falta de ortografía no dispara el cálculo de nuevo.

## Si ya tengo un notebook de Jupyter

No hay que convertirlo: el `.ipynb` se copia tal cual a `notas/` y se publica como
una página más. Solo falta decirle a Quarto el título y los datos de la nota, y eso
se hace **dentro del propio notebook**:

1. Abre el notebook y crea una celda nueva hasta arriba del todo.
2. Cambia su tipo de *Code* a **Raw** (en Jupyter Lab, el desplegable de la barra
   de herramientas; en VS Code, "Raw" en la esquina de la celda). Es importante:
   si queda como Markdown, el bloque se publica como texto a la vista.
3. Escribe ahí el frontmatter, con los mismos guiones que en un `.qmd`:

   ```
   ---
   title: Mi análisis
   description: Una línea de resumen.
   date: 2026-10-16
   categories: ["python"]
   ---
   ```

### El detalle que se olvida: las salidas

A diferencia de un `.qmd`, **Quarto no ejecuta el notebook**: publica las salidas
que el archivo ya trae guardadas. Es decir, lo que se ve en el sitio es lo que
quedó guardado la última vez que lo corrí en Jupyter.

En la práctica: ejecuta el notebook completo, guárdalo, y recién entonces haz
commit. Si lo subo sin ejecutar, la nota se publica con el código pero sin ninguna
gráfica ni tabla debajo.

Si prefiero que Quarto lo ejecute al compilar, como hace con los `.qmd`, va esto
en el frontmatter raw:

```
execute:
  enabled: true
```
