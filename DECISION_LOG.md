# DECISION_LOG.md

## Configuración de la Base de Datos

### Uso de `dotenv` y `joi` para cargar y validar variables de entorno

Para gestionar las variables de entorno, decidí usar `dotenv` para cargarlas y `joi` para validarlas, en lugar de utilizar el `ConfigService` de `NestJS`. Esta combinación me permite validar de manera estricta las variables, asegurando que, por ejemplo, el `PORT` sea numérico y otras variables obligatorias estén presentes. Además, proporciona un mayor control sobre los errores de configuración al validar las variables desde el inicio de la aplicación. Sin embargo, una desventaja es la introducción de paquetes adicionales y dependencias.
