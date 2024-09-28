import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class ServicesService {
  constructor(private readonly configService: ConfigService) {}

  async getMoviesByYear(year: string | number): Promise<any> {
    const apiUrl = this.configService.get<string>('OMDB_API_URL');
    const apiKey = this.configService.get<string>('OMDB_API_KEY');

    return axios.get(apiUrl, {
      params: {
        apiKey,
        year,
        type: 'movie',
        s: 'door',
      },
    });
  }
}
