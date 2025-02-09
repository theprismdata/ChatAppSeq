import { useState, useCallback, useEffect } from 'react';
import { API } from '../services/api';
import { useAuth } from './useAuth';

export const useChat = () => {
  const { userEmail } = useAuth();
  const [messages, setMessages] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [currentSession, setCurrentSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 세션 목록 불러오기
  const fetchSessions = useCallback(async () => {
    try {
      setLoading(true);
      const response = await API.getSessionList({ email: userEmail });
      const sessionArray = Object.entries(response.session_list[0] || {}).map(
        ([id, title]) => ({ id, title })
      );
      setSessions(sessionArray);
    } catch (error) {
      setError('세션 목록을 불러오는데 실패했습니다.');
      console.error('Session fetch error:', error);
    } finally {
      setLoading(false);
    }
  }, [userEmail]);

  // 메시지 전송
  const sendMessage = useCallback(async (message) => {
    try {
      setLoading(true);
      const response = await API.sendMessage({
        email: userEmail,
        question: message,
        session_id: currentSession?.id || 0,
        isnewsession: !currentSession
      });

      const newMessage = {
        type: 'user',
        content: message,
        timestamp: new Date().toISOString()
      };

      const botResponse = {
        type: 'bot',
        content: response.answer,
        sources: response.sourcelist,
        searchResults: response.searchlist,
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, newMessage, botResponse]);

      // 새 세션인 경우 세션 목록 업데이트
      if (!currentSession) {
        setCurrentSession({
          id: response.chat_session,
          title: message
        });
        fetchSessions();
      }

      return response;
    } catch (error) {
      setError('메시지 전송에 실패했습니다.');
      console.error('Message send error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [userEmail, currentSession, fetchSessions]);

  // 세션 변경
  const changeSession = useCallback(async (sessionId) => {
    try {
      setLoading(true);
      setCurrentSession(sessions.find(session => session.id === sessionId));
      // 여기에 해당 세션의 이전 메시지를 불러오는 로직을 추가할 수 있습니다
      setMessages([]); // 또는 이전 메시지 로드
    } catch (error) {
      setError('세션 변경에 실패했습니다.');
      console.error('Session change error:', error);
    } finally {
      setLoading(false);
    }
  }, [sessions]);

  // 초기 세션 목록 로드
  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  // 에러 리셋
  const resetError = () => setError(null);

  return {
    messages,
    sessions,
    currentSession,
    loading,
    error,
    sendMessage,
    changeSession,
    resetError
  };
};