# jabud.github.io — Resoluble

Sitio personal de Jorge Abud (**Resoluble**), construido con
[Astro](https://astro.build) y publicado gratis en GitHub Pages. Minimalista,
con estética de terminal (header con breadcrumb `~/ruta`, sidebar colapsable) y
contenido en Markdown.

- **Producción:** https://jabud.github.io
- **Roadmap de trabajo:** [`docs/ROADMAP.md`](docs/ROADMAP.md)

---

## Stack

| Pieza | Qué es |
|---|---|
| [Astro 5](https://astro.build) | Generador de sitios estáticos. Genera HTML plano, sin framework de JS en runtime. |
| Content Collections | Contenido en Markdown tipado (`notas`, `resenas`, `projects`), definido en `src/content.config.ts`. |
| [@astrojs/sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/) | Genera `sitemap-index.xml`. |
| [@astrojs/rss](https://docs.astro.build/en/guides/rss/) | Feed RSS de las notas en `/rss.xml`. |
| CSS plano | Un solo archivo `src/styles/global.css` con variables de tema (claro/oscuro). Sin Tailwind ni librerías. |
| GitHub Actions + Pages | Build y deploy automáticos. |

Requiere **Node.js 20+** (o 22+). No usa base de datos ni backend.

## Contenido del sitio

| Sección | Ruta | De dónde sale |
|---|---|---|
| Home | `/` | `src/pages/index.astro` (intro + notas y proyectos recientes) |
| Notas | `/notas` | colección `notas` → `src/content/notas/*.md` |
| Reseñas | `/resenas` | colección `resenas` → `src/content/resenas/*.md` |
| Proyectos | `/projects` | colección `projects` → `src/content/projects/*.md` (con página de detalle por proyecto) |
| Contexto | `/contexto` | `src/pages/contexto.astro` (about) |
| CV | `/cv.pdf` | `public/cv.pdf` |

## Estructura del proyecto

```
.
├── astro.config.mjs         # config (site, integraciones sitemap)
├── package.json
├── tsconfig.json
├── .github/workflows/
│   └── deploy.yml           # build + deploy a GitHub Pages
├── docs/
│   └── ROADMAP.md           # plan de trabajo (responsables 🙋/🤖)
├── public/                  # se copia tal cual a la raíz del sitio
│   ├── cv.pdf
│   ├── favicon.svg
│   └── mesh.js              # fondo mesh (reservado para uso futuro)
└── src/
    ├── content.config.ts    # esquemas de las colecciones (frontmatter)
    ├── content/             # 📝 CONTENIDO en Markdown
    │   ├── notas/*.md
    │   ├── resenas/*.md
    │   └── projects/*.md
    ├── pages/               # 🗺️ RUTAS (cada archivo = una URL)
    │   ├── index.astro
    │   ├── contexto.astro
    │   ├── notas/{index,[...slug]}.astro
    │   ├── resenas/{index,[...slug]}.astro
    │   ├── projects/{index,[...slug]}.astro
    │   └── rss.xml.ts
    ├── layouts/
    │   ├── BaseLayout.astro   # app-shell (header, sidebar, tema) común
    │   └── PostLayout.astro   # molde de nota/reseña (con TOC)
    ├── components/
    │   ├── Sidebar.astro        # menú lateral colapsable
    │   ├── Breadcrumb.astro     # ruta ~/... del header
    │   ├── ThemeToggle.astro    # claro/oscuro
    │   ├── SocialLinks.astro    # GitHub / LinkedIn / Telegram
    │   └── TableOfContents.astro
    └── styles/
        └── global.css        # 🎨 todos los estilos + variables de tema
```

## Correr en local

Necesitas Node.js 20+ instalado (`node -v`).

```bash
npm install      # una sola vez
npm run dev      # servidor de desarrollo en http://localhost:4321
npm run build    # compila el sitio estático a dist/
npm run preview  # sirve dist/ para revisar el build final
```

Con `npm run dev` los cambios se recargan solos (hot reload).

## Cómo agregar contenido

Todo el contenido son archivos Markdown. Para crear algo nuevo, copia el bloque
de *frontmatter* de un archivo existente y edítalo.

- **Nota:** nuevo `.md` en `src/content/notas/`. El nombre del archivo es la URL
  (`mi-idea.md` → `/notas/mi-idea/`). Frontmatter: `title`, `description`,
  `pubDate`, `tags`, `draft?`.
- **Reseña:** nuevo `.md` en `src/content/resenas/`. Igual que una nota, más
  `author?` y `rating?` (0–5).
- **Proyecto:** nuevo `.md` en `src/content/projects/`. Frontmatter: `title`,
  `description`, `date`, `repo?`, `link?` (sitio en vivo), `tags`, `featured?`.
  El cuerpo del `.md` es la página de detalle del proyecto (`/projects/<slug>/`).

Poner `draft: true` en una nota/reseña la deja sin publicar. Los campos exactos
de cada colección están en `src/content.config.ts`.

## Deploy a producción

El sitio se publica en **GitHub Pages** vía **GitHub Actions**:

1. La fuente de Pages debe estar en **"GitHub Actions"**
   (Settings → Pages → Build and deployment → Source). Se puede fijar por API:
   ```bash
   gh api --method PUT repos/jabud/jabud.github.io/pages -f build_type=workflow
   ```
2. Cada `push` a `master` dispara el workflow
   [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), que hace
   `npm ci`, `astro build` y publica `dist/` en Pages.
3. En unos minutos el sitio queda en https://jabud.github.io.

`astro.config.mjs` fija `site: 'https://jabud.github.io'` (página de usuario, se
sirve en la raíz, sin `base`).
