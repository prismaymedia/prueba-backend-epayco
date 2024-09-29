import { Injectable, UseInterceptors } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { ExternalMoviesErrorInterceptor } from './external-movies.interceptor';

@Injectable()
export class ExternalMoviesService {
  constructor(private readonly configService: ConfigService) {}

  @UseInterceptors(ExternalMoviesErrorInterceptor)
  getMoviesByYear(year: number): Promise<any> {
    const apiUrl = this.configService.get<string>('TMDB_API_URL');
    const token = this.configService.get<string>('TMDB_TOKEN');

    return axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        primary_release_year: year,
        query: 'a',
        include_adult: false,
        language: 'en-US',
        page: 1,
      },
    });
  }
}
