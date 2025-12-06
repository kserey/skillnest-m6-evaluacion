# skillnest-m6-evaluacion
# Gestión de Contactos - Módulo 6 Node.js

Esta es una aplicación web sencilla para gestionar una agenda de contactos, desarrollada con Node.js, Express y Handlebars. Los datos se persisten en un archivo JSON local.

## Requisitos Previos

- Tener instalado [Node.js](https://nodejs.org/).

## Instalación

1. Clona o descarga este repositorio.
2. Abre una terminal en la carpeta del proyecto.
3. Instala las dependencias ejecutando:
   ```bash
   npm install
   ```
## Ejecución
Para iniciar el servidor en modo desarrollo (con nodemon):

```bash

npm run dev
```

Para iniciar el servidor en modo producción:

```bash

npm start

```

Luego, abre tu navegador en: http://localhost:3000

## Estructura del Proyecto

* /data: Contiene contactos.txt donde se guardan los datos.
* /public: Archivos estáticos (CSS).
* /routes: Lógica de las rutas (GET, POST).
* /views: Plantillas HTML con Handlebars.
* app.js: Archivo principal de configuración del servidor.

## Autor
Irina Serey - Desarrolladora Full Stack en formación