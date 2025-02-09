import React, { useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';

const MessageList = ({ messages }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message, index) => (
        <ChatMessage
          key={index}
          type={message.type}
          content={message.content}
          sources={message.sources}
          searchResults={message.searchResults}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;