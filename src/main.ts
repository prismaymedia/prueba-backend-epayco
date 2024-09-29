import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';

import { envs } from './config';
import { AppModule } from './app.module';
import { ApiErrorInterceptor } from './interceptors/api-error.interceptor';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalInterceptors(new ApiErrorInterceptor());
  await app.listen(envs.port);
  logger.log(`Application running on http://localhost:${envs.port}`);
}
bootstrap();
