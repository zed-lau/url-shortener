import { Knex } from 'knex';

const config: Knex.Config = {
  client: 'pg',
  connection: {
    host: process.env.PG_HOST,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: 'shorten_url',
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: 'migrations',
  },
};

export default config;
