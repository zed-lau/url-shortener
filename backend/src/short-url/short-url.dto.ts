import { IsNotEmpty, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ShortUrlDto {
  constructor(url: string) {
    this.url = url;
  }

  @ApiProperty()
  @IsNotEmpty()
  @IsUrl({ protocols: ['http', 'https'] })
  readonly url: string;
}
