import axios from '../utils/axios';

export const API = {
  login: (data) => axios.post('/login', data),
  
  // 채팅 관련 API
  sendMessage: (data) => axios.post('/chatapi/rqa/', data),
  getSessionList: (data) => axios.post('/chatapi/getsessionlist', data),
  
  // 필요한 경우 다른 API 엔드포인트들 추가
};

export const handleApiError = (error) => {
  if (error.response) {
    // 서버가 응답을 반환한 경우
    const status = error.response.status;
    const message = error.response.data?.message || '서버 오류가 발생했습니다.';
    
    switch (status) {
      case 400:
        return '잘못된 요청입니다.';
      case 401:
        return '인증이 필요합니다.';
      case 403:
        return '접근 권한이 없습니다.';
      case 404:
        return '요청한 리소스를 찾을 수 없습니다.';
      case 500:
        return '서버 오류가 발생했습니다.';
      default:
        return message;
    }
  } else if (error.request) {
    // 요청은 보냈지만 응답을 받지 못한 경우
    return '서버에 연결할 수 없습니다.';
  } else {
    // 요청 설정 중에 오류가 발생한 경우
    return '요청 중 오류가 발생했습니다.';
  }
};