const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: 'db/chatr.db',
  },
  useNullAsDefault: true
});

async function setup() {
  try {
    /* Cleanup old tables if they exists */
    await knex.schema.dropTableIfExists('chatr');
    await knex.schema.dropTableIfExists('user');

    /* Currently unused but kept for example */
    await knex.schema.createTable('user', table => {
      table.increments('id');
      table.string('username').notNullable();
      table.unique('username');
      table.boolean('active');
    });
    await knex.schema.createTable('chatr', table => {
      table.increments('id');
      table.integer('recipientId').unsigned();
      table.integer('senderId').unsigned();
      table.string('message', 1080);
      table.datetime('createdAt');
      table.foreign('recipientId').references('user.id');
      table.foreign('senderId').references('user.id');
    });
  } catch (err) {
    console.log(err);
  }
  /* Script kept hanging. usually this isn't necesarry... */
  process.exit(1);
};

setup();