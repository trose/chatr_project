const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: 'db/chatr.db',
  },
  useNullAsDefault: true
});

module.exports = class User {
}