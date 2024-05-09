const express = require('express');
const router = express.Router();
const db = require('../db');


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
