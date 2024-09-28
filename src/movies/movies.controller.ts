import { Controller, Get, Query } from '@nestjs/common';

import { Movie } from './movies.schema';
import { MoviesService } from './movies.service';

@Controller()
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('get-movies')
  async getMoviesWithWebhook(
    @Query('webhook_url') webhookUrl: string,
  ): Promise<Movie[]> {
    //TODO: add logic to send data to webhook
    console.log(`Webhook URL: ${webhookUrl}`);
    const movies = await this.moviesService.findAll();
    return movies;
  }
}
