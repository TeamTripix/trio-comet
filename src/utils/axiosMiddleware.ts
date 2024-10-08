import axios from "axios"

// Create an Axios instance with default configuration
export const apiClient = axios.create({
  // baseURL: 'https://triocomet.com',
  baseURL: process.env.NEXTAUTH_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  config => {
    // config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    // config.headers.next.tags = ['collection']
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    if (error.response) {
      console.error('Response error:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('Request error:', error.request);
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);