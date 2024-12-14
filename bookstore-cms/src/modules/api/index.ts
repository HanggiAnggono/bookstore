import axios from 'axios';
import { getCookie } from 'cookies-next';

const api = axios.create();

api.interceptors.request.use((config) => {
  const token = getCookie('access_token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export { api };
