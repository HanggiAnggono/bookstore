import { z } from 'zod';
import { api } from '../api';

export const authorFormSchema = z.object({
  id: z.coerce.string().optional(),
  name: z.string().min(1, { message: 'Required' }),
});

export type AuthorFormValues = z.infer<typeof authorFormSchema>;

export type Author = {
  id: string;
  name: string;
};

export const getAuthors = () => {
  return api.get('/authors/').then((res) => res.data.data as Author[]);
};

export const createAuthor = (body: z.infer<typeof authorFormSchema>) => {
  return api.post('/authors/', body);
};

export const deleteAuthor = (id: string) => {
  return api.delete(`/authors/${id}`);
};

export const updateAuthor = (id: string, body: z.infer<typeof authorFormSchema>) => {
  return api.put(`/authors/${id}`, body);
};