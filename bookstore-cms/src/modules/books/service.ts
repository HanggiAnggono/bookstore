import axios from 'axios';
import { z } from 'zod';

export const bookFormSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, { message: 'Required' }),
  author: z
    .object({
      value: z.coerce.string().min(1, { message: 'Required' }),
      label: z.string(),
    })
    .nullable(),
  published_date: z.string().date(),
  genres: z
    .array(
      z.object({
        value: z.coerce.string().min(1, { message: 'Required' }),
        label: z.string(),
      }),
    )
    .optional(),
});

export type Book = {
  id?: number;
  title: string;
  author: { id: string; name: string };
  published_date: string;
  quantity_on_hand: number;
  genres: Array<{ id: string; name: string }>;
};

export const getBooks = () => {
  return axios.get('/api/books/').then((res) => res.data?.data as Book[]);
};

export const getBook = (bookId: string) => {
  return axios
    .get(`/api/books/${bookId}`)
    .then((res) => res.data?.data as Book);
};

export const createBook = (body: z.infer<typeof bookFormSchema>) => {
  return axios.post('/api/books/', body).then((res) => res.data);
};

export const updateBook = (
  bookId: string,
  body: z.infer<typeof bookFormSchema>,
) => {
  return axios
    .put(`/api/books/${bookId}`, body, {
      headers: { 'Content-Type': 'application/json' },
    })
    .then((res) => res.data);
};
