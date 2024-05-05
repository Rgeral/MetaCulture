const express = require('express');
const router = express.Router();
const mysql = require('mysql2');


const db = mysql.createConnection({
    host: "db",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

router.post('/', (req, res) => {

    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: "Error" });
    }

    // Do you know injection SQL LOL ?
    const query = 'INSERT INTO user (email) VALUES (?)';

    db.query(query, [email], (error, results) => {
        if (error) {
            console.error('Error:', error);
            return res.status(500).json({ error: "Error" });
        }
        res.status(201).json({ message: 'Success' });
    });
});

module.exports = router;
