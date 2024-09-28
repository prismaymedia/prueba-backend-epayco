import { Module } from '@nestjs/common';

import { SimilarYearService } from './similar-year.service';
import { OmdbApiModule } from '../shared/omdb-api/omdb-api.module';

@Module({
  providers: [SimilarYearService],
  exports: [SimilarYearService],
  imports: [OmdbApiModule],
})
export class SimilarYearModule {}
