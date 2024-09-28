import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class WebhookService {
  constructor(private readonly httpService: HttpService) {}

  async sendWebhook(url: string, data: any): Promise<void> {
    await firstValueFrom(this.httpService.post(url, data));
  }
}
