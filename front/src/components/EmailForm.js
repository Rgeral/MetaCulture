const BASE_URL = 'https://votre-backend.com/api'; // Remplacez par l'URL de votre backend

export const sendEmail = async (email) => {
  try {
    const response = await fetch(`${BASE_URL}/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la requête au serveur');
    }

    const responseData = await response.json();
    console.log('Réponse du serveur :', responseData);
    return responseData;
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
    throw error;
  }
};
