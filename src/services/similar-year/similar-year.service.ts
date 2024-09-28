import { Injectable } from '@nestjs/common';

import { OmdbApiService } from '../omdb-api/omdb-api.service';

@Injectable()
export class SimilarYearService {
  constructor(private readonly omdbApiService: OmdbApiService) {}

  async getMoviesByYear(year: number): Promise<string[]> {
    const response = await this.omdbApiService.getMoviesByYear(year);

    if (!response.data.Search) {
      return [];
    }

    return response.data.Search.slice(0, 5).map(({ Title }) => Title);
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
