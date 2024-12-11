import { z } from 'zod';

export const bookFormSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, { message: 'Required' }),
  author_id: z.string().min(1, { message: 'Required' }),
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
  return fetch('/api/books/', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }).then((res) =>
    res.json().then((data) => {
      return data?.data as Book[];
    }),
  );
};

export const getBook = (bookId: string) => {
  return fetch(`/api/books/${bookId}`, { method: 'GET' }).then((res) =>
    res.json().then((data) => data?.data as Book),
  );
};

export const createBook = (body: z.infer<typeof bookFormSchema>) => {
  return fetch('/api/books/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    credentials: 'include',
  }).then((res) => res.json());
};

export const updateBook = (
  bookId: string,
  body: z.infer<typeof bookFormSchema>,
) => {
  return fetch(`/api/books/${bookId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    credentials: 'include',
  }).then((res) => res.json());
};
