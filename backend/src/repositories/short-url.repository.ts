import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { ShortUrl } from '../entities';

export interface ShortUrlCriteria {
  url?: string;
  short_path?: string;
}

interface ShortUrlFields {
  url: string;
  short_path: string;
}

@Injectable()
export class ShortUrlRepository {
  constructor(@InjectModel() private readonly knex: Knex) {}

  async exists(criteria: ShortUrlCriteria) {
    try {
      const query = this.knex.table('short_url').select();

      Object.keys(criteria).forEach((key: string) => {
        query.where(key, criteria[key]);
      });

      return await query.first().then((result) => result != null);
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getOne(criteria: ShortUrlCriteria) {
    try {
      const query = this.knex.table('short_url').select();

      Object.keys(criteria).forEach((key: string) => {
        query.where(key, criteria[key]);
      });

      return await query.first().then((result) => this.map(result));
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async create(shortUrl: ShortUrl): Promise<ShortUrl> {
    try {
      await this.knex.table('short_url').insert({
        url: shortUrl.url,
        short_path: shortUrl.shortPath,
      });

      return shortUrl;
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private map({ url, short_path }: ShortUrlFields) {
    return new ShortUrl({
      url,
      shortPath: short_path,
    });
  }
}
