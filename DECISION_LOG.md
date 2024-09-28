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