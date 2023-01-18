import { Inject, Injectable } from '@nestjs/common';
import { generate } from 'randomstring';
import { ShortUrlRepository } from '../repositories/short-url.repository';

@Injectable()
export class ShortUrlService {
  private readonly host: string = process.env.APP_HOST;

  constructor(
    @Inject(ShortUrlRepository)
    private readonly shortUrlRepo: ShortUrlRepository,
  ) {
    if (process.env.APP_HOST) {
      this.host = process.env.APP_HOST;
    } else {
      throw new Error('Missing environment variable: APP_HOST');
    }
  }
  async shortenUrl(url: string): Promise<string> {
    const exists = await this.shortUrlRepo.exists({ url });
    if (exists) {
      const existingShortUrl = await this.shortUrlRepo.getOne({ url });
      return this.buildShortenUrl(existingShortUrl.shortPath);
    }

    const pathLength = this.generateRandomInteger(
      2,
      this.getMaxPathLength(url.length),
    );
    const shortPath = await this.generateShortPath(pathLength);
    await this.shortUrlRepo.create({ url, shortPath });
    return this.buildShortenUrl(shortPath);
  }

  async getUrl(shortPath: string): Promise<string> {
    const shortUrl = await this.shortUrlRepo.getOne({ short_path: shortPath });
    return shortUrl.url;
  }

  private buildShortenUrl(shortPath: string) {
    return `${this.host}/${shortPath}`;
  }

  private getMaxPathLength(urlLength: number) {
    return urlLength - this.host.length - 2;
  }

  private generateRandomInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private async generateShortPath(length: number) {
    let retry = true;
    let shortPath: string;
    while (retry) {
      shortPath = generate({
        length,
        charset: 'alphabetic',
      });
      retry = await this.shortUrlRepo.exists({ short_path: shortPath });
    }
    return shortPath;
  }
}
