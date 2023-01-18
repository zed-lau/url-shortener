import { KnexModuleAsyncOptions } from 'nest-knexjs';
import config from '../knex/knexfile';

export const knexConfig: KnexModuleAsyncOptions = {
  useFactory: () => ({
    config,
  }),
};
