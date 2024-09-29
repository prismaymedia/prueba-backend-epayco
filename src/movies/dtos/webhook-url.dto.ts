import { IsString, IsUrl } from 'class-validator';

export class WebhookUrlDto {
  @IsString()
  @IsUrl()
  webhook_url: string;
}
