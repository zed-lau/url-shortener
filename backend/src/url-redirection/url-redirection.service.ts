import { Injectable, Inject } from '@nestjs/common';
import { ShortUrlService } from '../short-url/short-url.service';

@Injectable()
export class UrlRedirectionService {
  private readonly httpPrefix = 'http';

  constructor(
    @Inject(ShortUrlService)
    private readonly shortUrlService: ShortUrlService,
  ) {}

  async getRedirectUrl(shortPath: string): Promise<string> {
    const url = await this.shortUrlService.getUrl(shortPath);
    if (url.startsWith(this.httpPrefix)) {
      return url;
    }
    return `${this.httpPrefix}://${url}`;
  }
}
