import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { OmdbApiService } from '../shared/omdb-api/obdm-api.service';

@Injectable()
export class SimilarYearService {
  constructor(
    private readonly configService: ConfigService,
    private readonly omdbApiService: OmdbApiService,
  ) {}

  async getMoviesByYear(year: number): Promise<any> {
    const response = await this.omdbApiService.getMoviesByYear(year);

    if (!response.data.Search) {
      return [];
    }

    return response.data.Search.slice(0, 5).map(({ Title }) => Title);
  }

  setMovies(movie: Record<string, any>, similarYearMovies: string[]) {
    movie.similar_year = similarYearMovies;
  }
}
