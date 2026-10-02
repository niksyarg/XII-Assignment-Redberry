import React from 'react';
import { useAuth } from '../context/AuthContext';

export const Navbar = () => {
  const { user, setIsLoginOpen, setIsRegisterOpen, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* ლოგო */}
        <div className="flex items-center space-x-8">
          <a href="/" className="text-2xl font-black tracking-wider text-red-600">
            KINO<span className="text-white">XII</span>
          </a>
          <nav className="hidden md:flex space-x-6 text-sm text-gray-300">
            <a href="/" className="hover:text-white transition">მთავარი</a>
            <a href="/movies" className="hover:text-white transition">ფილმები</a>
            <a href="/series" className="hover:text-white transition">სერიალები</a>
          </nav>
        </div>

    
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                {user.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={user.full_name} 
                    className="w-10 h-10 rounded-full object-cover border border-white/20"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center font-bold">
                    {user.full_name?.[0]?.toUpperCase()}
                  </div>
                )}
                <span className="hidden sm:inline font-medium text-sm">{user.full_name}</span>
              </div>
              <button 
                onClick={logout}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-sm font-medium rounded-lg transition"
              >
                გასვლა
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setIsLoginOpen(true)}
                className="px-4 py-2 text-sm font-medium hover:text-red-500 transition"
              >
                შესვლა
              </button>
              <button 
                onClick={() => setIsRegisterOpen(true)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-sm font-medium rounded-lg transition"
              >
                რეგისტრაცია
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};