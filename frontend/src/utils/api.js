const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

const getAuthToken = () => localStorage.getItem('authToken');

export const apiCall = async (endpoint, options = {}) => {
  const token = getAuthToken();
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers
    },
    ...options
  };

  const response = await fetch(`${API_BASE}${endpoint}`, config);
  
  if (response.status === 401) {
    localStorage.removeItem('authToken');
    window.location.href = '/login';
    return;
  }

  return response;
};