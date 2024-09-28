import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Movie, MovieDocument } from './movies.schema';

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel(Movie.name) private movieModel: Model<MovieDocument>,
  ) {}

  //TODO: add pagination feature
  async findAll(): Promise<Movie[]> {
    return this.movieModel
      .find(
        { type: 'movie' },
        {
          title: 1,
          cast: 1,
          directors: 1,
          similar_year: 1,
        },
      )
      .limit(20)
      .exec();
  }
}
