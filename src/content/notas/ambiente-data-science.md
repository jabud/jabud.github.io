---
title: Cómo montar un ambiente de trabajo para data science
description: Mis pasos para armar un ambiente de data science, ya sea con conda o con Docker — miniconda, ambientes, librerías, kernel de Jupyter e imágenes de Docker.
pubDate: 2022-03-05
tags: ["data science", "conda", "docker", "jupyter"]
---

Estos son los pasos que sigo para dejar listo un ambiente de trabajo de data
science / analytics. Dejo dos caminos: uno con **conda** y otro con **Docker**.
Elige el que prefieras.

## Opción 1: con conda

### Instalar miniconda

Descarga el instalador de [miniconda](https://docs.conda.io/en/latest/miniconda.html)
y córrelo, por ejemplo:

```bash
bash ~/Downloads/Miniconda3-latest-MacOSX-x86_64.sh
```

Sigue los pasos, lee los términos y ten paciencia. Si no quieres que el ambiente
`base` se active automáticamente al abrir la terminal:

```bash
conda config --set auto_activate_base false
```

### Crear el ambiente

La [documentación oficial](https://docs.conda.io/projects/conda/en/latest/user-guide/tasks/manage-environments.html)
lo explica a detalle. Un resumen:

```bash
# En un path específico
conda create --prefix ./envs
conda activate ./envs

# En el path default, por nombre
conda create --name myenv
conda activate myenv

# Con una versión específica de Python
conda create --name envp39 python=3.9
```

Me gusta instalar `pip` dentro de conda, sobre todo para instalar repositorios o
librerías internas/privadas:

```bash
conda install pip
```

### Instalar librerías

Antes de instalar más cosas, hago un folder de prueba:

```bash
mkdir -p workspace/dummy_project
cd workspace/dummy_project
```

Ahí pongo un `requirements.txt` con lo que necesito. El mío, para trabajo de
data science / analytics, se ve más o menos así:

```text
pandas
numpy
scipy
scikit-learn
imbalanced-learn
mlxtend
shap
bayesian-optimization
matplotlib
seaborn
plotly
kaleido
jupyter
jupyterlab
ipykernel
ipywidgets
openpyxl
sqlalchemy
psycopg2-binary
pyathena
mysql-connector-python
boto3
botocore
unidecode
```

Y lo instalo:

```bash
pip install -r requirements.txt
```

> **Cuidado con `psycopg2`:** en algunos ambientes me funciona mejor
> `psycopg2-binary`.

### Registrar el kernel en Jupyter

Como último paso, registro el ambiente como kernel de Jupyter:

```bash
python -m ipykernel install --user --name=envp39
```

Corre `jupyter notebook`, verifica que el kernel aparezca y que todo funcione.
En este punto ya estás listo para desarrollar.

## Opción 2: con Docker

Si prefieres no pelear con instalaciones locales, puedes empaquetar el ambiente
en una imagen de Docker. Primero instala
[Docker Desktop](https://www.docker.com/products/docker-desktop/).

### El Dockerfile

Uso un `Dockerfile` como este (junto al `requirements.txt` de arriba):

```dockerfile
FROM ubuntu:latest

RUN apt-get update -y \
  && apt-get install -y python3-pip python3-dev libpq-dev git nano \
  && ln -s /usr/bin/python3 /usr/bin/python

WORKDIR /workspace

COPY requirements.txt requirements.txt
RUN pip3 install --upgrade pip \
  && pip3 install -r requirements.txt
```

> Si necesitas instalar paquetes **privados** (por ejemplo un repo interno), no
> pongas tokens dentro del `Dockerfile`: pásalos como
> [build secrets](https://docs.docker.com/build/building/secrets/) o variables de
> entorno en tiempo de build, nunca hardcodeados.

Construye la imagen:

```bash
docker build -t dscontainer:v1 .
```

### Correr el contenedor

```bash
docker run --rm -it -p 8888:8888 \
  --mount type=bind,source="$(pwd)",target=/workspace \
  dscontainer:v1
```

### Usar Jupyter dentro del contenedor

```bash
jupyter notebook --ip 0.0.0.0 --allow-root
```

Copia y pega la URL que aparece al arrancar el notebook. Si necesitas variables
de entorno o credenciales dentro del contenedor, cópialas a su `~/.bashrc`
(por ejemplo desde tu `~/.zshrc` local) y recarga con `exec $SHELL`.

### Guardar cambios en la imagen

Si instalas algo adicional y quieres conservarlo:

```bash
# Ver el id del contenedor
docker container ls

# Guardar los cambios en una nueva versión de la imagen
docker commit <id_container> dscontainer:v1.1
```

Luego sal del contenedor y vuelve a correrlo con el nuevo nombre:

```bash
docker run --rm -it -p 8888:8888 \
  --mount type=bind,source="$(pwd)",target=/workspace \
  dscontainer:v1.1
```

---

Con cualquiera de los dos caminos ya tienes un ambiente reproducible para
trabajar en proyectos de data science.
