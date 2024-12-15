import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Page from '@/layouts/Page';
import { createOrder, orderFormSchema } from '@/modules/order/service';
import { useToast } from '@/hooks/use-toast';
import { RemoteSelect } from '@/components/ui/form/RemoteSelect';
import { getBooks } from '@/modules/books/service';
import { toLabelValues } from '@/lib/utils';
import { getUsers } from '@/modules/user/service';

type OrderFormValues = z.infer<typeof orderFormSchema>;

export default function CreateOrderPage() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      userId: '',
      quantity: 1,
    },
  });

  const createOrderMutation = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Order created successfully',
      });
      router.push('/order');
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to create order',
      });
    },
  });

  const onSubmit = (data: OrderFormValues) => {
    createOrderMutation.mutate(data);
  };

  return (
    <Page title="Create Order">
      <div className="max-w-2xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <RemoteSelect
              control={form.control}
              name="userId"
              label="User"
              placeholder="Select a Customer"
              setValue={form.setValue}
              fetcher={async () => {
                const resp = await getUsers();
                const users = resp.data?.users;
                console.log({ users });
                return toLabelValues(users, 'id', 'email');
              }}
            />

            <RemoteSelect
              control={form.control}
              name="bookId"
              label="Book"
              placeholder="Select a book"
              setValue={form.setValue}
              fetcher={async () => {
                const books = await getBooks();
                return toLabelValues(books, 'id', 'title');
              }}
            />

            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input type="number" min={1} placeholder="1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" isLoading={createOrderMutation.isPending}>
              {createOrderMutation.isPending ? 'Creating...' : 'Create Order'}
            </Button>
          </form>
        </Form>
      </div>
    </Page>
  );
}
