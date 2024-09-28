import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { WebhookService } from './webhook.service';

describe('MoviesController', () => {
  let controller: MoviesController;
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [
        {
          provide: MoviesService,
          useValue: {
            findAll: jest
              .fn()
              .mockResolvedValue([{ id: 1, title: 'Test Movie' }]),
          },
        },
        {
          provide: WebhookService,
          useValue: {
            send: jest.fn(),
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

  describe('findAll', () => {
    it('should return an array of movies', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([{ id: 1, title: 'Test Movie' }]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });
});
