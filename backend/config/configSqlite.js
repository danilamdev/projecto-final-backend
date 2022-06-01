const configSqlite = {
  client: 'better-sqlite3',
  connection: {
    filename: './db/ecommerce.sqlite',
  },
  useNullAsDefault: true,
}

module.exports = configSqlite
