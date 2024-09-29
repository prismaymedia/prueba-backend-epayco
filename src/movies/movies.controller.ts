import { Controller, Get, Logger, Query } from '@nestjs/common';

import { WebhookUrlDto } from './dtos';
import { Movie } from './movies.schema';
import { MoviesService } from './movies.service';
import { WebhookService } from '../webhook/webhook.service';
import { SimilarYearService } from '../similar_year/similar_year.service';

@Controller()
export class MoviesController {
  private logger = new Logger('MoviesController');

  constructor(
    private readonly moviesService: MoviesService,
    private readonly similarYearService: SimilarYearService,
    private readonly webhookService: WebhookService,
  ) {}

  @Get('get-movies')
  async getMoviesWithWebhook(
    @Query() webhookUrlDto: WebhookUrlDto,
  ): Promise<Movie[]> {
    const movies = await this.moviesService.findAll();
    for (const movie of movies) {
      const similarMovies =
        await this.similarYearService.findSimilarMoviesByYear(
          movie.year,
          movie.title,
        );
      movie.similar_year = similarMovies;
      movie.year = undefined;
    }
    this.webhookService.send(webhookUrlDto.webhook_url, {
      timestamp: new Date(),
    });
    this.logger.log(`Returning ${movies.length} movies`);
    return movies;
  }
}
