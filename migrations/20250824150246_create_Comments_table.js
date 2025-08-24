
export async function up(knex) {
  return knex.schema.createTable("comments", function (table) {
    table.increments("comment_id").primary();
    table.integer('user_id').notNullable();
    table.integer('post_id').notNullable();
    table.string("comment", 100).notNullable();
    table.timestamp("created_at", { useTz: true }).defaultTo(knex.fn.now());
    table.timestamp("updated_at", { useTz: true }).defaultTo(knex.fn.now());
    table.foreign('user_id').references('user_id').inTable('users').onDelete('CASCADE');
    table.foreign('post_id').references('post_id').inTable('blogs').onDelete('CASCADE');
  });
};



export async function down(knex) {
  return knex.schema.dropTable('comments');
};
