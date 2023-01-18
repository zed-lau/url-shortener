import { Test, TestingModule } from '@nestjs/testing';
import { mock, when, instance } from 'ts-mockito';
import { ShortUrlService } from '../services/short-url.service';
import { ShortUrlController } from './short-url.controller';
import { ShortenUrlDto } from '../dtos';
import { ShortUrlRepository } from '../repositories/short-url.repository';
import {
  MockType,
  shortUrlRepositoryMockFactory,
  shortUrlServiceMockFactory,
} from '../../test/mocks/short-url.mock';

describe('ShortUrlController', () => {
  let controller: ShortUrlController;
  let mockShortUrlService: MockType<ShortUrlService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShortUrlController],
      providers: [
        { provide: ShortUrlService, useFactory: shortUrlServiceMockFactory },
        {
          provide: ShortUrlRepository,
          useFactory: shortUrlRepositoryMockFactory,
        },
      ],
    }).compile();

    controller = module.get<ShortUrlController>(ShortUrlController);
    mockShortUrlService = module.get(ShortUrlService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call ShortUrlService to shorten url', async () => {
    // Given
    const mockedShortenUrlDto: ShortenUrlDto = mock(ShortenUrlDto);
    when(mockedShortenUrlDto.url).thenReturn('long.url.to.be.shortened');
    const mockShortenUrlDto: ShortenUrlDto = instance(mockedShortenUrlDto);

    const mockShortUrl = 'host/short.url';
    mockShortUrlService.shortenUrl.mockReturnValue(mockShortUrl);

    // When
    const shortUrl = await controller.shortenUrl(mockShortenUrlDto);

    // Then
    expect(shortUrl).toStrictEqual({ url: mockShortUrl });
  });
});
