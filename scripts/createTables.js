const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: 'db/chatr.db',
  },
});

async function setup() {
  try {
    /* Cleanup old tables if they exists */
    await knex.schema.dropTableIfExists('chatr');
    await knex.schema.dropTableIfExists('user');

    await knex.schema.createTable('user', table => {
      table.increments('id');
      table.string('username').notNullable();
      table.boolean('active');
    });
    await knex.schema.createTable('chatr', table => {
      table.increments('id');
      table.integer('recipientId').unsigned();
      table.integer('senderId').unsigned();
      table.string('message', 1080);
      table.datetime('createdAt');
      table.foreign(['recipientId', 'senderId'])
           .references(['id', 'id'])
           .inTable('user');
    });
  } catch (err) {
    console.log(err);
  }
  /* Script kept hanging. usually this isn't necesarry... */
  process.exit(1);
};

setup();