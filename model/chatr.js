
const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: 'db/chatr.db',
  },
});

export default class Chatr {
  static sendChatr = ({recipientId, senderId, message}) => {
    return knex('chatr').insert({recipientId, senderId, message});
  };

  static forUser = recipientId => {
    return knex('chatr')
      .innerJoin('user', 'chatr.senderId', '=', 'user.id')
      .select(['id', 'recipientId', 'user.username as senderName', 'message', 'createdAt'])
      .where('recipientId', parseInt(recipientId))
      .orderBy('createdAt', 'desc')
      .limit(100);
  };

  static all = () => {
    return knex('chatr')
      .innerJoin('user', 'chatr.senderId', '=', 'user.id')
      .select(['id', 'recipientId', 'user.username as senderName', 'message', 'createdAt'])
      .orderBy('createdAt', 'desc')
      .limit(100);
  };
}