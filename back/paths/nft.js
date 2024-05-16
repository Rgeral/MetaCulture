const express = require('express');
const router = express.Router();
const xrplClient = require('../utils/xrpl');
const jwt = require('jsonwebtoken');

// Magic link path
router.get('/get', async (req, res) => {

  const jwtSecret = process.env.JWT_SECRET;

  await xrplClient.connect();


  const bearerHeader = req.headers["authorization"];

  console.log(bearerHeader);

  const bearer = bearerHeader.split(' ');

  const bearerToken = bearer[1];

  try {
    if (!bearerToken) {
      return res.status(401).json({ message: 'No token provided' });
    }
    jwt.verify(bearerToken, jwtSecret, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: 'Invalid token' });
      } else {
        res.status(200).json({ message: 'Token is valid', id: decoded.userId });
      }
    }
  );
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }

});

module.exports = router;

