var express = require('express');
const { Chatr } = require('../model')
var router = express.Router();

router.get('/chatr/:recipientId', async function(req, res) {
  const { recipientId } = req.params;

  try {
    res.send({ chatr: await Chatr.forUser(recipientId) });
  } catch (err) {
    console.log(err);
    res.status(500).send({error: JSON.stringify(err)});
  }
});

router.get('/chatr/:recipientId/from/:senderId', async function(req, res) {
  const { recipientId, senderId } = req.params;

  try {
    res.send({ chatr: await Chatr.forUser(recipientId, senderId) });
  } catch (err) {
    console.log(err);
    res.status(500).send({error: JSON.stringify(err)});
  }
});

router.post('/chatr/:recipientId/from/:senderId', async (req, res) => {
  const { message } = req.body;
  const { recipientId, senderId } = req.params;

  try {
    await Chatr.new({recipientId, senderId, message});
    res.send(200);
  } catch (err) {
    console.log(err);
    res.status(500).send({error: JSON.stringify(err)});
  }
});

module.exports = router;
