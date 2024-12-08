import { useForm } from 'react-hook-form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Form } from '../ui/form';
import { Loader2 } from 'lucide-react';

type Props = {
  onSubmit: (data: any) => void;
};

export default function GenreForm(props: Props) {
  const form = useForm();

  const { onSubmit } = props;
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-3 w-[30rem]">
          <Input placeholder="Science Fiction..." {...form.register('name')} />

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="animate-spin" /> : null}
            Create Genre
          </Button>
        </div>
      </form>
    </Form>
  );
}
