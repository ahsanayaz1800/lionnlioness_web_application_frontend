const express = require('express');
const router = express.Router();
const { subscribeUser } = require('../controllers/subscriptionController');

router.post('/subscribe', subscribeUser);

module.exports = router;
  