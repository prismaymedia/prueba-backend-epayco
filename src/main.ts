import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { envs } from './config';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);
  await app.listen(envs.port);
  logger.log(`Application running on http://localhost:${envs.port}`);
}
bootstrap();
