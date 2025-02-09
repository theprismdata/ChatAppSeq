import React, { useState, useEffect } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { sendMessage } from '../../services/chatService';

const ChatWindow = ({ sessionId }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async (message) => {
    setLoading(true);
    try {
      let email = localStorage.getItem('userEmail');
      let isNewSession = true;
      if(sessionId === undefined) { 
        sessionId = 0;
        isNewSession = true;
      } else {
        isNewSession = false;
      }        
      console.log('session id', sessionId);
      console.log(email);
      const response = await sendMessage(message, sessionId, isNewSession);
      setMessages(prev => [...prev, 
        { type: 'user', content: message },
        { 
          type: 'bot', 
          content: response.answer,
          sources: response.sourcelist,
          searchResults: response.searchlist
        }
      ]);
    } catch (error) {
      console.error('메시지 전송 실패:', error);
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full">
      <MessageList messages={messages} />
      <MessageInput onSend={handleSendMessage} disabled={loading} />
    </div>
  );
};

export default ChatWindow;