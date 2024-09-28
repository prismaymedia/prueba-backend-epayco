import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { SimilarYearService } from './similar_year.service';
import { of } from 'rxjs';
import { AxiosResponse } from 'axios';

describe('SimilarYearService', () => {
  let service: SimilarYearService;
  let httpService: HttpService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SimilarYearService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              if (key === 'OMDB_API_URL') return 'http://fakeapi.com';
              if (key === 'OMDB_API_KEY') return 'fakeapikey';
            }),
          },
        },
      ],
    }).compile();

    service = module.get<SimilarYearService>(SimilarYearService);
    httpService = module.get<HttpService>(HttpService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return similar movies for a given year', async () => {
    const mockResponse: AxiosResponse<any> = {
      data: {
        Search: [
          { Title: 'Movie 1' },
          { Title: 'Movie 2' },
          { Title: 'Movie 3' },
          { Title: 'Movie 4' },
          { Title: 'Movie 5' },
          { Title: 'Movie 6' },
        ],
      },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: null,
    };

    jest.spyOn(httpService, 'get').mockReturnValue(of(mockResponse));

    const result = await service.getSimilarMovies('2021');

    expect(httpService.get).toHaveBeenCalledWith(
      'http://fakeapi.com?apikey=fakeapikey&s=&y=2021',
    );
    expect(result).toEqual([
      'Movie 1',
      'Movie 2',
      'Movie 3',
      'Movie 4',
      'Movie 5',
    ]);
  });

  it('should handle empty search results', async () => {
    const mockResponse: AxiosResponse<any> = {
      data: {
        Search: [],
      },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: null,
    };

    jest.spyOn(httpService, 'get').mockReturnValue(of(mockResponse));

    const result = await service.getSimilarMovies('2021');
    expect(result).toEqual([]);
  });

  it('should handle missing Search field in response', async () => {
    const mockResponse: AxiosResponse<any> = {
      data: {},
      status: 200,
      statusText: 'OK',
      headers: {},
      config: null,
    };

    jest.spyOn(httpService, 'get').mockReturnValue(of(mockResponse));

    await expect(service.getSimilarMovies('2021')).rejects.toThrow();
  });
});
