import { authorFormSchema, AuthorFormValues } from '@/modules/authors/service';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export const AuthorForm = ({
  onSubmit,
  defaultValues = { name: '' },
  className,
}: {
  onSubmit: (data: AuthorFormValues) => void;
  defaultValues?: AuthorFormValues;
  className?: string;
}) => {
  const {
    register,
    handleSubmit,
    formState: { isValid, isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(authorFormSchema),
    defaultValues,
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn('flex w-1/4 gap-2', className)}
    >
      <Input {...register('name')} placeholder="Insert new author..." />

      <Button disabled={isSubmitting || !isValid} type="submit">
        {isSubmitting ? <Loader2 className="animate-spin" /> : null}
        Submit
      </Button>
    </form>
  );
};
