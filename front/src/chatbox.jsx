import React, { useState, useEffect } from 'react';

const Chatbox = () => {
  const [userMessages, setUserMessages] = useState([]);
  const [apiResponses, setApiResponses] = useState([]);
  const [displayedMessages, setDisplayedMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    // Combine user messages and API responses into a single array
    const combinedMessages = [];
    for (let i = 0; i < Math.max(userMessages.length, apiResponses.length); i++) {
      if (userMessages[i]) {
        combinedMessages.push(userMessages[i]);
      }
      if (apiResponses[i]) {
        combinedMessages.push(apiResponses[i]);
      }
    }
    setDisplayedMessages(combinedMessages);
  }, [userMessages, apiResponses]);

  const sendUserMessage = async (message) => {
    console.log('User message : =>', message);
    setUserMessages([...userMessages, message]);
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
      const responseData = await response.json();
      console.log('API response: =>', responseData.response);
      setApiResponses([...apiResponses, responseData.response]);
    } catch (error) {
      console.error('Error sending message to API:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (inputValue.trim() !== '') {
      setInputValue('');
      await sendUserMessage(inputValue);
    }
  };

  return (
    <div>
      <h2>Chatbox</h2>
      <div style={{ width: '600px', height: '400px', overflowY: 'scroll', border: '1px solid #ccc', marginBottom: '10px' }}>
        {displayedMessages.map((message, index) => (
          <div key={index} style={{ padding: '5px', textAlign: index % 2 === 0 ? 'left' : 'right' }}>
            {message}
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
