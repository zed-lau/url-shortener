import { IShortUrl } from '../types';

export class ShortUrl {
  constructor({ url, shortPath }: IShortUrl) {
    this.url = url;
    this.shortPath = shortPath;
  }

  readonly url: string;
  readonly shortPath: string;
}
