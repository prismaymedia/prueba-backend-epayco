import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MoviesService } from './movies.service';
import { Movie, MovieSchema } from './movies.schema';
import { MoviesController } from './movies.controller';
import { WebhookModule } from '../webhook/webhook.module';
import { SimilarYearModule } from '../similar_year/similar_year.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }]),
    SimilarYearModule,
    WebhookModule,
  ],
  providers: [MoviesService],
  controllers: [MoviesController],
})
export class MoviesModule {}
