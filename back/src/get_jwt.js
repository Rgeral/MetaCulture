const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.get('', (req, res) => {
    const secretKey = process.env.SECRET_KEY;

    const payload = {
        user: 'example_user'
    };

    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

    res.json({ token });
});

module.exports = router;