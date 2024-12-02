export const qk = {
  books: () => ['books'],
  book: (id: number | string) => ['book', id],
  bookCover: (id: number | string) => ['book-cover', id],

  inventories: () => ['inventories'],
  inventory: (id: number | string) => ['inventory', id],
};