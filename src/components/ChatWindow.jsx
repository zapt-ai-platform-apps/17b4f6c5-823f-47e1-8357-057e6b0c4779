import React from 'react';
import ChatMessage from './ChatMessage.jsx';

export default function ChatWindow({ messages }) {
  return (
    <div className="space-y-4">
      {messages.map(msg => (
        <ChatMessage key={msg.id} message={msg} />
      ))}
    </div>
  );
}