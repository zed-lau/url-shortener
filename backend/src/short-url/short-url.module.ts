import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShortUrlController } from './short-url.controller';
import { ShortUrl } from './short-url.entity';
import { ShortUrlService } from './short-url.service';

@Module({
  controllers: [ShortUrlController],
  providers: [ShortUrlService],
  imports: [TypeOrmModule.forFeature([ShortUrl])],
  exports: [ShortUrlService],
})
export class ShortUrlModule {}
