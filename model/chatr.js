
const Database = require('sqlite-async');



  const stmt = db.prepare("INSERT INTO lorem VALUES (?)");
  for (let i = 0; i < 10; i++) {
      stmt.run("Ipsum " + i);
  }
  stmt.finalize();

  db.each("SELECT rowid AS id, info FROM lorem", (err, row) => {
      console.log(row.id + ": " + row.info);
  });

export default class Chatr {

  constructor(params) {

  }

  static DB = await Database('chatr.db').open;

  static sendChatr = ({recipientId, senderId, message}) => {
    return this.DB.execute(`
      INSERT INTO chatr (recipientId, senderId, message, createdAt)
      VALUES (?, ?, ?, NOW());`, recipientId, senderId, message);
  };

  static getAllByRecipientId = recipientId => {
    return this.DB.execute(`
      SELECT
        recepientId,
        senderId,
        message,
        created_at
      FROM
        chatr
      WHERE
        receipientId=?
      LIMIT ?
      ORDER BY created_at DESC;`, recipientId, 100);
  };

}