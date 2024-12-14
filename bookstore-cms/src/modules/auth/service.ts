import { z } from 'zod';
import { api } from '../api';

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const getSession = () => {
  return api.get('/bs_api/auth/session').then((res) => res.data);
};

export const login = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  // make a request to gateway directly
  const url = `${process.env.API_GATEWAY_URL}/api/auth/login`;
  return api.post(url, { email, password }).then((res) => res.data);
};

export const logout = () => {
  return api.delete('/bs_api/auth/logout').then((res) => res.data);
};
