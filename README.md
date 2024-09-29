# Prueba Técnica para Desarrollador Backend

Este proyecto es la base de una prueba técnica para el puesto de Desarrollador Backend. En este documento, se describe el proceso para ejecutar el proyecto y las configuraciones adicionales necesarias para su correcto funcionamiento. La aplicación está desarrollada con `Nest.js` y utiliza `Node.js en su versión 20.14.0` como entorno de ejecución.

## 💻 Desarrollo

Sigue estos pasos para configurar el entorno de desarrollo y ejecutar la aplicación:

1. Clona el repositorio:

```bash
git clone [REPOSITORIO]
```

2. Accede al directorio del proyecto:

```bash
cd nombre-de-tu-proyecto
```

3. Instala las dependencias:

```bash
npm install
```

4. Crea un archivo `.env` basado en el archivo `.env.template` y configura las variables de entorno necesarias.

Para la integración con una API externa que permita obtener información de películas, necesitarás una API key. Sigue los siguientes pasos para obtener una:

- Regístrate o inicia sesión en [The Movie Database (TMDb)](https://www.themoviedb.org/).
- Dirígete a la sección de configuración de la cuenta y selecciona "API".
- Solicita una API key.
- Agrega esta clave a tu archivo .env en la variable correspondiente `API_KEY_MOVIE_API`.
- Configura la variable `URL_MOVIE_API` con la siguiente URL `https://api.themoviedb.org/3/discover/movie`. Puedes consultar la documentación de la API en el siguiente enlace: [Documentación de la API de TMDb - Discover Movie](https://developer.themoviedb.org/reference/discover-movie).

5. Inicia el servidor en modo desarrollo:

```bash
npm run start:dev
```

6. La API estará disponible en http://localhost:[PORT].

7. Para obtener el `webhook_url`, ingresa a [webhook.site](https://webhook.site/).

## 📚 Documentación de la API

- `GET /app`: Este es el endpoint por defecto generado por la aplicación.
    - **Successful Response:**
        - Code: 200 OK
    - **Response Body:**
    ```
    Hello World!
    ```

- `GET /get-movies?webhook_url={webhook_url}`: Obtiene un listado de películas y emite un evento a un webhook.
    - **Query Params:**
        - `webhook_url`: URL del webhook donde se enviará el evento. Debe ser una URL válida.
    - **Successful Response:**
        - Code: 200 OK
    - **Error Response:**
        - Code: 400 Bad Request
        - Code: 500 Internal Server Error
        - Code: 502 Bad Gateway
        - Code: 503 Service Unavailable
    - **Response Body:**
    ```json
    [
      {
        "_id": "573a1390f29313caabcd42e8",
        "similar_year": [
          "Gulliver's Travels Among the Lilliputians and the Giants",
          "The Life and Passion of Jesus Christ",
          "Life of an American Fireman",
          "The Sick Kitten",
          "Alice in Wonderland"
        ],
        "cast": [
          "A.C. Abadie",
          "Gilbert M. 'Broncho Billy' Anderson",
          "George Barnes",
          "Justus D. Barnes"
        ],
        "title": "The Great Train Robbery",
        "directors": [
          "Edwin S. Porter"
        ]
      },
      {
        "_id": "573a1390f29313caabcd446f",
        "similar_year": [
          "The Sealed Room",
          "The Cord of Life",
          "The Voice of the Violin",
          "A Trap for Santa Claus",
          "Slippery Jim"
        ],
        "cast": [
          "Frank Powell",
          "Grace Henderson",
          "James Kirkwood",
          "Linda Arvidson"
        ],
        "title": "A Corner in Wheat",
        "directors": [
          "D.W. Griffith"
        ]
      },
      ...
    ]
    ```

**Nota**: Los códigos `502` y `503` se utilizan para hacer referencia a errores de la API externa. Un código `502` significa que el servidor no pudo obtener una respuesta válida de la API externa, en este caso debido a un problema de autenticación. Por otro lado, un código `503` indica que la API externa está temporalmente fuera de servicio.
Para obtener más información sobre los códigos de error de la API externa de películas, consulta la documentación oficial en [The Movie Database API Documentation Errors](https://developer.themoviedb.org/docs/errors).

## 🧪 Pruebas E2E

Para garantizar el correcto funcionamiento del endpoint creado, se han implementado pruebas End-to-End (E2E). Asegúrate de seguir los siguientes pasos:

- **Configuración de la variable de entorno**: Recuerda que la variable de entorno `TEST_WEBHOOK_URL` debe contener una URL válida. Esto es crucial para probar efectivamente los tests, ya que se validará que sea una URL y se enviarán eventos a esta dirección durante la ejecución de las pruebas.

- **Ejecutar las pruebas**: Para ejecutar las `pruebas E2E`, abre una terminal en el directorio del proyecto y utiliza el siguiente comando:

```bash
npm run test:e2e
```

Este comando ejecutará todas las `pruebas E2E` configuradas en el proyecto y te proporcionará un informe sobre su estado, indicándote si todas las pruebas se han ejecutado correctamente o si ha habido algún error.

## 📝Registro de Decisiones

Este proyecto tiene un archivo de [toma de decisiones](DECISION_LOG.md) donde se documentan las decisiones importantes tomadas a lo largo del desarrollo.

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