
const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: 'db/chatr.db',
  },
});

module.exports = class Chatr {
  static new = async ({recipientId, senderId, message} = {}) => {
    return await knex('chatr')
      .insert({recipientId, senderId, message, createdAt: knex.fn.now()});
  };

  static forUser = async recipientId => {
    return await knex('chatr')
      .select(['chatr.id', 'recipientId', 'senderId', 'message', 'createdAt'])
      .where('recipientId', recipientId)
      .orderBy('createdAt', 'desc')
      .limit(100);
  };

  static all = () => {
    return knex('chatr')
      .select(['id', 'recipientId', 'senderId', 'message', 'createdAt'])
      .orderBy('createdAt', 'desc')
      .limit(100);
  };
}