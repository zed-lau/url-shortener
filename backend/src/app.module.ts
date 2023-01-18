import { Module } from '@nestjs/common';
import { KnexModule } from 'nest-knexjs';
import { knexConfig } from './config/knex.config';
import { ShortUrlModule } from './modules/short-url.module';
import { UrlRedirectionModule } from './modules/url-redirection.module';

@Module({
  imports: [
    ShortUrlModule,
    UrlRedirectionModule,
    KnexModule.forRootAsync(knexConfig),
  ],
})
export class AppModule {}
