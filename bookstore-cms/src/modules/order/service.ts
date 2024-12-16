import { api } from '../api';
import { z } from 'zod';

export const orderFormSchema = z.object({
  user: z.object({
    value: z.coerce.string(),
    label: z.string(),
  }),
  book: z.object({
    value: z.coerce.string(),
    label: z.string(),
  }),
});

export interface Order {
  id: number;
  userId: string;
  bookId: number;
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export async function getOrders(): Promise<Order[]> {
  const response = await api.get<Order[]>('/bs_api/orders');
  return response.data;
}

export async function createOrder(data: z.infer<typeof orderFormSchema>) {
  const response = await api.post<Order>('/bs_api/orders', data);
  return response.data;
}
