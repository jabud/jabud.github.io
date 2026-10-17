# jabud.github.io — Resoluble

Sitio personal de Jorge Abud (**Resoluble**), construido con
[Quarto](https://quarto.org) y publicado gratis en GitHub Pages. Minimalista, con
estética de terminal, contenido en Markdown y notas que pueden **ejecutar código**.

- **Producción:** https://jabud.github.io
- **Roadmap de trabajo:** [`docs/ROADMAP.md`](docs/ROADMAP.md)

> Esta rama (`explore-quarto-template`) es la exploración de Quarto. La versión en
> Astro sigue intacta en `dev` y `master`.

---

## Stack

| Pieza | Qué es |
|---|---|
| [Quarto](https://quarto.org) | Generador de sitios estáticos sobre Pandoc. Renderiza Markdown y, cuando hace falta, ejecuta el código de la página. |
| Listings | Los índices de `notas`, `resenas` y `projects` se arman solos, con filtro por categoría y RSS incluidos. |
| SCSS | Dos temas (`styles/terminal-light.scss`, `styles/terminal-dark.scss`) que comparten las reglas de `styles/_shell.scss`. |
| Jupyter | Solo para las notas con celdas de Python. Las salidas se guardan en `_freeze/`. |
| GitHub Actions + Pages | Build y deploy automáticos. |

## Contenido del sitio

| Sección | Ruta | De dónde sale |
|---|---|---|
| Home | `/` | `index.md` (notas, reseñas y proyectos recientes) |
| Notas | `/notas` | `notas/*.md` |
| Reseñas | `/resenas` | `resenas/*.md` |
| Proyectos | `/projects` | `projects/*.md` |
| Contexto | `/contexto` | `contexto.md` |
| CV | `/assets/cv.pdf` | `assets/cv.pdf` |

## Estructura del proyecto

```
.
├── _quarto.yml            # config del sitio: menú, temas, pie de página
├── index.md               # home
├── contexto.md            # about
├── notas/                 # 📝 index.md (listado) + una nota por archivo
├── resenas/
├── projects/
├── styles/
│   ├── _shell.scss        # 🎨 reglas comunes a los dos temas
│   ├── terminal-light.scss
│   └── terminal-dark.scss
├── _freeze/               # salidas del código ya ejecutado (se versiona)
├── js/shell.html          # ruta ~/..., menú colapsable, filtro de la home
├── assets/cv.pdf
├── favicon.svg
├── docs/ROADMAP.md
└── .github/workflows/deploy.yml
```

## Correr en local

Hace falta [Quarto](https://quarto.org/docs/get-started/) instalado
(`brew install --cask quarto`). Para las notas con código, además el entorno de conda
que trae Jupyter:

```bash
conda activate envp311
quarto preview     # servidor de desarrollo, se recarga solo al guardar
quarto render      # compila el sitio estático a _site/
```

Si una nota no tiene celdas de código, Quarto no necesita Python en absoluto.

## Cómo agregar contenido

El contenido son archivos Markdown (`.md`) con un bloque de *frontmatter* arriba.
Para crear algo nuevo, copia el bloque de un archivo existente y edítalo. Solo las
notas que ejecutan código usan la extensión `.qmd`.

- **Nota:** nuevo `.md` en `notas/`. El nombre del archivo es la URL
  (`mi-idea.md` → `/notas/mi-idea.html`). Frontmatter: `title`, `description`,
  `date`, `categories`, `draft?`.
- **Reseña:** nuevo `.md` en `resenas/`. Igual que una nota, más `author?` y
  `rating?` (0–5).
- **Proyecto:** nuevo `.md` en `projects/`. Frontmatter: `title`, `description`,
  `date`, `repo?`, `link?`, `categories`, `featured?`.

`draft: true` deja una entrada sin publicar.

Para que una nota ejecute código hay que guardarla como `.qmd`, agregar
`jupyter: python3` al frontmatter y escribir las celdas entre ```` ```{python} ```` y ```` ``` ````. Ver
[`notas/demo-ejecutable.qmd`](notas/demo-ejecutable.qmd).

## Deploy a producción

El sitio se publica en **GitHub Pages** vía **GitHub Actions**:

1. La fuente de Pages debe estar en **"GitHub Actions"**
   (Settings → Pages → Build and deployment → Source).
2. Cada `push` a `master` dispara
   [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), que hace
   `quarto render` y publica `_site/` en Pages.
3. En unos minutos el sitio queda en https://jabud.github.io.

El workflow **no instala Python**: usa las salidas ya guardadas en `_freeze/`. Por eso
hay que hacer commit de esa carpeta cuando se agrega o modifica una nota con código.
