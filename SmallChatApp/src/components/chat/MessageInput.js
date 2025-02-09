import React, { useState } from 'react';

const MessageInput = ({ onSend, disabled }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  return (
    <div className="border-t p-4 bg-white">
      <form onSubmit={handleSubmit} className="flex space-x-4">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="메시지를 입력하세요..."
          disabled={disabled}
          className={`flex-1 resize-none border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[50px] max-h-[150px] ${
            disabled ? 'bg-gray-100' : 'bg-white'
          }`}
          rows="1"
        />
        <button
          type="submit"
          disabled={disabled || !message.trim()}
          className={`px-6 py-2 rounded-lg font-medium ${
            disabled || !message.trim()
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          전송
        </button>
      </form>
      {disabled && (
        <div className="text-sm text-gray-500 mt-2">
          메시지를 처리 중입니다...
        </div>
      )}
    </div>
  );
};

export default MessageInput;