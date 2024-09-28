import { Injectable } from '@nestjs/common';

@Injectable()
export class WebhooksService {
  async sendWebhook(webhook_url: string) {
    console.log(`Sending Webhook: ${webhook_url}`);
  }
}
