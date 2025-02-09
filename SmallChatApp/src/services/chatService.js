import axios from '../utils/axios';

export const sendMessage = async (message, sessionId, isNewSession = true) => {
  const response = await axios.post('/chatapi/rqa/', {
    email: localStorage.getItem('userEmail'),
    question: message,
    session_id: sessionId,
    isnewsession: isNewSession
  });
  return response.data;
};

export const getSessionList = async () => {
  const response = await axios.post('/chatapi/getsessionlist', {
    email: localStorage.getItem('userEmail')
  });
  return response.data;
};