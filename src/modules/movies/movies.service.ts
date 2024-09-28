import { Injectable } from '@nestjs/common';

@Injectable()
export class MoviesService {
  async getMovies(): Promise<any[]> {
    return [
      { title: 'Movie 1', director: 'Director 1' },
      { title: 'Movie 2', director: 'Director 2' },
    ];
  }
}
