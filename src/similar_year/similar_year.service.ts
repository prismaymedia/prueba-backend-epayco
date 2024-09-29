import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';

import { envs } from '../config/envs';
import { TMDBResponse } from './interfaces';

@Injectable()
export class SimilarYearService {
  private readonly logger = new Logger('SimilarYearService');

  constructor(private readonly httpService: HttpService) {}

  async findSimilarMoviesByYear(year: number, title = ''): Promise<string[]> {
    try {
      const params = {
        api_key: envs.apiKeyMovieApi,
        year: year,
        include_adult: false,
        include_video: false,
        language: 'en-US',
        page: 1,
        sort_by: 'popularity.desc',
      };
      const headers = {
        'Content-Type': 'application/json',
      };
      const { data } = await firstValueFrom(
        this.httpService.get<TMDBResponse>(envs.urlMovieApi, {
          params: params,
          headers: headers,
        }),
      );
      const similarMovies = data.results
        .map((movie) => movie.title)
        .filter((t) => t !== title)
        .slice(0, 5);
      return similarMovies;
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }
}
