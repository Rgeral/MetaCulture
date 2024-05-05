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
        combinedMessages.push({ content: userMessages[i], isUserMessage: true });
      }
      if (apiResponses[i]) {
        combinedMessages.push({ content: apiResponses[i], isUserMessage: false });
      }
    }
    setDisplayedMessages(combinedMessages);
  }, [userMessages, apiResponses]);

  const sendUserMessage = async (message) => {
    setUserMessages([...userMessages, message]);
    try {
      const response = await fetch('https://dc11-185-144-24-217.ngrok-free.app/api/v1/chat/chat-mistral', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
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
    <div className="max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Chatbox</h2>
      <div className="max-h-80 overflow-y-auto border border-gray-300 mb-4 p-4">
        {displayedMessages.map((message, index) => (
          <div key={index} className={`flex items-start mb-4 ${message.isUserMessage ? 'flex-row-reverse' : ''}`}>
              <img 
                src={message.isUserMessage ? 'user_profile.jpeg' : 'fred.jpeg'}
                alt="Profile"
                className="w-8 h-8 rounded-full mr-2"
              />
            <div className={`p-2 rounded ${message.isUserMessage ? 'bg-blue-100 text-right' : 'bg-gray-100 text-left'}`}>
              {message.content}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex items-center">
        <textarea
          className="w-full px-3 py-2 border border-gray-300 rounded mr-2 focus:outline-none focus:border-blue-500"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type your message..."
          rows="3"
        />
        <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none">Send</button>
      </form>
    </div>
  );
};

export default Chatbox;
