import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from '../src/app.module';

import { GetMoviesDto } from '../src/contexts/movies/dtos/getMovies.dto';

describe('MoviesController (e2e)', () => {
  let app: INestApplication;
  const webhookUrlMock =
    'https://webhook.site/8e31a796-1dae-44fa-885b-6d9d1f4c703b';

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/get-movies (GET)', () => {
    it('should return a list of 20 movies', () => {
      const queryParams: GetMoviesDto = {
        webhook_url: webhookUrlMock,
      };

      return request(app.getHttpServer())
        .get('/get-movies')
        .query(queryParams)
        .expect(200)
        .then((response) => {
          expect(response.body).toBeInstanceOf(Array);
        });
    });

    it('should return 400 if webhook_url is missing', () => {
      return request(app.getHttpServer())
        .get('/get-movies')
        .expect(400)
        .then((response) => {
          expect(response.body).toEqual({
            message: [
              'webhook_url must be a URL address',
              'webhook_url must be a string',
              'webhook_url should not be empty',
            ],
            error: 'Bad Request',
            statusCode: 400,
          });
        });
    });
  });
});
