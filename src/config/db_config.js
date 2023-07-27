require('dotenv/config')

const username = process.env.DB_USER
const password = process.env.DB_PASSWORD
const database = process.env.DB_NAME
const host = process.env.DB_HOST
const dialect = process.env.DB_DIALECT
const logging = false

module.exports = {
  development: {
    username,
    password,
    database,
    host,
    dialect,
    logging,
  },
  test: {
    username,
    password,
    database,
    host,
    dialect,
    logging,
  },
  production: {
    username,
    password,
    database,
    host,
    dialect,
    logging,
  },
}
