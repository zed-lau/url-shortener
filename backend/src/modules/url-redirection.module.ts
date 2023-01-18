import { Module } from '@nestjs/common';
import { UrlRedirectionController } from '../controllers/url-redirection.controller';
import { UrlRedirectionService } from '../services/url-redirection.service';
import { ShortUrlModule } from './short-url.module';

@Module({
  controllers: [UrlRedirectionController],
  providers: [UrlRedirectionService],
  imports: [ShortUrlModule],
})
export class UrlRedirectionModule {}
