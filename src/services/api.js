import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://localhost:3001',
  baseURL: 'https://api.github.com',
});

export default api;
