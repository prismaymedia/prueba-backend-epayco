import { Test, TestingModule } from '@nestjs/testing';
import axios from 'axios';

import { WebhooksService } from '../../../../services/webhooks/webhooks.service';

jest.mock('axios');

describe('WebhooksService', () => {
  const webhookUrlMock = 'https://example.com/webhook';
  let service: WebhooksService;
  let axiosPostMock: jest.Mock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebhooksService],
    }).compile();

    service = module.get<WebhooksService>(WebhooksService);
    axiosPostMock = axios.post as jest.Mock;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should send a webhook with the current date', async () => {
    const dateNow = new Date().toISOString();

    axiosPostMock.mockResolvedValue({ status: 200 });

    await service.sendWebhook(webhookUrlMock, dateNow);

    expect(axiosPostMock).toHaveBeenCalledWith(webhookUrlMock, {
      date: dateNow,
    });
  });

  it('should handle axios errors', async () => {
    axiosPostMock.mockRejectedValue(new Error('Internal Server Error'));

    await expect(service.sendWebhook(webhookUrlMock)).rejects.toThrow(
      'Internal Server Error',
    );
  });
});
