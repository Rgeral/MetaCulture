const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.use(express.json());

router.post('/', (req, res) => {
  const { token } = req.body;

  const secretKey = process.env.SECRET_KEY;

  try {
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: 'Invalid token' });
      } else {
        res.status(200).json({ message: 'Token is valid', user: decoded.user });
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
