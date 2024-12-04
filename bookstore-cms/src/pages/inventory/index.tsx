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
import { getInventories, Inventory } from '@/modules/inventory/service';
import { qk } from '@/lib/query-keys';
import { useQuery } from '@tanstack/react-query';
import { InventoryDialog } from '@/components/inventory/InventoryForm';
import { EmptyState } from '@/components/ui/EmptyState';

const InventoryPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: qk.inventories(),
    queryFn: () => getInventories(),
  });

  return (
    <Page title="Inventory">
      <InventoryDialog />
      {isLoading ? <LoadingState /> : <InventoryTable data={data || []} />}
    </Page>
  );
};

const InventoryTable = ({ data = [] }: { data: Inventory[] }) => {
  if (data.length === 0) {
    return (
      <EmptyState
        title="Inventory is empty"
        message="Create a new record to update inventory."
      />
    );
  }
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Book Title</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((inventory) => {
            return (
              <TableRow key={inventory.id}>
                <TableCell>{inventory.id}</TableCell>
                <TableCell>{inventory.book?.title}</TableCell>
                <TableCell>{inventory.quantity}</TableCell>
                <TableCell>{inventory.action}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default InventoryPage;
