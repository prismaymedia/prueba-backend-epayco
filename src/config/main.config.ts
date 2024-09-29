import { INestApplication, ValidationPipe } from '@nestjs/common';

import { ApiErrorInterceptor } from '../interceptors/api-error.interceptor';

export const mainConfig = (app: INestApplication) => {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalInterceptors(new ApiErrorInterceptor());
};
