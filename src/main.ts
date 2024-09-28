import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000;

  app.useGlobalInterceptors(new HttpErrorInterceptor());

  await app.listen(port);
}
bootstrap();
