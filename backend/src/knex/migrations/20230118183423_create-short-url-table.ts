import { Knex } from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('short_url', (table: Knex.TableBuilder) => {
    table.string('url').primary();
    table.string('short_path').notNullable();
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('short_url');
}
