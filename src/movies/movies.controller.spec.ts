import { Types } from 'mongoose';
import { HttpModule } from '@nestjs/axios';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { Movie } from './movies.schema';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { SimilarYearService } from '../similar_year/similar_year.service';

describe('MoviesController', () => {
  let controller: MoviesController;
  let service: MoviesService;
  let similarYearService: SimilarYearService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [MoviesController],
      providers: [
        MoviesService,
        {
          provide: getModelToken('Movie'),
          useValue: {
            find: jest.fn().mockReturnThis(),
            limit: jest.fn().mockReturnThis(),
            exec: jest.fn(() => [
              {
                _id: new Types.ObjectId(),
                title: 'Movie 1',
                cast: ['Cast 1'],
                directors: ['Director 1'],
                year: 1990,
                similar_year: [],
              } as Movie,
              {
                _id: new Types.ObjectId(),
                title: 'Movie 2',
                cast: ['Cast 2'],
                directors: ['Director 2'],
                year: 2020,
                similar_year: [],
              } as Movie,
            ]),
          },
        },
        SimilarYearService,
      ],
    }).compile();

    controller = module.get<MoviesController>(MoviesController);
    service = module.get<MoviesService>(MoviesService);
    similarYearService = module.get<SimilarYearService>(SimilarYearService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should have a service defined', () => {
    expect(service).toBeDefined();
  });

  it('should have a similarYearService defined', () => {
    expect(similarYearService).toBeDefined();
  });

  it('should return movies list', async () => {
    const result = await controller.getMoviesWithWebhook({ webhook_url: '' });
    expect(result.length).toBe(2);
  });
});
