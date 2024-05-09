const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;

const db = require('../db');

// Middleware to handle JSON requests
router.use(express.json());

// Add path
router.post('/add', (req, res) => {

    const { email } = req.body;

    // Strict validation for the email format
    if (!email || typeof email !== 'string' || email.length > 255 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    // Default values
    const magic_token = null;
    const given = false;

    // Prepared SQL query to prevent SQL injection
    const query = `
        INSERT INTO user (email, magic_token, given)
        VALUES (?, ?, ?)
    `;

    // Execute the query with prepared parameters
    db.query(query, [email, magic_token, given], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }

        const payload = {
            userId: results.insertId
        };
        const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

        res.status(201).json({ message: 'Success', token: token });
    });
});

// Middleware to handle errors and return consistent JSON
router.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
});

module.exports = router;
