import { Controller, Get, Query } from '@nestjs/common';

import { GetMoviesDto } from './dtos/getMovies.dto';
import { MoviesService } from './movies.service';
import { WebhooksService } from '../../services/webhooks/webhooks.service';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('movies')
@Controller()
export class MoviesController {
  constructor(
    private readonly getMoviesUseCase: MoviesService,
    private readonly webhooksService: WebhooksService,
  ) {}

  @Get('get-movies')
  @ApiOperation({
    summary:
      'Retorna una lista de las primeras 20 películas, cada una puede tener máximo 5 títulos de otras películas estrenada en el mismo año',
  })
  @ApiOkResponse({
    isArray: true,
    example: [
      {
        _id: '573a1391f29313caabcd68d0',
        title: 'From Hand to Mouth',
        directors: ['Alfred J. Goulding', 'Hal Roach'],
        cast: [
          'Harold Lloyd',
          'Mildred Davis',
          "'Snub' Pollard",
          'Peggy Cartwright',
        ],
        similar_year: [
          "J'accuse",
          "Sir Arne's Treasure",
          'The Grey Automobile',
          'Alraune and the Golem',
          'Ask Father',
        ],
      },
    ],
  })
  @ApiBadRequestResponse({
    status: 400,
    example: {
      statusCode: 400,
      message: [
        'webhook_url must be a URL address',
        'webhook_url must be a string',
        'webhook_url should not be empty',
      ],
      error: 'Bad Request',
    },
  })
  async getMovies(@Query() queryStrings: GetMoviesDto): Promise<any> {
    await this.webhooksService.sendWebhook(queryStrings.webhook_url);
    return this.getMoviesUseCase.getMovies();
  }
}
