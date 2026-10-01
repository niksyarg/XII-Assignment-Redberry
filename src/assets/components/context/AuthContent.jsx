import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const fetchUser = async () => {
    const token = localStorage.getItem('kinoxii_token');
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const data = await authService.getMe();
      setUser(data);
    } catch (error) {
      localStorage.removeItem('kinoxii_token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();

   
    const handleUnauthorized = () => {
      setUser(null);
      setIsLoginOpen(true);
    };

    window.addEventListener('auth:unauthorized', handleUnauthorized);
    return () => window.removeEventListener('auth:unauthorized', handleUnauthorized);
  }, []);

  const login = async (credentials) => {
    const data = await authService.login(credentials);
    await fetchUser();
    setIsLoginOpen(false);
    return data;
  };

  const register = async (userData) => {
    const data = await authService.register(userData);
    await fetchUser();
    setIsRegisterOpen(false);
    return data;
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  
  const isProfileComplete = user && user.full_name && user.mobile_number && user.date_of_birth;

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isLoginOpen,
        setIsLoginOpen,
        isRegisterOpen,
        setIsRegisterOpen,
        login,
        register,
        logout,
        fetchUser,
        isProfileComplete,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);