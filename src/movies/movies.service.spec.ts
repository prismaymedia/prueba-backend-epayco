import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { PrismaService } from '../prisma/prisma.service';

describe('MovieService', () => {
  let service: MoviesService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: PrismaService,
          useValue: {
            movies: {
              findMany: jest
                .fn()
                .mockResolvedValue([{ id: 1, title: 'Test Movie' }]),
            },
          },
        },
      ],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of movies', async () => {
    const result = await service.findAll();
    expect(result).toEqual([{ id: 1, title: 'Test Movie' }]);
    expect(prismaService.movies.findMany).toHaveBeenCalledWith({ take: 20 });
  });

  it('should call findMany with correct parameters', async () => {
    await service.findAll();
    expect(prismaService.movies.findMany).toHaveBeenCalledWith({ take: 20 });
  });
});
