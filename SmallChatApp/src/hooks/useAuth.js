import { useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { loginUser, logoutUser } from '../services/authService';

export const useAuth = () => {
  const navigate = useNavigate();
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const { token, userEmail, login: setAuth } = context;

  const login = useCallback(async (email, password) => {
    try {
      const response = await loginUser({ email, password });
      setAuth(response.token, email);
      navigate('/chat');
      return response;
    } catch (error) {
      throw new Error(error.message || '로그인에 실패했습니다.');
    }
  }, [setAuth, navigate]);

  const logout = useCallback(() => {
    logoutUser();
    navigate('/login');
  }, [navigate]);

  const isAuthenticated = Boolean(token);

  return {
    token,
    userEmail,
    isAuthenticated,
    login,
    logout
  };
};