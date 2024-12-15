import { api } from "../api";
import { z } from "zod";

export const orderFormSchema = z.object({
  customerName: z.string().min(1, { message: "Required" }),
  bookId: z.string().min(1, { message: "Required" }),
  quantity: z.coerce.number().min(1, { message: "Required" }),
});

export interface Order {
  id: number;
  customerName: string;
  bookId: number;
  quantity: number;
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