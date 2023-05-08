import { Test, TestingModule } from '@nestjs/testing';
import { ShortUrlService } from './short-url.service';
import { ShortUrlController } from './short-url.controller';
import { ShortUrlDto } from './short-url.dto';
import {
  MockType,
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
    const mockShortenUrlDto: ShortUrlDto = {
      url: 'long.url.to.be.shortened',
    };

    const mockShortenedUrl = 'shorten.url';
    mockShortUrlService.shortenUrl.mockReturnValue(mockShortenedUrl);

    // When
    const result = await controller.shortenUrl(mockShortenUrlDto);

    // Then
    expect(result).toEqual({
      url: 'shorten.url',
    });
  });
});
