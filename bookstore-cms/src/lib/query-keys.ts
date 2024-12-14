export const qk = {
  // auth
  session: () => ['session'],

  // books
  books: (filter = {}) => ['books', filter],
  book: (id: number | string) => ['book', id],
  bookCover: (id: number | string) => ['book-cover', id],

  // inventories
  inventories: () => ['inventories'],
  inventory: (id: number | string) => ['inventory', id],

  // genres
  genres: () => ['genres'],

  // authors
  authors: (filter = {}) => ['authors', filter],
  author: (id: number | string) => ['author', id],
};
