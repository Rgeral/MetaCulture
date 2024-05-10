const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../db');
const { generateUniqueHash, createQueryAsync } = require('../utils');

const secretKey = process.env.JWT_SECRET;

// Middleware to handle JSON requests
router.use(express.json());

// Query asynchrone
const queryAsync = createQueryAsync(db);

// Add path
router.post('/add', async (req, res) => {
    const { email } = req.body;

    // Strict validation for the email format
    if (!email || typeof email !== 'string' || email.length > 255 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ error: 'Invalid email format.' });
    }

    try {
        // Prepared SQL query to prevent SQL injection
        const query = `
            INSERT INTO user (email)
            VALUES (?)
        `;

        // Execute the query with prepared parameters
        const results = await queryAsync(query, [email]);

        // Generate JWT token
        const payload = { userId: results.insertId };
        const token = jwt.sign(payload, secretKey, { expiresIn: '24h' });

        // Return response
        return res.status(201).json({ token: token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
});

// Magic link path
router.post('/magic-link', async (req, res) => {
    const { email } = req.body;

    // Email validation
    if (!email || typeof email !== 'string' || email.length > 255 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ error: 'Invalid email format.' });
    }

    try {
        // Prepared SQL query to prevent SQL injection
        const query1 = 'SELECT * FROM user WHERE email = ?';
        const results = await queryAsync(query1, [email]);

        // Check email founded
        if (results.length === 0) {
            return res.status(404).json({ error: 'Email not found.' });
        }

        // Get userId
        const userId = results[0].id;

        // Generate magicToken
        const magicToken = generateUniqueHash(crypto.randomUUID());

        // Push magicToken in database
        const query2 = `
            UPDATE user SET magic_token = ? WHERE id = ?
        `;
        await queryAsync(query2, [magicToken, userId]);

        // Return response
        return res.status(202).json({ message: 'Please check your mailbox for the login email.', debug: magicToken });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error.' });
    }
});

// Magic link path
router.get('/login', (req, res) => {
    return res.status(600).json({ Message: 'Test.' });
});


// Middleware to handle errors and return consistent JSON
router.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
});

module.exports = router;
