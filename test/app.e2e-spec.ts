import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { disconnect, isValidObjectId } from 'mongoose';
import { INestApplication, ValidationPipe } from '@nestjs/common';

import { envs } from './../src/config';
import { AppModule } from './../src/app.module';
import { ApiErrorInterceptor } from './../src/interceptors/api-error.interceptor';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    );
    app.useGlobalInterceptors(new ApiErrorInterceptor());
    await app.init();
  });

  it('/app (GET)', () => {
    return request(app.getHttpServer())
      .get('/app')
      .expect(200)
      .expect('Hello World!');
  });

  it('/get-movies (GET)', () => {
    return request(app.getHttpServer())
      .get('/get-movies')
      .query({ webhook_url: envs.testWebhookUrl })
      .expect(200);
  });

  it('/get-movies (GET) - should return 20 movies with the required fields', async () => {
    const response = await request(app.getHttpServer())
      .get('/get-movies')
      .query({ webhook_url: envs.testWebhookUrl })
      .expect(200);

    const movies = response.body;
    expect(movies).toHaveLength(20);

    movies.forEach((movie: any) => {
      expect(movie).toHaveProperty('_id');
      expect(isValidObjectId(movie._id)).toBe(true);
      expect(movie).toHaveProperty('cast');
      expect(Array.isArray(movie.cast)).toBe(true);
      expect(movie).toHaveProperty('title');
      expect(typeof movie.title).toBe('string');
      expect(movie).toHaveProperty('directors');
      expect(Array.isArray(movie.directors)).toBe(true);
      expect(movie).toHaveProperty('similar_year');
      expect(Array.isArray(movie.similar_year)).toBe(true);
    });
  });

  it('/get-movies (GET) - invalid webhook_url', () => {
    return request(app.getHttpServer())
      .get('/get-movies')
      .query({ webhook_url: 'invalid' })
      .expect(400);
  });

  afterAll(async () => {
    await app.close();
    await disconnect();
  });
});
