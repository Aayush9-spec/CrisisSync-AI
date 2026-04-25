import axios from 'axios';

// Base API URL - Ensure /api is included to match backend router prefixes
const API_URL = (import.meta.env.VITE_API_URL || 'https://crisis-sync-backend-112365499000.us-central1.run.app') + '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Incident Management
export const getIncidents = () => api.get('/incidents');
export const getAnalytics = () => api.get('/analytics');
export const updateIncidentStatus = (id, data) => api.patch(`/incidents/${id}/status`, data);

// Event Generation
export const createEvent = (data) => api.post('/events', data);
export const quickSOS = (data) => api.post('/events/quick', data);
export const simulateIncident = () => api.post('/simulate');
export const uploadVisualIntel = (id, image_data) => api.post(`/events/${id}/visual-intel`, { image_data });

// AI Features
export const chatWithAI = (data) => api.post('/chat', data);

export default api;
