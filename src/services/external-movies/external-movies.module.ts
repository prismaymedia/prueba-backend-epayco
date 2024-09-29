import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { ExternalMoviesService } from './external-movies.service';
import { ExternalMoviesErrorInterceptor } from './external-movies.interceptor';

@Module({
  providers: [
    ExternalMoviesService,
    ExternalMoviesErrorInterceptor,
    { provide: APP_INTERCEPTOR, useClass: ExternalMoviesErrorInterceptor },
  ],
  exports: [ExternalMoviesService, ExternalMoviesErrorInterceptor],
})
export class ExternalMoviesModule {}
