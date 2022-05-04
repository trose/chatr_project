var express = require('express');
const { Chatr } = require('../model')
var router = express.Router();

router.get('/chatr/:recipientId', async function(req, res) {
  try {
    const { recipientId } = req.params;
    res.send({ chatr: await Chatr.forUser(recipientId) });
  } catch (err) {
    console.log(err);
    res.status(500).send({error: JSON.stringify(err)});
  }
});

// router.get('/chatr/:recipientId/from/:senderId', function(req, res) {
//   try {
//     const { message } = req.body;
//     const { recipientId, senderId } = req.query;
//     res.send(Chatr.new({recipientId, senderId, message}));
//   } catch (err) {
    // res.status(500)
    // res.render('error', { error: err })
//   }
// });

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
