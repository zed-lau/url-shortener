import { Repository } from 'typeorm';
import { ShortUrl } from '../../src/short-url/short-url.entity';
import { ShortUrlService } from '../../src/short-url/short-url.service';

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

export const shortUrlServiceMockFactory: () => MockType<ShortUrlService> =
  jest.fn(() => ({
    shortenUrl: jest.fn(),
    getUrl: jest.fn(),
  }));

export const shortUrlRepositoryMockFactory: () => MockType<
  Repository<ShortUrl>
> = jest.fn(() => ({
  createQueryBuilder: jest.fn(),
  findOneBy: jest.fn(),
  insert: jest.fn(),
}));
