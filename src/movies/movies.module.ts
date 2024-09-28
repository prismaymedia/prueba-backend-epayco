import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Movie, MovieSchema } from './movies.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }]),
  ]
})
export class MoviesModule {}
