export type Genre = {
  id: number;
  name: string;
};

export const getGenres = () => {
  return fetch('/api/books/genres', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }).then((res) => res.json().then((data) => data?.data as Genre[]));
};
