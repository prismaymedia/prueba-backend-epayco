import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class OmdbApiService {
  constructor(private readonly configService: ConfigService) {}

  async getMoviesByYear(year: number): Promise<any> {
    const apiUrl = this.configService.get<string>('OMDB_API_URL');
    const apiKey = this.configService.get<string>('OMDB_API_KEY');

    return axios.get(apiUrl, {
      params: {
        apiKey,
        y: year,
        type: 'movie',
        s: 'door',
      },
    });
  }
}
