const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const xrplClient = require('../utils/xrpl');
const auth = require('../utils/auth');

// Magic link path
router.get('/get', auth, async (req, res) => {

  console.log(req.decoded);
  res.status(200).json({ message: 'Hello user:'+ req.decoded.userId });

});

module.exports = router;
