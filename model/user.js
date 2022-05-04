const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: 'db/chatr.db',
  },
});

module.exports = class User {
  static sendChatr = ({recipientId, senderId, message}) => {
    return knex('chatr').insert({recipientId, senderId, message});
  };

  static forUser = recipientId => {
    return knex('chatr')
      .select(['id', 'recipientId', 'senderId', 'message', 'createdAt'])
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