import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { bookFormSchema } from '@/modules/books/service';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { DefaultValues, FieldErrors, useForm } from 'react-hook-form';
import { z } from 'zod';
import { MultiSelect } from '../ui/MultiSelect';
import { useQuery } from '@tanstack/react-query';
import { qk } from '@/lib/query-keys';
import { getGenres } from '@/modules/genre/service';
import { toLabelValues } from '@/lib/utils';
import Link from 'next/link';
import { getAuthors } from '@/modules/authors/service';
import { RemoteSelect } from '../ui/form/RemoteSelect';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';

export type BookFormData = z.infer<typeof bookFormSchema>;

type Props = {
  onSubmit: (data: BookFormData) => void;
  defaultValues?: DefaultValues<BookFormData>;
  errors?: FieldErrors<BookFormData>;
};

export default function BookForm(props: Props) {
  const form = useForm<BookFormData>({
    resolver: zodResolver(bookFormSchema),
    defaultValues: props.defaultValues,
    errors: props.errors,
  });

  const { handleSubmit, register, formState, watch, setValue } = form;

  const { data: genres = [], isLoading: isGenresLoading } = useQuery({
    queryKey: qk.genres(),
    queryFn: async () => {
      const genres = await getGenres();
      return genres;
    },
  });

  const { isLoading, isSubmitting } = formState;

  const onSubmit = handleSubmit(async (d) => {
    await props.onSubmit(d);
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="flex flex-col gap-2">
        <FormField
          name="title"
          render={() => {
            return (
              <FormItem>
                <FormLabel htmlFor="title">Title</FormLabel>
                <FormMessage className="inline ml-3" />
                <Input
                  type="text"
                  {...register('title')}
                  disabled={isLoading}
                />
              </FormItem>
            );
          }}
        />

        <RemoteSelect
          control={form.control}
          name="author"
          fetcher={async () => await getAuthors().then(toLabelValues)}
          label="Author"
          setValue={form.setValue}
        />

        <FormField
          control={form.control}
          name="genres"
          render={() => {
            return (
              <FormItem>
                <FormLabel htmlFor="genres">Genres</FormLabel>
                <Link href="/genre" className="inline ml-2 text-blue-500">
                  Create Genres
                </Link>
                <FormMessage className="inline ml-3" />
                <MultiSelect
                  options={toLabelValues(genres, 'id', 'name')}
                  value={watch('genres') || []}
                  onChange={(value) => {
                    setValue('genres', value);
                  }}
                  isLoading={isGenresLoading}
                />
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name="published_date"
          render={() => {
            return (
              <FormItem>
                <FormLabel htmlFor="published_date">Published</FormLabel>
                <FormMessage className="inline ml-3" />
                <Input
                  type="date"
                  {...register('published_date')}
                  disabled={isLoading}
                />
              </FormItem>
            );
          }}
        />

        <Button type="submit" disabled={isSubmitting || isLoading}>
          {isSubmitting || isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : null}
          {props.defaultValues ? 'Update Book' : 'Create Book'}
        </Button>
      </form>
    </Form>
  );
}
