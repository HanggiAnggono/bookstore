import { z } from 'zod';

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
  return fetch('/bs_api/books/authors/', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }).then((res) => res.json().then((data) => data?.data as Author[]));
};

export const createAuthor = (body: z.infer<typeof authorFormSchema>) => {
  return fetch('/bs_api/books/authors/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    credentials: 'include',
  }).then((res) => res.json());
};

export const deleteAuthor = (id: string) => {
  return fetch(`/bs_api/books/authors/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  }).then((res) => res.json());
};

export const updateAuthor = (
  id: string,
  body: z.infer<typeof authorFormSchema>,
) => {
  return fetch(`/bs_api/books/authors/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    credentials: 'include',
  }).then((res) => res.json());
};
