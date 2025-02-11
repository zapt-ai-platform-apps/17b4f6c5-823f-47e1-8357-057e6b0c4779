import React from 'react';

export default function ChatMessage({ message }) {
  const isUser = message.sender === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`p-2 rounded max-w-xs ${isUser ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'}`}>
        {message.text}
      </div>
    </div>
  );
}