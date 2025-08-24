
export async function up(knex) {
  return knex.schema.createTable("reactions", function (table) {
    table.increments("reaction_id").primary();
    table.integer('user_id').notNullable();
    table.integer('post_id').notNullable();
    table.enu('type', ['like', 'dislike']).notNullable();
    table.timestamp("created_at", { useTz: true }).defaultTo(knex.fn.now());
    table.timestamp("updated_at", { useTz: true }).defaultTo(knex.fn.now());
    table.foreign('user_id').references('user_id').inTable('users').onDelete('CASCADE');
    table.foreign('post_id').references('post_id').inTable('blogs').onDelete('CASCADE');
    table.unique(['user_id', 'post_id']);
  });
};


export async function down(knex) {
  return knex.schema.dropTable('reactions');
};
