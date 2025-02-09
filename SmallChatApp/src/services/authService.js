import { API } from './api';
import { handleApiError } from './api';

export const loginUser = async (credentials) => {
  try {
    const response = await API.login(credentials);
    
    console.log(response.data.token)
    localStorage.setItem('token',response.data.token);
    localStorage.setItem('userEmail', response.data.email);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

export const validateToken = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return false;
  }

  try {
    // 토큰 유효성 검사를 위한 API 호출
    // 실제 엔드포인트는 서버 구현에 따라 다를 수 있습니다
    await API.validateToken();
    return true;
  } catch (error) {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    return false;
  }
};

// 로그아웃 함수
export const logoutUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userEmail');
  window.location.href = '/login';
};