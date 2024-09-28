import { Controller, Get, Query } from '@nestjs/common';

import { GetMoviesDto } from './dtos/getMovies.dto';

@Controller('get-movies')
export class MoviesController {
  @Get()
  async getMovies(@Query() queryStrings: GetMoviesDto): Promise<any> {
    return { message: 'Hello world!', params: queryStrings };
  }
}
