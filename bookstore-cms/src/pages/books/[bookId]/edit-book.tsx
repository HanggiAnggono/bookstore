import Page from '@/layouts/Page';
import { useToast } from '@/hooks/use-toast';
import { useMutation, useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { qk } from '@/lib/query-keys';
import { getBook, updateBook } from '@/modules/books/service';
import BookForm, { BookFormData } from '@/components/book/BookForm';
import { useRouter } from 'next/router';
import { LoadingState } from '@/components/ui/LoadingState';
import { AxiosError } from 'axios';

export default function EditBookPage() {
  const { toast, dismiss } = useToast();
  const router = useRouter();
  const { bookId = '' } = router.query;

  const {
    data: book,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: qk.book(bookId as string),
    queryFn: () => getBook(bookId as string),
    enabled: !!bookId,
  });

  const { mutateAsync, error } = useMutation({
    mutationFn: (body: BookFormData) => {
      return updateBook(bookId as string, body);
    },
  });

  const onSubmit = async (data: BookFormData) => {
    toast({
      itemID: 'updating',
      title: 'Updating book...',
      duration: Infinity,
    });
    await mutateAsync(data)
      .then(() => {
        dismiss('updating');
        toast({ title: 'Book updated!', duration: 10000 });
        router.push('/books');
        refetch();
      })
      .catch((err) => {
        dismiss('updating');

        toast({
          title: 'Error updating book',
          description: `${err.message}`,
          duration: 10000,
        });
      });
  };

  const defaultValues: BookFormData = {
    author: book?.author
      ? { label: book.author.name, value: book.author.id }
      : null,
    published_date: book?.published_date || '',
    default_price: book?.default_price || 0,
    title: book?.title || '',
    genres: book?.genres?.map((g) => ({ label: g.name, value: g.id })) || [],
  };

  const errors = (error as AxiosError)?.response?.data?.errors?.reduce(
    (acc, field) => {
      console.log({ acc, field });
      return {
        ...acc,
        [field.path]: {
          message: field.msg,
        },
      };
    },
    {},
  );

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <Page title={book?.title}>
      <div className="w-2/3 mx-auto">
        <Image
          width={400}
          height={400}
          alt="New book"
          className="rounded-xl mx-auto mb-10"
          src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/c424bbb0-a0e6-4a95-b422-56f707c6e172/dg7fmbl-f4907e8c-3e08-4dae-b63a-d1f6c4a77c7e.jpg/v1/fill/w_1024,h_683,q_75,strp/stack_of_books_illustration_by_gabimedia_dg7fmbl-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2M0MjRiYmIwLWEwZTYtNGE5NS1iNDIyLTU2ZjcwN2M2ZTE3MlwvZGc3Zm1ibC1mNDkwN2U4Yy0zZTA4LTRkYWUtYjYzYS1kMWY2YzRhNzdjN2UuanBnIiwiaGVpZ2h0IjoiPD02ODMiLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS53YXRlcm1hcmsiXSwid21rIjp7InBhdGgiOiJcL3dtXC9jNDI0YmJiMC1hMGU2LTRhOTUtYjQyMi01NmY3MDdjNmUxNzJcL2dhYmltZWRpYS00LnBuZyIsIm9wYWNpdHkiOjk1LCJwcm9wb3J0aW9ucyI6MC40NSwiZ3Jhdml0eSI6ImNlbnRlciJ9fQ.e7q_NMROCGyu_BVkSeiHbvPlXF9XNWu_fm-uSdXNvsY"
        />
        <p className="mb-5">
          We believe that every great story deserves to be shared with the
          world. Whether you&apos;re an aspiring author, a seasoned writer, or a
          publisher looking to expand your catalog, our platform is designed to
          make the process of creating and listing your book as seamless and
          enjoyable as possible.
        </p>

        <BookForm
          onSubmit={onSubmit}
          defaultValues={defaultValues}
          errors={errors}
        />
      </div>
    </Page>
  );
}
