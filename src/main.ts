import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { envs, mainConfig } from './config';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);
  mainConfig(app);
  await app.listen(envs.port);
  logger.log(`Application running on http://localhost:${envs.port}`);
}
bootstrap();
