import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShortUrlService } from './short-url.service';
import { ShortUrl } from './short-url.entity';
import {
  MockType,
  shortUrlRepositoryMockFactory,
} from '../../test/mocks/short-url.mock';

describe('ShortUrlService', () => {
  let service: ShortUrlService;
  let mockRepo: MockType<Repository<ShortUrl>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShortUrlService,
        {
          provide: getRepositoryToken(ShortUrl),
          useFactory: shortUrlRepositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<ShortUrlService>(ShortUrlService);
    mockRepo = module.get(getRepositoryToken(ShortUrl));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call Repository<ShortUrl> to create short url if short path is unique', async () => {
    // Given
    const mockUrl = 'long.url.to.be.shortened';
    jest.spyOn(mockRepo, 'findOneBy').mockImplementation(() => {
      return null;
    });

    // When
    const shortUrl = await service.shortenUrl(mockUrl);

    // Then
    expect(shortUrl).toMatch(
      new RegExp(`^localhost:3000/[a-zA-z0-9-_]{1,${mockUrl.length}}$`),
    );

    const shortPath = shortUrl.substring(shortUrl.lastIndexOf('/') + 1);
    expect(mockRepo.findOneBy).toHaveBeenCalledWith({
      shortPath,
    });
    expect(mockRepo.insert).toHaveBeenCalledWith({
      url: mockUrl,
      shortPath,
    });
  });

  it('should call Repository<ShortUrl> to create short url with path with length 1 when provided with url shorter than shortest possible shortened url', async () => {
    // Given
    const mockUrl = 'bit.ly';
    jest.spyOn(mockRepo, 'findOneBy').mockImplementation(() => {
      return null;
    });

    // When
    const shortUrl = await service.shortenUrl(mockUrl);

    // Then
    expect(shortUrl).toMatch(new RegExp(`^localhost:3000/[a-zA-z0-9-_]{1}$`));

    const shortPath = shortUrl.substring(shortUrl.lastIndexOf('/') + 1);
    expect(shortPath.length).toEqual(1);
    expect(mockRepo.findOneBy).toHaveBeenCalledWith({
      shortPath,
    });
    expect(mockRepo.insert).toHaveBeenCalledWith({
      url: mockUrl,
      shortPath,
    });
  });

  it('should call Repository<ShortUrl> to create short url with path with increased length (by 1) when first short path is found in repo', async () => {
    // Given
    const mockUrl = 'retry.url';
    jest
      .spyOn(mockRepo, 'findOneBy')
      .mockImplementationOnce((args) => {
        return { ...args };
      })
      .mockImplementationOnce(() => {
        return null;
      });

    // When
    const shortUrl = await service.shortenUrl(mockUrl);

    // Then
    expect(shortUrl).toMatch(new RegExp(`^localhost:3000/[a-zA-z0-9-_]{2}$`));

    const shortPath = shortUrl.substring(shortUrl.lastIndexOf('/') + 1);
    expect(shortPath.length).toEqual(2);
    expect(mockRepo.findOneBy).toHaveBeenCalledWith({
      shortPath,
    });
    expect(mockRepo.insert).toHaveBeenCalledWith({
      url: mockUrl,
      shortPath,
    });
  });
});
