import { api } from "../api";

export interface Order {
  id: string;
  customerName: string;
  orderDate: string;
  status: 'pending' | 'completed' | 'cancelled';
  total: number;
}

export async function getOrders(): Promise<Order[]> {
  const response = await api.get<Order[]>('/bs_api/orders');
  return response.data;
} 