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
