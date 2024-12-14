import { api } from '../api';
import { Book } from '../books/service';

type InventoryAction = 'add' | 'remove';

export type Inventory = {
  id: number;
  book_id: number;
  book: Book;
  quantity: number;
  action: InventoryAction;
};

export const getInventories = () => {
  return api.get('/bs_api/inventory').then((res) => res.data as Inventory[]);
};

export const addInventory = (
  bookId: string | number,
  params: { quantity: number; action: InventoryAction },
) => {
  return api
    .post('/bs_api/inventory', { book_id: bookId, ...params })
    .then((res) => res.data);
};
