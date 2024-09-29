import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import { MoviesRepository } from '../../../../../contexts/movies/repository/movie.repository';
import { Movie } from '../../../../../contexts/movies/repository/schemas/movie.schema';

describe('MoviesRepository', () => {
  let repository: MoviesRepository;
  let movieModelMock = {
    find: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
  };

  beforeEach(async () => {
    movieModelMock = {
      find: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesRepository,
        { provide: getModelToken(Movie.name), useValue: movieModelMock },
      ],
    }).compile();

    repository = module.get<MoviesRepository>(MoviesRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('find', () => {
    it('should call the find method a default limit of 20', async () => {
      const mockMovies = [
        { _id: '1', title: 'First' },
        { _id: '2', title: 'Second' },
      ];
      (movieModelMock.limit as jest.Mock).mockResolvedValue(mockMovies);

      const result = await repository.find();

      expect(movieModelMock.find).toHaveBeenCalled();
      expect(movieModelMock.limit).toHaveBeenCalledWith(20);
      expect(result).toEqual(mockMovies);
    });

    it('should return an empty array when no movies found', async () => {
      (movieModelMock.limit as jest.Mock).mockResolvedValue([]);

      const result = await repository.find();

      expect(movieModelMock.find).toHaveBeenCalled();
      expect(movieModelMock.limit).toHaveBeenCalledWith(20);
      expect(result).toEqual([]);
    });
  });
});
