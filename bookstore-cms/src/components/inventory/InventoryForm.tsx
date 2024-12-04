import { useForm } from 'react-hook-form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Form, FormControl, FormItem, FormLabel } from '../ui/form';
import { FormSelect } from '../ui/SelectOptions';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { qk } from '@/lib/query-keys';
import { getBooks } from '@/modules/books/service';
import { Input } from '../ui/input';
import { addInventory } from '@/modules/inventory/service';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

const inventoryFormSchema = z.object({
  book_id: z.string().min(1, { message: 'Required' }),
  quantity: z.coerce.number().min(1, { message: 'Required' }),
  action: z.enum(['add', 'remove']),
});

export const InventoryDialog = () => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof inventoryFormSchema>>({
    resolver: zodResolver(inventoryFormSchema),
    defaultValues: {
      book_id: '',
      quantity: 0,
      action: 'remove',
    },
  });

  const { data } = useQuery({
    queryKey: qk.books(),
    queryFn: async () => {
      const books = await getBooks();
      return books;
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (body: z.infer<typeof inventoryFormSchema>) => {
      const { book_id, quantity, action } = body;
      return addInventory(book_id, { quantity, action });
    },
    onSuccess: () => {
      form.reset();
      queryClient.invalidateQueries({ queryKey: qk.inventories() });
      toast({
        title: 'Success',
        description: 'Inventory updated successfully',
      });
      setOpen(false);
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message,
        duration: 10000,
      });
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    mutate(data);
  });

  const bookOptions = (data || []).map((book) => ({
    value: book.id.toString(),
    label: book.title,
  }));

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="flex justify-end mb-6">
        <DialogTrigger asChild>
          <Button className="ml-auto">Update Inventory</Button>
        </DialogTrigger>
      </div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Inventory</DialogTitle>
          <DialogDescription>
            Update the inventory of a book, this will update the quantity on
            hand
          </DialogDescription>

          <Form {...form}>
            <form onSubmit={onSubmit}>
              <div className="grid gap-4 py-4">
                <FormSelect
                  control={form.control}
                  label="Book"
                  description="Select the book you want to update"
                  options={bookOptions}
                />

                <div className="flex space-x-8">
                  {['add', 'remove'].map((action) => {
                    return (
                      <div key={action}>
                        <input
                          id={action}
                          type="radio"
                          value={action}
                          {...form.register('action')}
                        />
                        <label htmlFor={action} className="ml-2">
                          {action}
                        </label>
                      </div>
                    );
                  })}
                </div>

                <FormItem>
                  <FormLabel>Quantity to {form.watch('action')}</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Quantity"
                      {...form.register('quantity')}
                    />
                  </FormControl>
                </FormItem>

                <Button
                  type="submit"
                  className="ml-auto"
                  disabled={isPending || !form.formState.isValid}
                >
                  {isPending && <Loader2 className="mr-2 animate-spin" />}
                  Update Inventory
                </Button>
              </div>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
