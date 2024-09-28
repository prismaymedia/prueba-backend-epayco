import { Controller, Get, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { WebhookService } from './webhook.service';
import { SimilarYearService } from './similar_year.service';
import { movies as Movies } from '@prisma/client';

@Controller('movies')
export class MoviesController {
  constructor(
    private readonly moviesService: MoviesService,
    private readonly webhookService: WebhookService,
    private readonly similarYearService: SimilarYearService,
  ) {}

  @Get()
  async findAll(): Promise<any[]> {
    return this.moviesService.findAll();
  }

  @Get('get-movies')
  async findAllWithWebhook(
    @Query('webhook_url') webhookUrl: string,
  ): Promise<Movies[]> {
    const movies = await this.moviesService.findAll();

    for (const movie of movies) {
      const similarMovies = await this.similarYearService.getSimilarMovies(
        movie.year,
      );
      movie.similar_year = similarMovies;
    }

    await this.webhookService.sendWebhook(webhookUrl, {
      timestamp: new Date(),
    });
    return movies;
  }
}
