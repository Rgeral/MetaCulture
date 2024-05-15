const express = require('express');
const router = express.Router();
const xrplClient = require('../utils/xrpl');

// Magic link path
router.get('/get', async (req, res) => {

  await xrplClient.connect();

  try {
      // Return response
      return res.status(201).json({ test: "test" });

  } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error.' });
  }
});

module.exports = router;

