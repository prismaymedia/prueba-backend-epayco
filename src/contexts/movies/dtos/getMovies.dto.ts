import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class GetMoviesDto {
  @IsNotEmpty()
  @IsString()
  @IsUrl()
  webhook_url!: string;
}
