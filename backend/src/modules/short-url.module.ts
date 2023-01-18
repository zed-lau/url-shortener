import { Module } from '@nestjs/common';
import { ShortUrlController } from '../controllers/short-url.controller';
import { ShortUrlService } from '../services/short-url.service';
import { ShortUrlRepository } from '../repositories/short-url.repository';

@Module({
  controllers: [ShortUrlController],
  providers: [ShortUrlService, ShortUrlRepository],
  exports: [ShortUrlService],
})
export class ShortUrlModule {}
