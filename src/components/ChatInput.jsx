import React from 'react';

export default function ChatInput({ value, onChange, onSubmit, loading }) {
  return (
    <form onSubmit={onSubmit} className="flex">
      <input 
        type="text" 
        value={value} 
        onChange={onChange} 
        placeholder="Type your message..." 
        className="flex-1 p-2 border border-gray-300 rounded-l box-border focus:outline-none"
      />
      <button 
        type="submit" 
        disabled={loading} 
        className="px-4 bg-blue-600 text-white rounded-r cursor-pointer disabled:opacity-50"
      >
        {loading ? 'Sending...' : 'Send'}
      </button>
    </form>
  );
}