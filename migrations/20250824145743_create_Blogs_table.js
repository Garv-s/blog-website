
export async function up(knex) {
  return knex.schema.createTable("blogs", function (table) {
    table.increments("post_id").primary();
    table.integer('user_id').notNullable();
    table.string("title", 100).notNullable();
    table.string("description", 255);
    table.text("content").notNullable();
    table.timestamp("created_at", { useTz: true }).defaultTo(knex.fn.now());
    table.timestamp("updated_at", { useTz: true }).defaultTo(knex.fn.now());
    table.foreign('user_id').references('user_id').inTable('users').onDelete('CASCADE');
  });
};

export async function down(knex) {
    return knex.schema.dropTable('blogs');
};
