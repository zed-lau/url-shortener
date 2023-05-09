import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { nanoid } from 'nanoid';
import { ShortUrl } from './short-url.entity';

@Injectable()
export class ShortUrlService {
  private readonly host: string = process.env.APP_HOST;

  constructor(
    @InjectRepository(ShortUrl)
    private shortUrlRepo: Repository<ShortUrl>,
  ) {
    if (process.env.APP_HOST) {
      this.host = process.env.APP_HOST;
    } else {
      throw new Error('Missing environment variable: APP_HOST');
    }
  }

  async shortenUrl(url: string): Promise<string> {
    const pathLength = this.generateRandomInteger(
      1,
      this.getMaxPathLength(url.length),
    );
    const shortPath = await this.generateShortPath(pathLength);
    await this.shortUrlRepo.insert({ url, shortPath });
    return this.buildShortenUrl(shortPath);
  }

  async getUrl(shortPath: string): Promise<string> {
    const shortUrl = await this.shortUrlRepo
      .createQueryBuilder('shortUrl')
      .where('shortUrl.short_path=:shortPath', { shortPath })
      .getOne();
    return shortUrl.url;
  }

  private buildShortenUrl(shortPath: string) {
    return `${this.host}/${shortPath}`;
  }

  private getMaxPathLength(urlLength: number) {
    const minShortUrlLength =  this.host.length + 2
    if (minShortUrlLength > urlLength) {
      return 1;
    }
    return urlLength - minShortUrlLength;
  }

  private generateRandomInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private async generateShortPath(length: number) {
    let retry = true;
    let shortPath: string;
    while (retry) {
      shortPath = nanoid(length);
      retry = (await this.shortUrlRepo.findOneBy({ shortPath })) !== null;
      length++;
    }
    return shortPath;
  }
}
