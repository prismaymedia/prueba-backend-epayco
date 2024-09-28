import { Test, TestingModule } from '@nestjs/testing';
import { SimilarYearService } from './similar-year.service';

describe('SimilarYearService', () => {
  let service: SimilarYearService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SimilarYearService],
    }).compile();

    service = module.get<SimilarYearService>(SimilarYearService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
