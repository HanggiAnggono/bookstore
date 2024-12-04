import { Book } from '../books/service'

type InventoryAction = 'add' | 'remove'

export type Inventory = {
  id: number;
  book_id: number;
  book: Book;
  quantity: number;
  action: InventoryAction;
};

export const getInventories = () => {
  return fetch('/api/inventory/', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }).then((res) => res.json().then((data) => data?.data as Inventory[]));
};

export const addInventory = (
  bookId: string | number,
  params: { quantity: number; action: InventoryAction },
) => {
  return fetch('/api/inventory/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ book_id: bookId, ...params }),
    credentials: 'include',
  }).then((res) => res.json());
};
