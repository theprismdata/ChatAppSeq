import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { loginUser } from '../../services/authService';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password });
      login(email, password);
      console.log(response.token);
    } catch (err) {
      setError('로그인에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-300 via-white to-blue-100">
      <div className="max-w-md w-full space-y-8 p-10 bg-white bg-opacity-80 backdrop-blur-lg rounded-3xl shadow-2xl border border-blue-200">
        <h2 className="text-center text-4xl font-extrabold text-gray-800 drop-shadow-lg">☁️ 로그인 ☁️</h2>
        {error && <div className="text-red-500 text-center font-semibold">{error}</div>}
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-full shadow-md focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-transparent transition duration-300"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-full shadow-md focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-transparent transition duration-300"
          />
          <button
            type="submit"
            className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-full shadow-lg hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300"
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
