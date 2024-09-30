import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie } from './schemas/movie.schema';

interface FindMoviesOptions {
  limit?: number;
}

@Injectable()
export class MoviesRepository {
  constructor(@InjectModel(Movie.name) private movieModel: Model<Movie>) {}

  async find({ limit }: FindMoviesOptions = { limit: 20 }) {
    return this.movieModel.find().limit(limit);
  }
}
