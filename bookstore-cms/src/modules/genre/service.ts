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

export const addGenre = async (genre: Omit<Genre, 'id'>) => {
  const resp = await fetch('/api/books/genres', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(genre),
    credentials: 'include',
  });

  const json = await resp.json();
  const data = json.data as Genre;

  return data;
};
