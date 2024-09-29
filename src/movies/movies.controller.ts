import { Controller, Get, Logger, Query } from '@nestjs/common';

import { WebhookUrlDto } from './dtos';
import { Movie } from './movies.schema';
import { MoviesService } from './movies.service';
import { SimilarYearService } from '../similar_year/similar_year.service';

@Controller()
export class MoviesController {
  private logger = new Logger('MoviesController');

  constructor(
    private readonly moviesService: MoviesService,
    private readonly similarYearService: SimilarYearService,
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
    //TODO: add logic to send data to webhook
    console.log(`Webhook URL: ${webhookUrlDto.webhook_url}`);
    this.logger.log(`Returning ${movies.length} movies`);
    return movies;
  }
}
