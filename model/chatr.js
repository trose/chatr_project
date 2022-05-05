
const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: 'db/chatr.db',
  },
  useNullAsDefault: true
});

const OLDEST = new Date() - 30; // 30 days ago
const LIMIT = 100;

module.exports = class Chatr {
  static new = async ({recipientId, senderId, message}) => {
    return await knex('chatr')
      .insert({recipientId, senderId, message, createdAt: knex.fn.now()});
  };

  static forUser = async (recipientId, senderId) => {
    return await knex('chatr')
      .select(['chatr.id', 'recipientId', 'senderId', 'message', 'createdAt'])
      .where('createdAt', '>=', OLDEST)
      .andWhere(builder => {
        builder.andWhere('recipientId', recipientId);
        /* would make an overloaded function in TS */
        if (!!senderId) {
          builder.andWhere('senderId', senderId);
        }
      })
      .orderBy('createdAt', 'desc')
      .limit(LIMIT);
  };

  static all = () => {
    return knex('chatr')
      .select(['id', 'recipientId', 'senderId', 'message', 'createdAt'])
      .where('createdAt', '>=', OLDEST)
      .orderBy('createdAt', 'desc')
      .limit(LIMIT);
  };
}