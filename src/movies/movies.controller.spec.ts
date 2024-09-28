import { Types } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { Movie } from './movies.schema';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';

describe('MoviesController', () => {
  let controller: MoviesController;
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
                similar_year: [],
              } as Movie,
              {
                _id: new Types.ObjectId(),
                title: 'Movie 2',
                cast: ['Cast 2'],
                directors: ['Director 2'],
                similar_year: [],
              } as Movie,
            ]),
          },
        },
      ],
    }).compile();

    controller = module.get<MoviesController>(MoviesController);
    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should have a service defined', () => {
    expect(service).toBeDefined();
  });

  it('should return movies list', async () => {
    const result = await controller.getMoviesWithWebhook('');
    expect(result.length).toBe(2);
  });
});
