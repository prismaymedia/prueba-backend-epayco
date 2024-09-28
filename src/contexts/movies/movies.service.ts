import { Injectable } from '@nestjs/common';
import { MoviesRepository } from './repository/movie.repository';
import { SimilarYearService } from '../../services/similar-year/similar-year.service';

@Injectable()
export class MoviesService {
  constructor(
    private readonly movieRepository: MoviesRepository,
    private readonly servicesService: SimilarYearService,
  ) {}

  async getMovies(): Promise<any[]> {
    const movies = await this.movieRepository.find();
    const similarYearPromises = movies.map((movie) =>
      this.servicesService.getMoviesByYear(movie.year),
    );
    const similarYearsMovies = await Promise.all(similarYearPromises);

    for (let i = 0; i < movies.length; i++) {
      this.servicesService.setMovies(movies[i], similarYearsMovies[i]);
    }

    return movies;
  }
}
