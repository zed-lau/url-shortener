import { Module } from '@nestjs/common';
import { UrlRedirectionController } from './url-redirection.controller';
import { UrlRedirectionService } from './url-redirection.service';
import { ShortUrlModule } from '../short-url/short-url.module';

@Module({
  controllers: [UrlRedirectionController],
  providers: [UrlRedirectionService],
  imports: [ShortUrlModule],
})
export class UrlRedirectionModule {}
