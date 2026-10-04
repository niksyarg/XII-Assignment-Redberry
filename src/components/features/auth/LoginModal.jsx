import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export const LoginModal = ({ isOpen, onClose }) => {
  const { login, setIsRegisterOpen } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  // მარტივი ვალიდაციები გალოჩკებისთვის/იქსებისთვის
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPasswordValid = password.length >= 6;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password });
      onClose(); // წარმატებული შესვლის შემდეგ იხურება
    } catch (err) {
      console.error("Login error:", err.response?.data);
      setError(err.response?.data?.message || 'არასწორი მეილი ან პაროლი');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md px-4 py-6">
      <div className="relative w-full max-w-md bg-[#121212] border border-white/10 rounded-2xl p-6 md:p-8 text-white shadow-2xl">
        {/* დახურვის ღილაკი */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-1">Log in</h2>
        <p className="text-xs text-gray-400 mb-6">Welcome back to KinoXII.</p>

        {error && <div className="mb-4 p-3 bg-red-600/20 border border-red-500/50 text-red-500 text-xs rounded-lg">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email ინფუთი */}
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">Email</label>
            <div className="relative">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@gmail.com"
                required
                className="w-full px-4 py-3 bg-[#1a1a1a] border border-white/10 rounded-xl text-sm focus:outline-none focus:border-red-600 transition pr-10"
              />
              {email && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm">
                  {isEmailValid ? <span className="text-green-500">✓</span> : <span className="text-red-500">✕</span>}
                </span>
              )}
            </div>
          </div>

          {/* Password ინფუთი */}
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">Password</label>
            <div className="relative">
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 bg-[#1a1a1a] border border-white/10 rounded-xl text-sm focus:outline-none focus:border-red-600 transition pr-10"
              />
              {password && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm">
                  {isPasswordValid ? <span className="text-green-500">✓</span> : <span className="text-red-500">✕</span>}
                </span>
              )}
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-3.5 bg-red-600 hover:bg-red-700 font-bold text-sm rounded-xl shadow-lg shadow-red-600/30 transition mt-2"
          >
            Log in
          </button>
        </form>

        {/* რეგისტრაციაზე გადასვლა */}
        <p className="text-center text-xs text-gray-400 mt-6">
          Don't have an account?{' '}
          <button 
            type="button"
            onClick={() => {
              onClose(); 
              setIsRegisterOpen(true); 
            }}
            className="text-red-500 font-semibold hover:underline ml-1"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};