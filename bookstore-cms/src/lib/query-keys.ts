export const qk = {
  // books
  books: () => ['books'],
  book: (id: number | string) => ['book', id],
  bookCover: (id: number | string) => ['book-cover', id],

  // inventories
  inventories: () => ['inventories'],
  inventory: (id: number | string) => ['inventory', id],

  // genres
  genres: () => ['genres'],
};