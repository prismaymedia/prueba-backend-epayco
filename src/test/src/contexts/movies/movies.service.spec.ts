import { Test, TestingModule } from '@nestjs/testing';

import { MoviesService } from '../../../../contexts/movies/movies.service';
import { SimilarYearService } from '../../../../services/similar-year/similar-year.service';
import { MoviesRepository } from '../../../../contexts/movies/repository/movie.repository';

describe('MoviesService', () => {
  let service: MoviesService;
  let movieRepositoryMock: Partial<MoviesRepository>;
  let similarYearServiceMock: Partial<SimilarYearService>;

  beforeEach(async () => {
    movieRepositoryMock = {
      find: jest.fn(),
    };
    similarYearServiceMock = {
      getMoviesByYear: jest.fn(),
      setSimilarYearMovies: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        { provide: MoviesRepository, useValue: movieRepositoryMock },
        { provide: SimilarYearService, useValue: similarYearServiceMock },
      ],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getMovies', () => {
    it('should return movies merged with similar year titles', async () => {
      const mockMovies = [
        {
          _id: '1',
          title: 'First',
          year: 2002,
          directors: ['Director A'],
          cast: ['Actor A'],
        },
        {
          _id: '2',
          title: 'Second',
          year: 2001,
          directors: ['Director B'],
          cast: ['Actor B'],
        },
      ];

      (movieRepositoryMock.find as jest.Mock).mockResolvedValue(mockMovies);

      (similarYearServiceMock.getMoviesByYear as jest.Mock)
        .mockResolvedValueOnce(['Third', 'Fourth'])
        .mockResolvedValueOnce(['Fifth', 'Sixth']);

      const mockMoviesWithSimilarYears = [
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
          similar_year: ['Fifth', 'Sixth'],
        },
      ];

      (
        similarYearServiceMock.setSimilarYearMovies as jest.Mock
      ).mockReturnValue(mockMoviesWithSimilarYears);

      const result = await service.getMovies();

      expect(movieRepositoryMock.find).toHaveBeenCalled();
      expect(similarYearServiceMock.getMoviesByYear).toHaveBeenCalledTimes(2);
      expect(similarYearServiceMock.setSimilarYearMovies).toHaveBeenCalledWith(
        mockMovies,
        [
          ['Third', 'Fourth'],
          ['Fifth', 'Sixth'],
        ],
      );
      expect(result).toEqual(mockMoviesWithSimilarYears);
    });

    it('should return empty array if movies array is empty', async () => {
      (movieRepositoryMock.find as jest.Mock).mockResolvedValue([]);

      await service.getMovies();

      expect(movieRepositoryMock.find).toHaveBeenCalled();
      expect(similarYearServiceMock.getMoviesByYear).not.toHaveBeenCalled();
      expect(similarYearServiceMock.setSimilarYearMovies).toHaveBeenCalledWith(
        [],
        [],
      );
    });

    it('should throw an error when it fails', async () => {
      const mockMovies = [{ _id: '1', title: 'Movie A', year: 2021 }];

      (movieRepositoryMock.find as jest.Mock).mockResolvedValue(mockMovies);

      (similarYearServiceMock.getMoviesByYear as jest.Mock).mockRejectedValue(
        new Error('Failed similar year movies search'),
      );

      await expect(service.getMovies()).rejects.toThrow(
        'Failed similar year movies search',
      );
    });
  });
});
