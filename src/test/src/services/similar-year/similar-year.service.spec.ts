import { Test, TestingModule } from '@nestjs/testing';

import { SimilarYearService } from '../../../../services/similar-year/similar-year.service';
import { ExternalMoviesService } from '../../../../services/external-movies/external-movies.service';

describe('SimilarYearService', () => {
  let service: SimilarYearService;
  let externalMoviesServiceMock: Partial<ExternalMoviesService>;

  beforeEach(async () => {
    externalMoviesServiceMock = {
      getMoviesByYear: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SimilarYearService,
        { provide: ExternalMoviesService, useValue: externalMoviesServiceMock },
      ],
    }).compile();

    service = module.get<SimilarYearService>(SimilarYearService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getMoviesByYear', () => {
    it('should return an array of movie titles', async () => {
      const mockResponse = {
        data: {
          results: [
            { title: 'First' },
            { title: 'Second' },
            { title: 'Third' },
            { title: 'Fourth' },
            { title: 'Fifth' },
            { title: 'Sixth' },
          ],
        },
      };

      (
        externalMoviesServiceMock.getMoviesByYear as jest.Mock
      ).mockResolvedValue(mockResponse);

      const result = await service.getMoviesByYear(2014);

      expect(result).toEqual(['First', 'Second', 'Third', 'Fourth', 'Fifth']);
      expect(externalMoviesServiceMock.getMoviesByYear).toHaveBeenCalledWith(
        2014,
      );
    });

    it('should return an empty array when no results found', async () => {
      const mockResponse = {
        data: {
          results: null,
        },
      };

      (
        externalMoviesServiceMock.getMoviesByYear as jest.Mock
      ).mockResolvedValue(mockResponse);

      const result = await service.getMoviesByYear(2014);

      expect(result).toEqual([]);
      expect(externalMoviesServiceMock.getMoviesByYear).toHaveBeenCalledWith(
        2014,
      );
    });
  });

  describe('setSimilarYearMovies', () => {
    it('should merge movies and similar ', () => {
      const movies = [
        {
          _id: '1',
          title: 'First',
          directors: ['Director A'],
          cast: ['Actor A'],
        },
        {
          _id: '2',
          title: 'Second',
          directors: ['Director B'],
          cast: ['Actor B'],
        },
      ];

      const movieTitles = [['Third', 'Fourth'], ['Fifth']];

      const result = service.setSimilarYearMovies(movies, movieTitles);

      expect(result).toEqual([
        {
          _id: '1',
          title: 'First',
          directors: ['Director A'],
          cast: ['Actor A'],
          similar_year: ['Third', 'Fourth'],
        },
        {
          _id: '2',
          title: 'Second',
          directors: ['Director B'],
          cast: ['Actor B'],
          similar_year: ['Fifth'],
        },
      ]);
    });

    it('should return empty array when movies array is empty', () => {
      const result = service.setSimilarYearMovies([], []);
      expect(result).toEqual([]);
    });
  });
});
