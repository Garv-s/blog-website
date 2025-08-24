
export async function up(knex) {
  return knex.schema.createTable("users", function (table) {
    table.increments("user_id").primary();
    table.string("name", 100);
    table.string("email", 100);
    table.string("password", 100);
    table.timestamp("created_at", { useTz: true }).defaultTo(knex.fn.now());
  });
};

export async function down(knex) {
  return knex.schema.dropTable("users");
};
