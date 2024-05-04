import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { sendEmail } from '../services/backendService'; // Importez la fonction sendEmail depuis votre service backend

const EmailUserPage = () => {
  const [email, setEmail] = useState('');

  const handleSendEmail = async () => {
    try {
      // Appel de la fonction sendEmail du service backend avec l'e-mail
      await sendEmail(email);
      // Réinitialisation du champ d'e-mail après l'envoi réussi
      setEmail('');
      // Afficher une confirmation à l'utilisateur
      alert('E-mail envoyé avec succès !');
    } catch (error) {
      // Gérer les erreurs d'envoi
      console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
      alert('Erreur lors de l\'envoi de l\'e-mail. Veuillez réessayer plus tard.');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Saisissez votre e-mail :</Text>
      <TextInput
        style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1, margin: 10 }}
        onChangeText={text => setEmail(text)}
        value={email}
        placeholder="Adresse e-mail"
        keyboardType="email-address"
      />
      <Button
        title="Envoyer"
        onPress={handleSendEmail}
        disabled={!email} // Désactiver le bouton si le champ d'e-mail n'est pas rempli
      />
    </View>
  );
};

export default EmailUserPage;
