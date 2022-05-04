var express = require('express');
const { route } = require('../app');
var router = express.Router();

router.get('/chatr/:recipientId', function(req, res) {
  res.send('respond with a resource');
});

router.get('/chatr/:recipientId/from/:senderId', function(req, res) {
  res.send('respond with a resource');
});

route.post('/chatr/:recipientId/from/:senderId', (req, res) => {
  
});

module.exports = router;
