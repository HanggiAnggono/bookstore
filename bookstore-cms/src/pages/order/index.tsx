import { useQuery } from '@tanstack/react-query';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Page from '@/layouts/Page';
import { getOrders } from '@/modules/order/service';
import { LoadingState } from '@/components/ui/LoadingState';
import { formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function OrderListPage() {
  const { data: orders, isLoading, error } = useQuery({
    queryKey: ['orders'],
    queryFn: getOrders,
  });

  if (isLoading) {
    return (
      <Page title="Orders">
        <LoadingState />
      </Page>
    );
  }

  if (error) {
    return (
      <Page title="Orders">
        <div className="text-red-500">Error loading orders</div>
      </Page>
    );
  }

  return (
    <Page title="Orders">
      <div className="mb-6 flex justify-end">
        <Link href="/order/create">
          <Button>Create Order</Button>
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Order Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders?.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.customerName}</TableCell>
              <TableCell>{formatDate(order.orderDate)}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>${order.total.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Page>
  );
}
