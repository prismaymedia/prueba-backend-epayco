import { Injectable } from '@nestjs/common';

import { ExternalMoviesService } from '../external-movies/external-movies.service';

@Injectable()
export class SimilarYearService {
  constructor(private readonly ExternalMoviesService: ExternalMoviesService) {}

  async getMoviesByYear(year: number): Promise<string[]> {
    const response = await this.ExternalMoviesService.getMoviesByYear(year);

    if (!response.data.results) {
      return [];
    }

    return response.data.results.slice(0, 5).map(({ title }) => title);
  }

  setSimilarYearMovies(
    movies: Record<string, any>[],
    moviesTitles: string[][],
  ) {
    return movies.map((movie, index) => {
      return {
        _id: movie._id,
        title: movie.title,
        directors: movie.directors,
        cast: movie.cast,
        similar_year: moviesTitles[index],
      };
    });
  }
}
