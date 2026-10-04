import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export const RegisterModal = ({ isOpen, onClose }) => {
  const { register, setIsLoginOpen } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: ''
  });
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  // ვალიდაციის პირობები (გალოჩკებისთვის და იქსებისთვის)
  const isUsernameValid = formData.username.trim().length >= 2;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
  const isPasswordValid = formData.password.length >= 6;
  const isConfirmValid = formData.password_confirmation && formData.password === formData.password_confirmation;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isConfirmValid) {
      setError('პაროლები არ ემთხვევა ერთმანეთს');
      return;
    }

    try {
      const dataToSend = new FormData();
      dataToSend.append('username', formData.username);
      dataToSend.append('email', formData.email);
      dataToSend.append('password', formData.password);
      dataToSend.append('password_confirmation', formData.password_confirmation);
      if (avatar) {
        dataToSend.append('avatar', avatar);
      }

      await register(dataToSend);
      onClose();
    } catch (err) {
      console.error("Registration error:", err.response?.data);
      setError(err.response?.data?.message || 'რეგისტრაცია ვერ მოხერხდა. სცადეთ თავიდან.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md px-4 py-6">
      <div className="relative w-full max-w-md bg-[#121212] border border-white/10 rounded-2xl p-6 md:p-8 text-white shadow-2xl max-h-[90vh] overflow-y-auto">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-1">Sign up</h2>
        <p className="text-xs text-gray-400 mb-6">Welcome to KinoXII.</p>

        {error && <div className="mb-4 p-3 bg-red-600/20 border border-red-500/50 text-red-500 text-xs rounded-lg">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* სურათის ატვირთვა */}
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1.5">
              Upload avatar <span className="text-gray-500">(optional)</span>
            </label>
            <label className="flex items-center space-x-3 w-full p-3 border-2 border-dashed border-white/10 rounded-xl cursor-pointer bg-[#1a1a1a] hover:border-red-600/50 transition">
              {avatarPreview ? (
                <img src={avatarPreview} alt="Avatar" className="w-10 h-10 rounded-full object-cover border border-red-500" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-red-600/20 flex items-center justify-center text-red-500">📷</div>
              )}
              <div className="text-left">
                <p className="text-xs font-medium text-gray-300">JPEG, PNG or WEBP</p>
                <p className="text-[10px] text-gray-500">ატვირთეთ ფოტო</p>
              </div>
              <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
            </label>
          </div>

          {/* Username */}
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">Username</label>
            <div className="relative">
              <input 
                type="text" 
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                placeholder="User"
                required
                className="w-full px-4 py-3 bg-[#1a1a1a] border border-white/10 rounded-xl text-sm focus:outline-none focus:border-red-600 transition pr-10"
              />
              {formData.username && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm">
                  {isUsernameValid ? <span className="text-green-500">✓</span> : <span className="text-red-500">✕</span>}
                </span>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">Email</label>
            <div className="relative">
              <input 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="example@gmail.com"
                required
                className="w-full px-4 py-3 bg-[#1a1a1a] border border-white/10 rounded-xl text-sm focus:outline-none focus:border-red-600 transition pr-10"
              />
              {formData.email && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm">
                  {isEmailValid ? <span className="text-green-500">✓</span> : <span className="text-red-500">✕</span>}
                </span>
              )}
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">Password</label>
            <div className="relative">
              <input 
                type="password" 
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 bg-[#1a1a1a] border border-white/10 rounded-xl text-sm focus:outline-none focus:border-red-600 transition pr-10"
              />
              {formData.password && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm">
                  {isPasswordValid ? <span className="text-green-500">✓</span> : <span className="text-red-500">✕</span>}
                </span>
              )}
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">Confirm password</label>
            <div className="relative">
              <input 
                type="password" 
                value={formData.password_confirmation}
                onChange={(e) => setFormData({...formData, password_confirmation: e.target.value})}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 bg-[#1a1a1a] border border-white/10 rounded-xl text-sm focus:outline-none focus:border-red-600 transition pr-10"
              />
              {formData.password_confirmation && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm">
                  {isConfirmValid ? <span className="text-green-500">✓</span> : <span className="text-red-500">✕</span>}
                </span>
              )}
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-3.5 bg-red-600 hover:bg-red-700 font-bold text-sm rounded-xl shadow-lg shadow-red-600/30 transition mt-2"
          >
            Sign up
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-6">
          Already have an account?{' '}
          <button 
            type="button"
            onClick={() => {
              onClose();
              setIsLoginOpen(true);
            }}
            className="text-red-500 font-semibold hover:underline ml-1"
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  );
};