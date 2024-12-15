import axios from 'axios';
import { getCookie } from 'cookies-next';

const api = axios.create();

api.interceptors.request.use((config) => {
  const token = getCookie('access_token');
  const refresh_token = getCookie('refresh_token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (refresh_token) {
    config.headers.refresh_token = refresh_token;
  }

  return config;
});

export { api };
