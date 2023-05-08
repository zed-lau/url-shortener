import { Controller, Get, Param, Res } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { Response } from 'express';
import { UrlRedirectionService } from './url-redirection.service';

@ApiExcludeController()
@Controller()
export class UrlRedirectionController {
  constructor(private readonly urlRedirectionService: UrlRedirectionService) {}

  @Get(':shortPath')
  async redirect(
    @Param('shortPath') shortPath,
    @Res() res: Response,
  ): Promise<void> {
    const redirectUrl = await this.urlRedirectionService.getRedirectUrl(
      shortPath,
    );
    return res.redirect(redirectUrl);
  }
}
