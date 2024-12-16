import { z } from 'zod';
import { api } from '../api';

export const bookFormSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, { message: 'Required' }),
  author: z
    .object({
      value: z.coerce.string().optional(),
      label: z.string(),
    })
    .optional()
    .nullable(),
  published_date: z.string().date(),
  default_price: z.coerce
    .number({ message: 'Required' })
    .min(1, { message: 'Required' }),
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
  default_price: number;
  genres: Array<{ id: string; name: string }>;
};

export const getBooks = () => {
  return api.get('/bs_api/books/').then((res) => res.data.data as Book[]);
};

export const getBook = (bookId: string) => {
  return api
    .get(`/bs_api/books/${bookId}`)
    .then((res) => res.data.data as Book);
};

export const createBook = (body: z.infer<typeof bookFormSchema>) => {
  return api.post('/bs_api/books/', body).then((res) => res.data);
};

export const updateBook = (
  bookId: string,
  body: z.infer<typeof bookFormSchema>,
) => {
  return api.put(`/bs_api/books/${bookId}`, body).then((res) => res.data);
};
