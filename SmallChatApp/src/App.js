import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import Login from './components/auth/Login';
import ChatLayout from './components/chat/ChatLayout';
import { FullPageLoading } from './components/common/Loading';

// 보호된 라우트 컴포넌트
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (isAuthenticated === null) {
    return <FullPageLoading />;
  }
  
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// 공개 라우트 컴포넌트 (로그인한 사용자는 채팅으로 리다이렉트)
const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (isAuthenticated === null) {
    return <FullPageLoading />;
  }
  
  return isAuthenticated ? <Navigate to="/chat" /> : children;
};

const App = () => {
  return (
    <div className="h-screen w-screen">
      <Routes>
        {/* 공개 라우트 */}
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } 
        />
        
        {/* 보호된 라우트 */}
        <Route 
          path="/chat" 
          element={
            <ProtectedRoute>
              <ChatLayout />
            </ProtectedRoute>
          } 
        />
        
        {/* 기본 리다이렉트 */}
        <Route 
          path="*" 
          element={<Navigate to="/chat" replace />} 
        />
      </Routes>
    </div>
  );
};

export default App;