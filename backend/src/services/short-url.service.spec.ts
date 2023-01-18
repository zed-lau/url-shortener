import { Test, TestingModule } from '@nestjs/testing';
import { mock, when, instance } from 'ts-mockito';
import { ShortUrlService } from './short-url.service';
import { ShortUrlRepository } from '../repositories/short-url.repository';
import { ShortUrl } from '../entities';
import {
  MockType,
  shortUrlRepositoryMockFactory,
} from '../../test/mocks/short-url.mock';

describe('ShortUrlService', () => {
  let service: ShortUrlService;
  let mockShortUrlRepo: MockType<ShortUrlRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShortUrlService,
        {
          provide: ShortUrlRepository,
          useFactory: shortUrlRepositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<ShortUrlService>(ShortUrlService);
    mockShortUrlRepo = module.get(ShortUrlRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return existing shortUrl if provided url exists in ShortUrlRepository', async () => {
    // Given
    const mockUrl = 'long.url.to.be.shortened';
    const mockedShortUrl: ShortUrl = mock(ShortUrl);
    when(mockedShortUrl.shortPath).thenReturn('existing.short.path');
    const mockShortUrl: ShortUrl = instance(mockedShortUrl);

    mockShortUrlRepo.exists.mockReturnValue(true);
    mockShortUrlRepo.getOne.mockReturnValue(mockShortUrl);

    // When
    const shortUrl = await service.shortenUrl(mockUrl);

    // Then
    expect(shortUrl).toBe('localhost:3000/existing.short.path');
    expect(mockShortUrlRepo.create).not.toHaveBeenCalled();
  });

  it('should call ShortUrlRepository to create short url if url does not exist', async () => {
    // Given
    const mockUrl = 'long.url.to.be.shortened';
    mockShortUrlRepo.exists.mockReturnValue(false);

    // When
    const shortUrl = await service.shortenUrl(mockUrl);

    // Then
    expect(shortUrl).toMatch(
      new RegExp(`^localhost:3000/[a-zA-z]{2,${mockUrl.length}}$`),
    );
    expect(mockShortUrlRepo.getOne).not.toHaveBeenCalled();

    const shortPath = shortUrl.substring(shortUrl.lastIndexOf('/') + 1);
    expect(mockShortUrlRepo.create).toHaveBeenCalledWith({
      url: mockUrl,
      shortPath,
    });
  });

  it('should call ShortUrlRepository to create short url with length 17 when provided with url with length 18', async () => {
    // Given
    const mockUrl = 'eighteen.character';
    mockShortUrlRepo.exists.mockReturnValue(false);

    // When
    const shortUrl = await service.shortenUrl(mockUrl);

    // Then
    expect(shortUrl).toMatch(new RegExp(`^localhost:3000/[a-zA-z]{2}$`));
    expect(shortUrl.length).toEqual(17);
    expect(mockShortUrlRepo.getOne).not.toHaveBeenCalled();

    const shortPath = shortUrl.substring(shortUrl.lastIndexOf('/') + 1);
    expect(mockShortUrlRepo.create).toHaveBeenCalledWith({
      url: mockUrl,
      shortPath,
    });
  });
});
