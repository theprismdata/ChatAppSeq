import React from "react";

export default function ChatMessage({
  type,
  content,
  sources = [],
  searchResults = [],
}) {
  return (
    <div className={`mb-4 ${type === "user" ? "text-right" : "text-left"}`}>
      <div
        className={`inline-block p-4 rounded-lg ${
          type === "user"
            ? "bg-blue-500 text-white"
            : "bg-gray-100 text-gray-800"
        }`}
      >
        <p>{content}</p>
      </div>
      {type === "bot" && sources.length > 0 && (
        <div className="mt-2 text-sm text-gray-600">
          <p className="font-semibold">참고 문서:</p>
          <ul className="list-disc list-inside">
            {sources.map((source, index) => (
              <li key={index}>{source}</li>
            ))}
          </ul>
        </div>
      )}
      {type === "bot" && searchResults.length > 0 && (
        <div className="mt-2 text-sm text-gray-600">
          <p className="font-semibold">관련 검색:</p>
          <ul className="list-disc list-inside">
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
  );
}
