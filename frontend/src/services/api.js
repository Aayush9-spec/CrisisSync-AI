import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const createEvent = (data) => api.post('/api/events', data);
export const quickSOS = (data) => api.post('/api/events/quick', data);
export const simulateIncident = () => api.get('/api/simulate');
export const getIncidents = (params) => api.get('/api/incidents', { params });
export const getIncidentById = (id) => api.get(`/api/incidents/${id}`);
export const updateIncidentStatus = (id, data) => api.patch(`/api/incidents/${id}/status`, data);
export const getAnalytics = () => api.get('/api/analytics');
export const chatWithAI = (data) => api.post('/api/chat', data);

export default api;
