import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getIncidents = () => api.get('/incidents');
export const getAnalytics = () => api.get('/incidents/analytics');
export const createEvent = (data) => api.post('/events', data);
export const quickSOS = (data) => api.post('/events/sos', data);
export const updateIncidentStatus = (id, data) => api.patch(`/incidents/${id}/status`, data);
export const simulateIncident = () => api.post('/events/simulate');
export const chatWithAI = (data) => api.post('/ai/chat', data);

export default api;
