import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from '../../../../contexts/movies/movies.controller';
import { MoviesService } from '../../../../contexts/movies/movies.service';
import { WebhooksService } from '../../../../services/webhooks/webhooks.service';
import { GetMoviesDto } from '../../../../contexts/movies/dtos/getMovies.dto';

describe('MoviesController', () => {
  const webhookUrlMock = 'http://example.com/webhook';
  const moviesMock = ['First', 'Second'];
  let moviesController: MoviesController;
  let moviesService: MoviesService;
  let webhooksService: WebhooksService;

  beforeEach(async () => {
    const moviesServiceMock = {
      getMovies: jest.fn(),
    };

    const webhooksServiceMock = {
      sendWebhook: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [
        { provide: MoviesService, useValue: moviesServiceMock },
        { provide: WebhooksService, useValue: webhooksServiceMock },
      ],
    }).compile();

    moviesController = module.get<MoviesController>(MoviesController);
    moviesService = module.get<MoviesService>(MoviesService);
    webhooksService = module.get<WebhooksService>(WebhooksService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getMovies', () => {
    it('should call WebhooksService with the correct url', async () => {
      const queryStrings: GetMoviesDto = {
        webhook_url: webhookUrlMock,
      };
      (moviesService.getMovies as jest.Mock).mockResolvedValue(moviesMock);

      await moviesController.getMovies(queryStrings);

      expect(webhooksService.sendWebhook).toHaveBeenCalledWith(webhookUrlMock);
    });

    it('should return the movies from MoviesService', async () => {
      const queryStrings: GetMoviesDto = {
        webhook_url: webhookUrlMock,
      };
      (moviesService.getMovies as jest.Mock).mockResolvedValue(moviesMock);

      const result = await moviesController.getMovies(queryStrings);

      expect(result).toEqual(moviesMock);
      expect(moviesService.getMovies).toHaveBeenCalled();
    });
  });
});
