import React from 'react';

const ChatMessage = ({ type, content, sources, searchResults }) => {
  const isUser = type === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[70%] rounded-lg p-4 ${
          isUser ? 'bg-blue-500 text-white' : 'bg-gray-100'
        }`}
      >
        <div className="whitespace-pre-wrap">{content}</div>
        
        {!isUser && sources && sources.length > 0 && (
          <div className="mt-3">
            <div className="text-sm font-semibold text-gray-600">참고 문서:</div>
            <ul className="list-disc list-inside text-sm text-gray-600">
              {sources.map((source, index) => (
                <li key={index}>{source}</li>
              ))}
            </ul>
          </div>
        )}

        {!isUser && searchResults && searchResults.length > 0 && (
          <div className="mt-3">
            <div className="text-sm font-semibold text-gray-600">외부 검색 결과:</div>
            <ul className="list-disc list-inside text-sm text-gray-600">
              {searchResults.map((result, index) => (
                <li key={index}>
                  <a 
                    href={result.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {result.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;