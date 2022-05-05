var express = require('express');
var router = express.Router();
const { Chatr } = require('../model')

router.get('/chatr/:recipientId', async function(req, res) {
  const { recipientId } = req.params;

  try {
    const chatr = await Chatr.forUser(recipientId);
    if (chatr.length > 0) {
      res.send({chatr});
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.get('/chatr/:recipientId/from/:senderId', async function(req, res) {
  const { recipientId, senderId } = req.params;

  try {
    const chatr = await Chatr.forUser(recipientId, senderId);
    if (chatr.length > 0) {
      res.send({chatr});
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.post('/chatr/:recipientId/from/:senderId', async (req, res) => {
  const { message } = req.body;
  const { recipientId, senderId } = req.params;

  try {
    await Chatr.new({recipientId, senderId, message});
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = router;
