---
title: Math animations
description: Animaciones de objetos matemáticos, ecuaciones y su comportamiento.
date: 2019-04-13
repo: https://github.com/jabud/math_animations
featured: true
tags: ["python", "matemáticas", "animación", "visualización"]
---

Proyecto para visualizar objetos matemáticos y el comportamiento de ecuaciones
mediante animaciones generadas con Python.

## La idea

Muchos conceptos matemáticos se entienden mucho mejor cuando se ven en
movimiento: cómo cambia una curva al variar un parámetro, cómo se comporta una
función, cómo se construye una figura paso a paso. La intención de este proyecto
es justamente esa: convertir ecuaciones y objetos abstractos en animaciones que
ayuden a la intuición.

## Guía rápida:
Las animaciones se generan con Python, casi todo está hecho con **matplotlib**; algunos scripts en 3D
o de juegos usan `pygame` y OpenGL, y se exportan a
formato GIF o MP4.

### 1. Clonar e instalar

```bash
git clone https://github.com/jabud/math_animations.git
cd math_animations
```

Recomiendo un ambiente aislado para no ensuciar tu Python:

```bash
python3 -m venv env
source env/bin/activate
pip install -r requirements.txt
```

> El `requirements.txt` es de hace unos años (época de Python 3.6). Si algo no
> instala, lo más práctico es crear el ambiente e instalar solo lo que cada
> script necesita: casi todos corren con `matplotlib`, `numpy` y `scipy`. Los
> scripts en 3D o de juegos piden además `pygame` y `PyOpenGL`.

### 2. La fuente (opcional)

Algunos scripts usan una fuente de pixeles llamada
[alterebro pixel font](https://www.dafont.com/es/alterebro-pixel-font.font).
Si quieres que los textos se vean como en los ejemplos, descárgala y guárdala
dentro de tu instalación de matplotlib:

```text
.../site-packages/matplotlib/mpl-data/alterebro_pixel_font/alterebro-pixel-font.ttf
```

Si no la instalas, la animación corre igual pero con la fuente por defecto.

### 3. Correr una animación

Cada script es un ejemplo independiente y se corre **desde la raíz del
repositorio** (así encuentra el módulo `canvas`):

```bash
python calculus/partial_derivative.py
```

Se abre una ventana con la animación. Otros ejemplos para probar:

```bash
python geometry/cube_skeleton.py        # esqueleto de un cubo en 3D
python linear_regression/least_squares.py
python logistic_regression/sigmoid_function.py
```

### 4. Interactuar con la animación

Los ejemplos de `linear_regression` y `calculus` se controlan **con el teclado**,
paso a paso:

- **Números `1` a `N`** — avanzan cada etapa de la animación.
- **`0`** — reinicia la animación.
- **`i`** — guarda una imagen del cuadro actual (con fondo).
- **`I`** (mayúscula) — guarda la imagen con fondo transparente.

### 5. Temas de color

Muchos scripts aceptan un tema `dark` o `light`. Se cambia en la función `main`
del propio script, al crear el objeto:

```python
mo = MathObject(theme='dark')   # o theme='light'
```

### Cómo está organizado

Cada carpeta agrupa un tipo de ejemplo:

- `calculus/` — derivadas, derivadas parciales.
- `linear_regression/` — rectas, mínimos cuadrados, funciones de error.
- `logistic_regression/` — función sigmoide.
- `geometry/` — figuras y transformaciones (rotación, escala, simetría).
- `svm/` — kernels y el *kernel trick*.
- `decision_tree/`, `landscapes/`, `games/`, `text/` — otros experimentos.

El archivo `template.py` en la raíz es una plantilla para crear una animación
nueva desde cero, y `canvas/canvas2d.py` es la base que reutilizan varios
scripts para dibujar los ejes y el lienzo.



El código está en el [repositorio](https://github.com/jabud/math_animations).
