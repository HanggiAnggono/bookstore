import { z } from 'zod';

export const bookFormSchema = z.object({
  title: z.string().min(1, { message: 'Required' }),
  author: z.string().min(1, { message: 'Required' }),
  published_date: z.string().date(),
});

export type Book = {
  id: number;
  title: string;
  author: string;
  published_date: string;
  quantity_on_hand: number;
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

export const updateBook = (bookId: string, body: BookFormData) => {
  return fetch(`/api/books/${bookId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    credentials: 'include',
  }).then((res) => res.json());
};
