import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { OmdbApiService } from './omdb-api.service';
import { OmdbErrorInterceptor } from './omdb-error.interceptor';

@Module({
  providers: [
    OmdbApiService,
    { provide: APP_INTERCEPTOR, useClass: OmdbErrorInterceptor },
  ],
  exports: [OmdbApiService],
})
export class OmdbApiModule {}
