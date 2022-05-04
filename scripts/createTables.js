const Database = require('sqlite-async');

const DB = await Database('chatr.db').open;

DB.execute(`
  CREATE TABLE IF NOT EXISTS chatr (
    id PRIMARY KEY
    recipientId
    senderId
    message
    createdAt
  );`);