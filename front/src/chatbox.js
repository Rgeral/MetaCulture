// Chatbox.js
import React, { useState } from 'react';
import Llmapi from './llm_Api';

const Chatbox = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim() !== '') {
      setMessages([...messages, { text: inputValue, fromUser: true }]);
      setInputValue('');
    }
  };

  const sendMessageToApi = async (sendUserMessage) => {
    try {
      const response = await sendUserMessage('Test message to API');
      console.log('API response:', response);
      // Process API response as needed
    } catch (error) {
      console.error('Error sending message to API:', error);
    }
  };

  return (
    <div>
      <h2>Chatbox</h2>
      <div style={{ width: '600px' , height: '400px', overflowY: 'scroll', border: '1px solid #ccc', marginBottom: '10px' }}>
        {messages.map((message, index) => (
          <div key={index} style={{ padding: '5px', textAlign: message.fromUser ? 'left' : 'right' }}>
            {'Username : ' + message.text}
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
      <Llmapi sendMessage={sendMessageToApi} />
    </div>
  );
};

export default Chatbox;
