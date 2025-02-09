import React, { createContext, useState, useContext } from 'react';
import ChatHistory from './ChatHistory';
import ChatWindow from './ChatWindow';
import './chat.css';
const ChatLayout = () => {
  const [selectedSession, setSelectedSession] = useState(null);

  return (
    <div className="flex h-screen">
      <div className="w-1/4 border-r">
        <ChatHistory onSelectSession={setSelectedSession} />
      </div>
      <div className="w-3/4">
        <ChatWindow sessionId={selectedSession} />
      </div>
    </div>
  );
    // <div class="container">
    //   <div class="sidebar"><ChatWindow sessionId={selectedSession} /></div>
    //   <div class="main"><ChatHistory onSelectSession={setSelectedSession} /></div>
    //   </div>
    // );
};

export default ChatLayout;