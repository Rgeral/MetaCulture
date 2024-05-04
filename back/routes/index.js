const express = require('express');
const router = express.Router();

// Route GET pour la racine
router.get('/', (req, res) => {
    res.send('Welcome to the Home Page!');
});

// Route GET pour une page 'About'
router.get('/about', (req, res) => {
    res.send('Welcome to the About Page!');
});

// Route POST pour recevoir des données (exemple simplifié)
router.post('/submit-data', (req, res) => {
    // Vous pourriez ici traiter des données reçues via req.body
    // Assurez-vous que bodyParser est utilisé dans votre app principale pour parser les requêtes entrantes
    const data = req.body;
    res.status(200).send(`Data received: ${JSON.stringify(data)}`);
});

// Exportation du routeur pour l'utiliser dans le fichier principal du serveur
module.exports = router;
