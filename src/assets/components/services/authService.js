import { api } from './api';

export const authService = {
  async register(userData) {
    const response = await api.post('/register', userData);
    if (response.data.token) {
      localStorage.setItem('kinoxii_token', response.data.token);
    }
    return response.data;
  },

  async login(credentials) {
    const response = await api.post('/login', credentials);
    if (response.data.token) {
      localStorage.setItem('kinoxii_token', response.data.token);
    }
    return response.data;
  },

  async logout() {
    try {
      await api.post('/logout');
    } finally {
      localStorage.removeItem('kinoxii_token');
    }
  },

  async getMe() {
    const response = await api.get('/me');
    return response.data;
  },

  async updateProfile(profileData) {
    const response = await api.put('/profile', profileData);
    return response.data;
  }
};