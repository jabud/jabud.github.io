---
title: Generador de CV en PDF
description: Generador de CV en PDF desde el navegador, con opción de usarlo de forma local.
date: 2026-09-02
repo: https://github.com/jabud/generador-cv
link: https://cv-generator-5u6c.onrender.com/
featured: true
tags: ["python", "app"]
---

Cada que quería actualizar mi CV buscaba distintas fuentes y formas de hacerlo. Este proyecto es mi forma de ponerlo en un solo lugar y que sea muy práctico actualizar y tener una nueva versión lista para usarse.    
De un
lado
 editas un archivo yaml y del otro ves un pdf actualizandose en tiempo real. Haces click en un boton para descargar y listo.


**Librerías y herramientas:** Python, Flask (servidor web), Jinja2 (plantilla del CV), WeasyPrint (HTML/CSS a PDF), PyYAML (datos del CV en YAML), Flask-Limiter y Gunicorn (producción); Docker para empaquetarlo y Render para el despliegue.