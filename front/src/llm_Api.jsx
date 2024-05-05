import React, { useState, useEffect } from 'react';

const Chatbox = () => {
  const [userMessages, setUserMessages] = useState([]);
  const [apiResponses, setApiResponses] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    console.log('User messages updated:', userMessages);
    console.log('API responses updated:', apiResponses);
  }, [userMessages, apiResponses]);

  const sendUserMessage = async (message) => {
    console.log('message : =>', message);
    try {
      const response = await fetch('https://dc11-185-144-24-217.ngrok-free.app/api/v1/chat/chat-mistral', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });
      if (!response.ok) {
        throw new Error('Failed to send message to API');
      }
      return await response.json();
    } catch (error) {
      console.error('Error sending message to API:', error);
      throw error;
    }
  };

  const sendMessageToApi = async (message) => {
    try {
      const response = await sendUserMessage(message);
      const newMessage = response.response;
      console.log('API response: =>', newMessage);
      setApiResponses([...apiResponses, newMessage]);
    } catch (error) {
      console.error('Error sending message to API:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (inputValue.trim() !== '') {
      setUserMessages([...userMessages, inputValue]);
      sendMessageToApi(inputValue);
      setInputValue('');
    }
  };

  return (
    <div>
      <h2>Chatbox</h2>
      <div style={{ width: '600px', height: '400px', overflowY: 'scroll', border: '1px solid #ccc', marginBottom: '10px' }}>
        {userMessages.map((message, index) => (
          <div key={index} style={{ padding: '5px', textAlign: 'left' }}>
            {message}
          </div>
        ))}
        {apiResponses.map((response, index) => (
          <div key={index} style={{ padding: '5px', textAlign: 'right' }}>
            {response}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type your message..."
          style={{ marginRight: '10px' }}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chatbox;
