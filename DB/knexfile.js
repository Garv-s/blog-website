import dotenv from "dotenv"
dotenv.config()
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const exports = {

  development: {
    client: process.env.DB_CLIENT,
    connection: {
      database: process.env.DB_NAME,
      user:     process.env.DB_USER,
      password: process.env.DB_PASSWORD
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