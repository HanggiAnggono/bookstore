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

export type BookFormData = z.infer<typeof bookFormSchema> & {
  genres: Array<{ value: string; label: string }>;
};

type Props = {
  onSubmit: (data: BookFormData) => void;
  defaultValues?: DefaultValues<BookFormData>;
};

export default function BookForm(props: Props) {
  const { handleSubmit, register, formState, watch, setValue } =
    useForm<BookFormData>({
      resolver: zodResolver(bookFormSchema),
      defaultValues: props.defaultValues,
    });

  const { data: genres, isLoading: isGenresLoading } = useQuery({
    queryKey: qk.genres(),
    queryFn: async () => {
      const genres = await getGenres();
      return genres;
    },
  });

  const { isLoading, isSubmitting } = formState;

  const onSubmit = handleSubmit(props.onSubmit);

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
        <div className="inline ml-2">Create New</div>
        <MultiSelect
          options={[]}
          value={watch('genres')}
          onChange={(value) => {
            setValue('genres', value);
          }}
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
