/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'blog_website_local',
      user:     'postgres',
      password: 'root'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'migrations'
    }
  },

}

export default exports;