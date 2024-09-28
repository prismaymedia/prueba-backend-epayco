import { Injectable } from '@nestjs/common';
import { MoviesRepository } from './repository/movie.repository';
import { ServicesService } from '../services/services.service';

@Injectable()
export class MoviesService {
  constructor(
    private readonly movieRepository: MoviesRepository,
    private readonly servicesService: ServicesService,
  ) {}

  async getMovies(): Promise<any[]> {
    const movies = this.movieRepository.find();
    const omdbResult = await this.servicesService.getMoviesByYear(2024);

    return movies;
  }
}
