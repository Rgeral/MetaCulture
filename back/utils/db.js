const mysql = require('mysql2');

// Configure database
const db = mysql.createConnection({
    host: "db",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Test connexion
db.connect((err) => {
    if (err) {
        console.error('Error:', err);
        return;
    }
    console.log('Connected to database');
});

module.exports = db;
