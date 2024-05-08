const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: "db",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});


// Route GET pour la racine
router.get('/', (req, res) => {
    const query = 'SHOW TABLES';

    db.query(query, (error, results, fields) => {

        console.log(error);
        console.log('Résultats :', results);
      });

    res.send('OKF');
});

module.exports = router;
