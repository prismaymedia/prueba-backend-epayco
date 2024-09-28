import { Controller, Get, Query } from '@nestjs/common';

import { GetMoviesDto } from './dtos/getMovies.dto';
import { MoviesService } from './movies.service';
import { WebhooksService } from '../webhooks/webhooks.service';

@Controller('get-movies')
export class MoviesController {
  constructor(
    private readonly getMoviesUseCase: MoviesService,
    private readonly webhooksService: WebhooksService,
  ) {}

  @Get()
  async getMovies(@Query() queryStrings: GetMoviesDto): Promise<any> {
    await this.webhooksService.sendWebhook(queryStrings.webhook_url);
    return this.getMoviesUseCase.getMovies();
  }
}
