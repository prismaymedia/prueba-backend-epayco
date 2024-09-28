## Ejecución Local

## Uso de DevContainer

Este proyecto incluye una configuración para DevContainer, lo que permite desarrollar en un entorno de contenedor preconfigurado. Para usar DevContainer, sigue estos pasos:

1. **Instalar Dependencias Requeridas**:

- Asegúrate de tener Docker instalado en tu máquina.
- Instala la extensión de DevContainer en Visual Studio Code.

2. **Abrir el Proyecto en DevContainer**:

- Abre Visual Studio Code.
- Selecciona `View` > `Command Palette` y escribe `Dev Containers: Open Folder in Container...`.
- Selecciona la carpeta del proyecto.

3. **Configurar Variables de Entorno**:

- Asegúrate de que el archivo `.env` esté presente en la raíz del proyecto con las variables necesarias.

4. **Iniciar el Servidor**:

- Una vez que el contenedor esté listo, abre una terminal en Visual Studio Code y ejecuta:
  ```bash
  npm run start
  ```

Esto te permitirá desarrollar y probar el proyecto en un entorno consistente y aislado.

```markdown
## Variables de Entorno

Asegúrate de que el archivo `.env` esté presente en la raíz del proyecto con las siguientes variables:
```

```bash
OMBD_API_URL="https://api.themoviedb.org/3/discover/movie"
OMBD_API_KEY="tu_api_key_de_omdb"
PORT=3001
```

```
Nota: La variable `OMBD_API_KEY` debe solicitarse ya que puede expirar.
```

Para ejecutar este proyecto en tu entorno local, sigue los siguientes pasos: 3. **Configurar Variables de Entorno**:
Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```
OMBD_API_URL="https://api.themoviedb.org/3/discover/movie"
OMBD_API_KEY="tu_api_key_de_omdb"
PORT=3001
```

1. **Clonar el Repositorio**:

```bash
git clone [URL_DEL_REPOSITORIO]
cd prueba-backend-epayco
```

2. **Instalar Dependencias**:

```bash
npm install:dev
```

3. **Configurar Variables de Entorno**:
   Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```
OMBD_API_URL="https://api.themoviedb.org/3/discover/movie"
OMBD_API_KEY="tu_api_key_de_omdb"
PORT=3001
```

4. **Iniciar el Servidor**:

```bash
npm run start
```

## Probar los Endpoints

### Listar Películas

- **Endpoint**: `GET /movies`
- **Descripción**: Obtiene un listado de las primeras 20 películas almacenadas en la base de datos.
- **Ejemplo de Petición**:
  ```bash
  curl -X GET http://localhost:[PUERTO]/movies
  ```

### Obtener Películas por Año Similar

- **Endpoint**: `GET /get-movies?webhook_url=[URL_DEL_WEBHOOK]`
- **Descripción**: Obtiene películas y envía un evento al webhook proporcionado.
- **Parámetros**:
  - `webhook_url`: URL del webhook donde se enviará el evento.
- **Ejemplo de Petición**:
  ```bash
  curl -X GET "http://localhost:[PUERTO]/get-movies?webhook_url=https://webhook.site/tu-webhook-url"
  ```

### Ejemplo de Respuesta

```json
{
  "movies": [
   {
    "_id": "603c9d8f1c4ae23a1c8b4567",
    "title": "Inception",
    "directors": ["Christopher Nolan"],
    "cast": ["Leonardo DiCaprio", "Joseph Gordon-Levitt"],
    "similar_year": ["Shutter Island", "The Social Network"]
   },
   ...
  ]
}
```

---

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
