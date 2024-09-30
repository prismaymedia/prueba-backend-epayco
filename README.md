# Prueba Técnica para Desarrollador Backend

## Introdución

Esta sección ha sido agregada con el objetivo de confirmar que ha sido completada la prueba técnica descrita en la sección [Consideraciones Generales](#consideraciones-generales). El endpoint ha sido creado siguiendo las indicaciones planteadas. A continuación encontrará la manera de configurar el proyecto para ejecutarlo localmente o usando Docker.

## Cómo ejecutar el proyecto

### Prerequisitos

Siga los siguientes pasos:

1. Clone el repositorio
2. Vaya a la raíz del proyecto: `cd prueba-backend-epayco`
3. Cree un archivo `.env` con el contenido que hay en `.env.example` o copie los siguientes valores:
   ```
   MONGO_URI='mongodb+srv://read-only:Me5dRsFGcjjKKUpD@development-cluster-0.4dmjp.mongodb.net/epayco-movies?retryWrites=true&w=majority&appName=development-cluster-0'
   PORT=3000
   TMDB_API_URL=https://api.themoviedb.org/3/search/movie
   TMDB_TOKEN=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMTg1NjA1NTRlZDA0NDk2Y2M1ZDllZWUwMjQyMGJjYyIsIm5iZiI6MTcyNzU4NTY1My45OTYwMDksInN1YiI6IjY2ZjhkYzQ5MzkzY2RhMWQxZGNjMzkzMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fd3Ah-xu_UaCktIXwWGvJ8UemAGauC_AGqvIZoxwABM
   ```

### Ejecución local

Si desea ejecutarlo localmente, siga lo siguiente:

1. Instale o use nodejs versión `>=20.16.0` y npm versión `>=10.8.1`
2. Instale nestjs globalmente: `npm i -g @nestjs/cli@10.4.5`
3. Instale las dependencias: `npm install`
4. Ejecute el la app: `npm run start:dev`
5. Si todo sale bien, debería ver este mensaje en la terminal
   ```bash
   Application is running on port 3000
   ```

### Ejecución dockerizada

Si desea ejecutarlo con docker, siga lo siguiente:

1. Tener instalado docker (probado en la versión `26.1.4`)
2. Estando en la raíz del proyecto, ejecute el comando `docker compose up --build`
3. Si todo sale bien, debería ver este mensaje en la terminal
   ```bash
   Application is running on port 3000
   ```

### Uso

Encuentra la documentación del endpoint en `GET /docs`. [Más info...](http://localhost:3000/docs) (`http://localhost:3000/docs`)

Deberá ingregar desde el navegador o algín cliente REST el sigueinte endpoint `http://localhost:3000/get-movies?webhook_url=[URL_DEL_WEBHOOK]`

- Reemplace `[URL_DEL_WEBHOOK]` con la url del webhook que desea usar (este está disponible: `https://webhook.site/54969a3f-a479-4748-a314-08abe6161b71`)

### Testing
Para correr e2e test, ejecutar `npm run test:e2e`
Para correr unit tests, ejecutar `npm run test`

## Decisiones técnicas relevantes

1. Para evitar problemas con la base de datos compartida (e.g. alguien la borre por error), creé una base de datos propia con un backup de `sample_mflix`
2. El uso de [OMDb API](http://www.omdbapi.com/) lo noto limitado porque no contiene paginación y tiene problemas cuando encuentra muchos registros. En su lugar usé [TMDB](https://developer.themoviedb.org/docs/getting-started) por el buen manejo de paginación y criterio de búsqueda
3. En el modelo de mongoose para la `movies` agregué el campo `year` para usarlo en la búsqueda con la api externa. El campo year no se muestra en la respuesta del endpoint `/get-movies`
4. Creé el llamado a la api externa como un módulo independiente, el cual es usado por el módulo `similar-year`. Esto permite cambiar por otra api externa sin muchos cambios
5. Este proyecto se considera un MVP o muestra por la naturaleza del mismo (es una prueba técnica), pero para aplicaciones de la vida real y el scope, se puede implementar una arquitectura limpia o hexagonal
   <br/>
   <br/>

---

¡Hola! Bienvenido a esta prueba técnica para el puesto de Desarrollador Backend. El proyecto base estará basado en **NestJS**. A continuación, encontrarás las instrucciones y criterios que deberás seguir para completar la prueba.

## Consideraciones Generales

- **Endpoint Principal**: Deberás crear un endpoint con la siguiente estructura:

  ```
  GET http://localhost:[PUERTO]/get-movies?webhook_url=[URL_DEL_WEBHOOK]
  ```

- **Monitoreo de Webhooks**: Puedes utilizar el servicio [Webhook.site](https://webhook.site/) para monitorear y probar los webhooks que envíes.

## Criterios Técnicos

### Configuración de la Base de Datos

- **Variables de Entorno**: Configura la conexión a la base de datos de manera que los parámetros sean invocados desde un archivo `.env`.

### Módulo `movies`

- **Esquema de Mongoose**: Crea un esquema de Mongoose con los siguientes campos:

  - `_id`
  - `title`
  - `directors`
  - `cast`
  - `similar_year` (array de strings de títulos)

- **Endpoint para Listar Películas**:

  - Crea un endpoint que permita obtener un listado de películas, retornando las primeras 20 películas almacenadas en la base de datos.

### Módulo de Servicios para `similar_year`

- **Funcionalidad**:

  - Este módulo deberá alimentar el campo `similar_year` del esquema `Movie`. El campo `similar_year` es un array de títulos de películas que fueron estrenadas en el mismo año que la película original.

- **Requisitos Técnicos**:

  - Utiliza **Axios** para realizar peticiones HTTP a una API externa.
  - Implementa **interceptores** para mapear y manejar errores en caso de que existan, retornándolos como respuesta adecuada.
  - Consume una API como [OMDb API](http://www.omdbapi.com/) para buscar un máximo de **5 títulos** del mismo año.

### Módulo de Servicios para Webhooks

- **Funcionalidad**:

  - Crea un módulo de servicios que emita un evento a un webhook cada vez que se acceda al endpoint principal.
  - El mensaje enviado al webhook debe ser la **fecha y hora** de la búsqueda realizada.

### Pruebas End-to-End (E2E)

- **Objetivo**:

  - Implementa una prueba E2E que verifique el correcto funcionamiento del endpoint creado.

## Entrega

- **Pull Request al Repositorio**:

  - Una vez finalizada la prueba, debes realizar un **Pull Request (PR)** al repositorio proporcionado para su revisión.

## Recomendaciones

- **Buenas Prácticas**: Asegúrate de seguir buenas prácticas de codificación, incluyendo manejo de errores, código limpio y estructurado.
- **Documentación**: Comenta el código cuando sea necesario y documenta cualquier decisión técnica relevante.

## Contacto

Si tienes alguna duda o necesitas más información, no dudes en contactarnos. ¡Buena suerte con la prueba!

---

Esperamos que disfrutes desarrollando este proyecto y estamos ansiosos por ver tu solución.
