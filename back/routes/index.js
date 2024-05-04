const express = require('express');
const router = express.Router();

// Route GET pour la racine
router.get('/', (req, res) => {
    res.send('Index');
});

module.exports = router;
