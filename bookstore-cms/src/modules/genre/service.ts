import { api } from '../api';

export type Genre = {
  id: number;
  name: string;
};

export const getGenres = () => {
  return api
    .get('/bs_api/books/genres')
    .then((res) => res.data.data as Genre[]);
};

export const addGenre = async (genre: Omit<Genre, 'id'>) => {
  const response = await api.post('/bs_api/books/genres', genre);
  return response.data as Genre;
};
