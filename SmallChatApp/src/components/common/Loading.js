import React from 'react';

const Loading = ({ size = 'medium', text = '로딩 중...' }) => {
  // size에 따른 스피너 크기 설정
  const spinnerSize = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  // size에 따른 텍스트 크기 설정
  const textSize = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg'
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      {/* 스피너 애니메이션 */}
      <div className={`${spinnerSize[size]} relative`}>
        <div className="absolute w-full h-full border-4 border-gray-200 rounded-full"></div>
        <div className="absolute w-full h-full border-4 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
      </div>
      
      {/* 로딩 텍스트 */}
      {text && (
        <p className={`mt-2 text-gray-600 ${textSize[size]}`}>
          {text}
        </p>
      )}
    </div>
  );
};

// 다양한 사용 사례를 위한 추가 컴포넌트들
export const FullPageLoading = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
    <Loading size="large" />
  </div>
);

export const InlineLoading = () => (
  <Loading size="small" text={null} />
);

export const OverlayLoading = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
    <Loading />
  </div>
);

export default Loading;