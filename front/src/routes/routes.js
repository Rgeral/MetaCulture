const express = require('express');
const router = express.Router();

const { sendEmail } = require('../services/backendService');

// Route pour l'envoi d'un e-mail
router.get('/send-email', async (req, res) => {
  const { email } = req.query;

  try {
    await sendEmail(email);
    res.status(200).json({ message: 'E-mail envoyé avec succès' });
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
    res.status(500).json({ message: 'Erreur lors de l\'envoi de l\'e-mail. Veuillez réessayer plus tard.' });
  }
});

module.exports = router;
