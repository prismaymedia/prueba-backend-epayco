import { Module } from '@nestjs/common';

import { SimilarYearService } from './similar-year.service';
import { ExternalMoviesModule } from '../external-movies/external-movies.module';

@Module({
  providers: [SimilarYearService],
  exports: [SimilarYearService],
  imports: [ExternalMoviesModule],
})
export class SimilarYearModule {}
