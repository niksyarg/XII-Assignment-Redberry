import { api } from './api';

export const orderService = {
  async createHold(sessionId, data) {
    const response = await api.post(`/sessions/${sessionId}/holds`, data);
    return response.data;
  },

  async getHold(holdId) {
    const response = await api.get(`/holds/${holdId}`);
    return response.data;
  },

  async releaseHold(holdId) {
    const response = await api.delete(`/holds/${holdId}`);
    return response.data;
  },

  async createOrder(orderData) {
    const response = await api.post('/orders', orderData);
    return response.data;
  },

  async refundOrder(orderId) {
    const response = await api.post(`/orders/${orderId}/refund`);
    return response.data;
  },

  async getTickets() {
    const response = await api.get('/tickets');
    return response.data;
  }
};