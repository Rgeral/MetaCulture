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
        const query1 = `
            INSERT INTO user (email)
            VALUES (?)
        `;

        // Execute the query with prepared parameters
        const result1 = await queryAsync(query1, [email]);

        // Generate JWT token
        const payload = { userId: result1.insertId };
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
        const result1 = await queryAsync(query1, [email]);

        // Check email founded
        if (result1.length === 0) {
            return res.status(404).json({ error: 'Email not found.' });
        }

        // Get userId
        const userId = result1[0].id;

        // Generate magic token
        const magicToken = generateUniqueHash(crypto.randomUUID());

        // Push magic token in database
        const query2 = `
            UPDATE user SET magic_token = ? WHERE id = ?
        `;
        const result2 = await queryAsync(query2, [magicToken, userId]);

        // Return response
        return res.status(202).json({ message: 'Please check your mailbox for the login email.', debug: magicToken });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error.' });
    }
});

// Magic link path
router.get('/login', async (req, res) => {

    console.log(req.query['magic-token']);

    const magicToken = req.query['magic-token'];

    // Magic token validation
    if (!magicToken || magicToken.length !== 64 || !/^[a-f0-9]{64}$/i.test(magicToken)) {
        return res.status(400).json({ error: 'Invalid magic token.' });
    }

    try {
        // Prepared SQL query to prevent SQL injection
        const query1 = 'SELECT * FROM user WHERE magic_token = ?';
        const result1 = await queryAsync(query1, [magicToken]);
        
        // Check email founded
        if (result1.length === 0) {
            return res.status(401).json({ error: 'Magic token not found.' });
        }

        // Get userId
        const userId = result1[0].id;

        // Push magic token in database
        const query2 = `
            UPDATE user SET magic_token = NULL WHERE id = ?
        `;
        const result2 = await queryAsync(query2, [userId]);

        // Generate JWT token
        const payload = { userId: userId };
        const token = jwt.sign(payload, secretKey, { expiresIn: '24h' });

        // Return response
        return res.status(201).json({ token: token });
    
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error.' });
    }
});

module.exports = router;
