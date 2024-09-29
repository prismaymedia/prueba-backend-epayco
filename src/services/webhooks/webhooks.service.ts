import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class WebhooksService {
  async sendWebhook(
    webhook_url: string,
    date: string = new Date().toISOString(),
  ) {
    return axios.post(webhook_url, {
      date,
    });
  }
}
