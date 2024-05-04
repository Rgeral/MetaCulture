// ApiService.js
import React from 'react';

const Llmapi = ({ sendMessage }) => {
  const sendUserMessage = async (message) => {
    console.log('message : =>', message);
    try {
      const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
    });
    if (!response.ok) {
        throw new Error('Failed to send message to API');
    }
      console.log('message', response.json());
      return await response.json();

    } catch (error) {
      console.error('Error sending message to API:', error);
      throw error;
    }
  };

  return (
    <div>
      <button onClick={() => sendMessage(sendUserMessage)}>Send Message to API</button>
    </div>
  );
};

export default Llmapi;
