import React, { useState, useEffect, useRef } from 'react';
import * as Sentry from '@sentry/browser';
import ChatWindow from './components/ChatWindow.jsx';
import ChatInput from './components/ChatInput.jsx';

export default function App() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    // Scroll to the latest message
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function sendMessage(event) {
    event.preventDefault();
    if (!inputValue.trim() || loading) return;

    const userMessage = { id: Date.now(), sender: 'user', text: inputValue.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setLoading(true);
    console.log("Sending message to backend:", userMessage.text);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: userMessage.text })
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const botMessage = { id: Date.now() + 1, sender: 'bot', text: data.reply };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Failed to send message:', error);
      Sentry.captureException(error);
      const errorMessage = { id: Date.now() + 2, sender: 'bot', text: 'Error: Failed to get response.' };
      setMessages(prev => [...prev, errorMessage]);
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex flex-col text-gray-800">
      <div className="flex-1 overflow-auto p-4 bg-gray-100">
        <ChatWindow messages={messages} />
        <div ref={chatEndRef} />
      </div>
      <div className="p-4 bg-white border-t">
        <ChatInput 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)} 
          onSubmit={sendMessage} 
          loading={loading}
        />
      </div>
      <div className="p-2 text-center text-sm text-gray-500">
        <a href="https://www.zapt.ai" target="_blank" rel="noopener noreferrer" className="cursor-pointer">Made on ZAPT</a>
      </div>
    </div>
  );
}