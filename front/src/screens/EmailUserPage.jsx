import { useState } from 'react';

function EmailUserPage() {
  // State pour stocker la valeur de l'e-mail
  const [email, setEmail] = useState('');

  // Fonction de gestionnaire d'événements pour soumettre le formulaire
  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêcher le comportement par défaut du formulaire (rechargement de la page)

    try {
      // Envoyer les données de l'e-mail au serveur via une requête POST
      const response = await fetch('URL_DU_BACKEND', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      // Vérifier si la requête a réussi
      if (response.ok) {
        // Réinitialiser le champ d'e-mail après l'envoi réussi
        setEmail('');
        // Afficher une confirmation à l'utilisateur
        alert('E-mail envoyé avec succès !');
      } else {
        // Gérer les erreurs de la requête
        throw new Error('Erreur lors de l\'envoi de l\'e-mail');
      }
    } catch (error) {
      // Gérer les erreurs d'envoi
      console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
      alert('Erreur lors de l\'envoi de l\'e-mail. Veuillez réessayer plus tard.');
    }
  };

  return (
    <main className="grid min-h-full place-items-center bg-#213547 px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-white-900 sm:text-5xl">EMAIL</h1>
        <p className="mt-6 text-lg leading-7 text-white-800"></p>
        
        {/* Formulaire d'envoi d'e-mail */}
        <form onSubmit={handleSubmit} className="mt-10 flex flex-col items-center justify-center gap-y-6">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Votre adresse e-mail"
            className="rounded-md px-4 py-2 bg-white text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-7 py-2 text-m font-semibold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Envoyer
          </button>
        </form>
        
      </div>
    </main>
  );
}

export default EmailUserPage;
