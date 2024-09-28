import { Test, TestingModule } from '@nestjs/testing';
import { OmdbApiService } from './obdm-api.service';

describe('OmdbApiService', () => {
  let service: OmdbApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OmdbApiService],
    }).compile();

    service = module.get<OmdbApiService>(OmdbApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
