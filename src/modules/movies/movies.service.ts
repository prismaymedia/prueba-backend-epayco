import { Injectable } from '@nestjs/common';
import { MoviesRepository } from './repository/movie.repository';

@Injectable()
export class MoviesService {
  constructor(private readonly movieRepository: MoviesRepository) {}

  async getMovies(): Promise<any[]> {
    return this.movieRepository.find();
  }
}
