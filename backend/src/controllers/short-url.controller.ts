import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { ShortUrlService } from '../services/short-url.service';
import { ShortenUrlDto } from '../dtos';

@Controller('shortUrl')
export class ShortUrlController {
  constructor(private readonly shortUrlService: ShortUrlService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async shortenUrl(@Body() req: ShortenUrlDto): Promise<{ url: string }> {
    return {
      url: await this.shortUrlService.shortenUrl(req.url),
    };
  }
}
