import { api } from './api';

let filterOptionsCache = null;

export const movieService = {
  async getFilterOptions() {
    if (filterOptionsCache) return filterOptionsCache;
    const response = await api.get('/filter-options');
    filterOptionsCache = response.data;
    return filterOptionsCache;
  },

  async getNowPlaying() {
    const response = await api.get('/movies/now-playing');
    return response.data;
  },

  async getComingSoon() {
    const response = await api.get('/movies/coming-soon');
    return response.data;
  },

  async getFeatured() {
    const response = await api.get('/movies/featured');
    return response.data;
  },

  async getMovieDetail(id) {
    const response = await api.get(`/movies/${id}`);
    return response.data;
  },

  async getMovieSessions(id, date) {
    const response = await api.get(`/movies/${id}/sessions`, { params: { date } });
    return response.data;
  },

  async notifyMovie(id, email) {
    const response = await api.post(`/movies/${id}/notify`, { email });
    return response.data;
  }
};