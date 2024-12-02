import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { LoadingState } from '@/components/ui/LoadingState';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import Page from '@/layouts/Page';
import { Inventory } from '@/modules/inventory/service';
import { qk } from '@/lib/query-keys';
import { useQuery } from '@tanstack/react-query';

const InventoryPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: qk.inventories(),
    queryFn: () => {
      return fetch('/api/inventory/', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }).then((res) => res.json().then((data) => data?.data as Inventory[]));
    },
  });

  return (
    <Page title="Inventory">
      <StockDialog />
      {isLoading ? <LoadingState /> : <InventoryTable data={data || []} />}
    </Page>
  );
};

const InventoryTable = ({ data = [] }: { data: Inventory[] }) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Book Title</TableHead>
            <TableHead>Quantity on Hand</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((inventory) => {
            return (
              <TableRow key={inventory.id}>
                <TableCell>{inventory.id}</TableCell>
                <TableCell>{inventory.book.title}</TableCell>
                <TableCell>{inventory.quantity_on_hand}</TableCell>
                <TableCell>{inventory.action}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

const StockDialog = () => {
  // shadcn dialog to update stock
  return (
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default InventoryPage;
