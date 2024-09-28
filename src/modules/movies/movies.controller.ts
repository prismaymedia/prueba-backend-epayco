import { Controller, Get, Query } from '@nestjs/common';

import { GetMoviesDto } from './dtos/getMovies.dto';
import { MoviesService } from './movies.service';

@Controller('get-movies')
export class MoviesController {
  constructor(private readonly getMoviesUseCase: MoviesService) {}

  @Get()
  async getMovies(@Query() queryStrings: GetMoviesDto): Promise<any> {
    return this.getMoviesUseCase.getMovies();
  }
}
