import { getCookie, setCookie } from 'cookies-next';
import createApiClient from './api-client-factory';

const api = createApiClient({
  getCookie: (name) => getCookie(name),
  setCookie,
});

export { api };
