import { Module } from '@nestjs/common';

import { OmdbApiService } from './obdm-api.service';

@Module({
  providers: [OmdbApiService],
  exports: [OmdbApiService],
})
export class OmdbApiModule {}
