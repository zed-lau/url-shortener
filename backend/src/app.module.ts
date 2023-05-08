import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShortUrlModule } from './short-url/short-url.module';
import { UrlRedirectionModule } from './url-redirection/url-redirection.module';
import { dataSourceOptions } from './db/datasource';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    ShortUrlModule,
    UrlRedirectionModule,
  ],
})
export class AppModule {}
