import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const PORT = configService.get('PORT', '3000');

  const swaggerConfig = new DocumentBuilder()
    .setTitle('EpaycoMovies')
    .setDescription('API para listar las primeras 20 películas')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  await app.listen(PORT);
  console.log(`Application is running on port ${PORT}`);
}

bootstrap();
