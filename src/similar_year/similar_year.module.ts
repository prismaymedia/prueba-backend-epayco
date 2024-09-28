import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { SimilarYearService } from './similar_year.service';

@Module({
  imports: [HttpModule],
  providers: [SimilarYearService],
  exports: [SimilarYearService],
})
export class SimilarYearModule {}
