import axios from 'axios';

type Args = {
  getCookie: (name: string) => string | undefined;
  setCookie: (
    name: string,
    value: string,
    options?: {
      req?: any;
      res?: any;
      maxAge?: number;
    },
  ) => void;
};

const createApiClient = (args: Args) => {
  const { getCookie, setCookie } = args;
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

  // response interceptor to refresh token
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        const refresh_token = getCookie('refresh_token');

        const resp = await api.post('/bs_api/auth/refresh', { refresh_token });

        if (resp.status === 200) {
          const {
            access_token,
            refresh_token: newRefreshToken,
            expires_in: maxAge,
          } = resp.data.data.session || {};

          setCookie('access_token', access_token, { maxAge });
          setCookie('refresh_token', newRefreshToken, { maxAge });

          return api(originalRequest);
        }
      }

      return Promise.reject(error);
    },
  );

  return api;
};

export default createApiClient;
