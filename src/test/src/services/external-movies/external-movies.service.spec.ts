import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

import { ExternalMoviesService } from '../../../../services/external-movies/external-movies.service';

jest.mock('axios');

describe('ExternalMoviesService', () => {
  const externalMoviesApiUrlMock = 'https://external-movies-mock.com';
  const externalMoviesTokenMock = 'token-mock';
  const year = 2015;
  let service: ExternalMoviesService;
  let configServiceMock: Partial<ConfigService>;

  beforeEach(async () => {
    configServiceMock = {
      get: jest.fn((key: string) => {
        if (key === 'TMDB_API_URL') return externalMoviesApiUrlMock;
        if (key === 'TMDB_TOKEN') return externalMoviesTokenMock;
        return null;
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExternalMoviesService,
        { provide: ConfigService, useValue: configServiceMock },
      ],
    }).compile();

    service = module.get<ExternalMoviesService>(ExternalMoviesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getMoviesByYear', () => {
    it('should call axios.get correctly', async () => {
      const axiosGetMock = jest.spyOn(axios, 'get').mockResolvedValue({
        data: { results: [{ title: 'First' }, { title: 'Second' }] },
      });

      const result = await service.getMoviesByYear(year);

      expect(axiosGetMock).toHaveBeenCalledWith(externalMoviesApiUrlMock, {
        headers: {
          Authorization: `Bearer ${externalMoviesTokenMock}`,
        },
        params: {
          primary_release_year: year,
          query: 'a',
          include_adult: false,
          language: 'en-US',
          page: 1,
        },
      });

      expect(result.data.results).toEqual([
        { title: 'First' },
        { title: 'Second' },
      ]);
    });

    it('should throw an error when axios fails', async () => {
      jest
        .spyOn(axios, 'get')
        .mockRejectedValue(new Error('API request failed'));

      await expect(service.getMoviesByYear(year)).rejects.toThrow(
        'API request failed',
      );
    });
  });
});
