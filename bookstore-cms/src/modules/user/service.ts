import { api } from '../api';

export const getUsers = () => {
  return api.get('/bs_api/users').then((res) => res.data);
};
