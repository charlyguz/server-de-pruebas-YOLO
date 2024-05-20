# Configuración del Entorno y Ejecución del Servidor Flask

Este archivo proporciona instrucciones claras para configurar el entorno de desarrollo y ejecutar el servidor de Python con Flask para procesar frames de video utilizando YOLOv5, así como para instalar las dependencias de Node.js necesarias para el frontend.

## Requisitos Previos

- **Conda o Miniconda**: Necesitas tener Conda o Miniconda instalado en tu sistema. [Instalar Miniconda](https://docs.conda.io/en/latest/miniconda.html)
- **Node.js y npm**: Asegúrate de tener Node.js y npm instalados. [Instalar Node.js](https://nodejs.org/)

## Crear el Entorno Virtual

1. **Crea un entorno de Conda** utilizando el archivo `environment.yml`. Asegúrate de estar en el directorio donde se encuentra el archivo `environment.yml`.

    ```sh
    conda env create -f environment.yml
    ```

2. **Activa el entorno de Conda** creado.

    ```sh
    conda activate mycondaenv
    ```

3. **Actualizar el entorno de Conda** con las dependencias del archivo `environment.yml` (si ya tienes un entorno activado).

    ```sh
    conda env update -f environment.yml
    ```

## Instalación de Dependencias de Node.js

Antes de ejecutar tu proyecto localmente, necesitas instalar las dependencias de Node.js especificadas en `package.json`.

1. **Navega al directorio** del proyecto donde se encuentra el archivo `package.json`.

2. **Instala las dependencias** ejecutando el siguiente comando:

    ```sh
    npm install
    ```

Este comando descargará e instalará todas las dependencias listadas en `package.json` y creará la carpeta `node_modules`.

## Ejecutar el Servidor Flask

1. **Navega al directorio** donde se encuentra tu archivo `server.py`.

2. **Ejecuta el servidor** Flask con el siguiente comando:

    ```sh
    python server.py
    ```

Este comando iniciará el servidor Flask, que estará listo para recibir y procesar los frames de video.
