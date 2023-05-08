import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { ShortUrlService } from './short-url.service';
import { ShortUrlDto } from './short-url.dto';

@Controller('shortUrl')
export class ShortUrlController {
  constructor(private readonly shortUrlService: ShortUrlService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async shortenUrl(@Body() req: ShortUrlDto): Promise<{ url: string }> {
    return {
      url: await this.shortUrlService.shortenUrl(req.url),
    };
  }
}
