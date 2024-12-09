import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { bookFormSchema } from '@/modules/books/service';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { DefaultValues, useForm } from 'react-hook-form';
import { z } from 'zod';
import { MultiSelect } from '../ui/MultiSelect';
import { useQuery } from '@tanstack/react-query';
import { qk } from '@/lib/query-keys';
import { getGenres } from '@/modules/genre/service';
import { toLabelValues } from '@/lib/utils';
import Link from 'next/link';

export type BookFormData = z.infer<typeof bookFormSchema>;

type Props = {
  onSubmit: (data: BookFormData) => void;
  defaultValues?: DefaultValues<BookFormData>;
};

export default function BookForm(props: Props) {
  const form = useForm<BookFormData>({
    resolver: zodResolver(bookFormSchema),
    defaultValues: props.defaultValues,
  });

  const { handleSubmit, register, formState, watch, setValue } = form;

  const { data: genres = [], isLoading: isGenresLoading } = useQuery({
    queryKey: qk.genres(),
    queryFn: async () => {
      const genres = await getGenres();
      return genres;
    },
  });

  const { isLoading, isSubmitting, isValid, errors } = formState;

  const onSubmit = handleSubmit((d) => {
    props.onSubmit(d);
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-2">
      <div>
        <label htmlFor="title">Title</label>
        <Input type="text" {...register('title')} disabled={isLoading} />
        {formState.errors.title && (
          <p className="text-destructive">{formState.errors.title.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="author">Author</label>
        <Input type="text" {...register('author')} disabled={isLoading} />
        {formState.errors.author && (
          <p className="text-destructive">{formState.errors.author.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="genres">Genres</label>
        <Link href="/genre" className="inline ml-2 text-blue-500">
          Create Genres
        </Link>
        <MultiSelect
          options={toLabelValues(genres, 'id', 'name')}
          value={watch('genres')}
          onChange={(value) => {
            setValue('genres', value);
          }}
          isLoading={isGenresLoading}
        />
      </div>

      <div>
        <label htmlFor="published_date">Published</label>
        <Input
          type="date"
          {...register('published_date')}
          disabled={isLoading}
        />
        {formState.errors.published_date && (
          <p className="text-destructive">
            {formState.errors.published_date.message}
          </p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting || isLoading}>
        {isSubmitting || isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : null}
        {props.defaultValues ? 'Update Book' : 'Create Book'}
      </Button>
    </form>
  );
}
