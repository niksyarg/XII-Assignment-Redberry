import { api } from './api';

export const sessionService = {
  async getSessions(params) {
    const response = await api.get('/sessions', { params });
    return response.data;
  },

  async getSessionById(id) {
    const response = await api.get(`/sessions/${id}`);
    return response.data;
  },

  async getSessionSeats(id) {
    const response = await api.get(`/sessions/${id}/seats`);
    return response.data;
  }
};