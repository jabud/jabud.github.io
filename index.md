---
pagetitle: "Resoluble"
toc: false
listing:
  # Las píldoras se declaran una sola vez, pero Quarto suma las categorías de
  # todos los listados de la página y su filtro actúa sobre los tres: con esto
  # basta para tener un filtro global con el conteo de todo el sitio.
  - id: notas-recientes
    contents:
      - notas/*.md
      - notas/*.qmd
      - notas/*.ipynb
      - "!notas/index.md"
    exclude:
      draft: true
    sort: "date desc"
    type: default
    categories: numbered
    fields: [title, date, description]
  - id: resenas-recientes
    contents:
      - resenas/*.md
      - "!resenas/index.md"
    exclude:
      draft: true
    sort: "date desc"
    type: default
    fields: [title, date, author, description]
  - id: proyectos-destacados
    contents:
      - projects/*.md
      - "!projects/index.md"
    exclude:
      draft: true
    sort: "date desc"
    type: default
    fields: [title, description]
---

```{=html}
<!-- La home no lleva título visible: arranca directo en las secciones. -->
<style>#title-block-header { display: none !important; }</style>
```

## Notas recientes

::: {#notas-recientes}
:::

## Reseñas recientes

::: {#resenas-recientes}
:::

## Proyectos

::: {#proyectos-destacados}
:::
