# DECISION_LOG.md

## Configuración de la Base de Datos

### Uso de `dotenv` y `joi` para cargar y validar variables de entorno

Para gestionar las variables de entorno, decidí usar `dotenv` para cargarlas y `joi` para validarlas, en lugar de utilizar el `ConfigService` de `NestJS`. Esta combinación me permite validar de manera estricta las variables, asegurando que, por ejemplo, el `PORT` sea numérico y otras variables obligatorias estén presentes. Además, proporciona un mayor control sobre los errores de configuración al validar las variables desde el inicio de la aplicación. Sin embargo, una desventaja es la introducción de paquetes adicionales y dependencias.

## Módulo `movies`

### Enrutamiento y estructura de endpoints en el módulo Movies

Se realizó la modificación para que el controlador de la aplicación tenga la ruta base `app` y usar el controlador de `movies` en la raíz `/`, cumpliendo con el requerimiento de tener el endpoint `GET /get-movies`.

Sin embargo, considero que se debería usar `GET /movies` en lugar de `GET /get-movies` porque sigue las mejores prácticas REST: los endpoints deben representar **recursos** (en este caso, "movies"), mientras que la acción de obtener esos recursos ya está implícita en el verbo HTTP `GET`. Esto hace la API más **consistente**, **escalable** y **fácil de mantener**, evitando redundancias y manteniendo la semántica clara.

### Modificaciones en el Servicio de `movies`

En la base de datos, cada documento de película contiene más información de la que está definida en el esquema dado. Para optimizar la consulta y manejar solamente la información necesaria, se ha añadido una proyección a la consulta en la base de datos. No se omite el campo `_id` porque se considera útil para el cliente, permitiendo la realización de operaciones adicionales, como actualizaciones u otras acciones que requieran la identificación del documento.

**Proyección**
```TypeScript
{
    title: 1,
    cast: 1,
    directors: 1,
    similar_year: 1
}
```

Esta modificación garantiza que solo los campos necesarios se extraigan de la base de datos, mejorando así el rendimiento y la claridad de los datos manipulados por el servicio.

## Módulo de Servicios para `similar_year`

Se decidió añadir el campo `year` ya que es necesario para realizar consultas al servicio externo con el objetivo de obtener películas que coincidan con el mismo año. Se agrega a la proyección.
**Proyección**
```TypeScript
{
    title: 1,
    cast: 1,
    directors: 1,
    year: 1,
    similar_year: 1
}
```

Se optó por la API de `TMDB` debido a que la API de `OMDb` presenta limitaciones. En `OMDb`, para consultar películas es necesario proporcionar el título de la película, lo cual restringe la capacidad de realizar consultas basadas únicamente en el año. `TMDB`, en cambio, permite consultas más flexibles.

Se añadió una validación en la función encargada de consultar al servicio externo para evitar que el mismo título sea añadido como uno de los `similar_year`. Esta validación asegura que las películas sugeridas como similares sean realmente diferentes al título consultado.

### Validación de `webhook_url` en query params

Para evitar posibles fallos en la integración del webhook, se decidió validar el **query param** `webhook_url`. Esto permitirá suprimir errores a la hora de realizar el llamado del webhook con una URL inválida o faltante, mejorando la robustez en la comunicación con el servicio externo.

### Uso de interceptor global para manejo de errores

Se decidió implementar un interceptor global para el manejo centralizado de errores debido a que la aplicación solo contiene un endpoint, lo que simplifica la gestión de la lógica de pre y post procesamiento. Este enfoque permite capturar y gestionar de forma más eficiente los errores a nivel global sin necesidad de configurar manejo de errores en cada endpoint individualmente.

### Manejo específico de errores del servicio externo

Se optó por distinguir dos tipos de errores específicos del servicio externo: el código 401, que indica un fallo en la autenticación, y el código 503, que refleja problemas de conectividad con el servicio. Estos errores se gestionan de manera diferenciada, mientras que los demás códigos de error se tratan de forma genérica como errores del servicio externo.

## Módulo de Servicios para Webhooks

### Manejo de Errores en el Webhook

Se optó por no interrumpir el flujo de la aplicación en caso de que el envío del `webhook` falle. En lugar de lanzar una excepción que pudiera afectar el funcionamiento de otras partes de la aplicación, se decidió que los errores se registrarían en un log.