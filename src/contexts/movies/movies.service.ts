import { Injectable } from '@nestjs/common';
import { MoviesRepository } from './repository/movie.repository';
import { SimilarYearService } from '../../services/similar-year/similar-year.service';

@Injectable()
export class MoviesService {
  constructor(
    private readonly movieRepository: MoviesRepository,
    private readonly similarYearService: SimilarYearService,
  ) {}

  async getMovies(): Promise<any[]> {
    const movies = await this.movieRepository.find();
    const moviesTitlesByYearPromises = movies.map((movie) =>
      this.similarYearService.getMoviesByYear(movie.year),
    );
    const moviesTitlesByYear = await Promise.all(moviesTitlesByYearPromises);
    return this.similarYearService.setSimilarYearMovies(
      movies,
      moviesTitlesByYear,
    );
  }
}
