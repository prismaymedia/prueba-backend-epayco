import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MoviesRepository } from './repository/movie.repository';
import { Movie, MovieSchema } from './repository/schemas/movie.schema';

import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { ServicesModule } from '../services/services.module';

@Module({
  controllers: [MoviesController],
  providers: [MoviesService, MoviesRepository],
  imports: [
    MongooseModule.forFeature([
      {
        name: Movie.name,
        schema: MovieSchema,
      },
    ]),
    ServicesModule,
  ],
})
export class MoviesModule {}
