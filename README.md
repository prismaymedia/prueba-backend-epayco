# Prueba Técnica para Desarrollador Backend

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