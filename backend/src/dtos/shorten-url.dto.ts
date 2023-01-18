import { IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ShortenUrlDto {
  // private readonly minPathLength: number = Number(process.env.APP_MIN_PATH_LENGTH)
  // private readonly host: string = process.env.APP_HOST
  // private readonly minUrlLength = this.host.length + this.minPathLength + 2
  constructor(url: string) {
    this.url = url;
  }

  @ApiProperty()
  @IsNotEmpty()
  @Length(Number(process.env.APP_MIN_URL_LENGTH), 255)
  readonly url: string;
}
