import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class GetMoviesDto {
  @ApiProperty({
    description: 'URL del webhook para enviar eventos',
    example: 'https://webhook.site/54969a3f-a479-4748-a314-08abe6161b71',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @IsUrl()
  webhook_url!: string;
}
