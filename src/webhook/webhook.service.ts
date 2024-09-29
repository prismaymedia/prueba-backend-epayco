import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { Injectable, Logger } from '@nestjs/common';

interface WebhookData {
  timestamp: Date;
}

@Injectable()
export class WebhookService {
  private logger = new Logger('WebhookService');

  constructor(private readonly httpService: HttpService) {}

  async send(webhookUrl: string, data: WebhookData): Promise<void> {
    try {
      await firstValueFrom(
        this.httpService.post(webhookUrl, data).pipe(
          catchError((error) => {
            throw error;
          }),
        ),
      );
      this.logger.log('Webhook sent successfully');
    } catch (error) {
      this.logger.error('Error sending webhook', error.message);
    }
  }
}
