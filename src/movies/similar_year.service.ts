import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SimilarYearService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getSimilarMovies(year: string): Promise<AxiosResponse> {
    const apiUrl = this.configService.get<string>('OMBD_API_URL');
    const apiKey = this.configService.get<string>('OMBD_API_KEY');

    const response = await firstValueFrom(
      this.httpService.get(apiUrl, {
        params: {
          include_adult: 'false',
          include_video: 'false',
          language: 'en-US',
          page: '1',
          sort_by: 'popularity.desc',
          year: year,
        },
        headers: {
          Authorization: `Bearer ${apiKey}`,
          accept: 'application/json',
        },
      }),
    );

    return response.data.results.slice(0, 5).map((movie) => movie.title);
  }
}
