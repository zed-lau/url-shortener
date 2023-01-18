import { ShortUrlService } from '../../src/services/short-url.service';
import { ShortUrlRepository } from '../../src/repositories/short-url.repository';

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<object>;
};

export const shortUrlServiceMockFactory: () => MockType<ShortUrlService> =
  jest.fn(() => ({
    shortenUrl: jest.fn(),
    getUrl: jest.fn(),
  }));

export const shortUrlRepositoryMockFactory: () => MockType<ShortUrlRepository> =
  jest.fn(() => ({
    exists: jest.fn(),
    getOne: jest.fn(),
    create: jest.fn(),
  }));
