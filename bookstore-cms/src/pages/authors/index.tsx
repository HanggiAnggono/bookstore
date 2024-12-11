import { AuthorForm } from '@/components/author/AuthorForm';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DialogDeclarative, DialogFooter } from '@/components/ui/dialog';
import { EmptyState } from '@/components/ui/EmptyState';
import { LoadingState } from '@/components/ui/LoadingState';
import { useToast } from '@/hooks/use-toast';
import Page from '@/layouts/Page';
import { qk } from '@/lib/query-keys';
import { Infer } from '@/lib/utils';
import {
  AuthorFormValues,
  createAuthor,
  deleteAuthor,
  getAuthors,
  updateAuthor,
} from '@/modules/authors/service';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

type State =
  | {
      type: 'none';
      data: object;
    }
  | {
      type: 'edit';
      data: AuthorFormValues;
    }
  | {
      type: 'delete';
      data: AuthorFormValues;
    };

export default function AuthorsPage() {
  const toast = useToast();

  const {
    data: authors = [],
    isLoading,
    status,
    refetch,
  } = useQuery({
    queryKey: qk.authors(),
    queryFn: async () => {
      const authors = await getAuthors();
      return authors;
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: (body: AuthorFormValues) => {
      return createAuthor(body);
    },
    onSuccess: (resp) => {
      toast.toast({
        title: 'Success',
        description: 'Author created successfully',
      });
      refetch();
    },
    onError: (err) => {
      toast.toast({
        variant: 'destructive',
        title: 'Error',
        description: err.message,
      });
    },
  });

  const { mutateAsync: deleteAuthorAsync, isPending: isDeleting } = useMutation(
    {
      mutationFn: (id: string) => {
        return deleteAuthor(id);
      },
      onSuccess: () => {
        toast.toast({
          title: 'Deleted',
          description: 'Author has been deleted',
        });
        refetch();
        setState({ type: 'none', data: {} });
      },
      onError: (err) => {
        toast.toast({
          variant: 'destructive',
          title: 'Error',
          description: err.message,
        });
      },
    },
  );

  const { mutateAsync: editAuthorAsync } = useMutation({
    mutationFn: (body: AuthorFormValues) => {
      return updateAuthor(body.id!, body);
    },
    onSuccess: () => {
      toast.toast({
        title: 'Updated',
        description: 'Author has been updated',
      });
      refetch();
      setState({ type: 'none', data: {} });
    },
    onError: (err) => {
      toast.toast({
        variant: 'destructive',
        title: 'Error',
        description: err.message,
      });
    },
  });

  const [state, setState] = useState<State>({ type: 'none', data: {} });

  async function handleCreateAuthor(data: AuthorFormValues) {
    await mutateAsync(data);
  }

  function handleDeleteAuthor() {
    if (state.type === 'delete') {
      deleteAuthorAsync(state.data.id!);
    }
  }

  const handleEditAuthor: Infer<typeof AuthorForm>['onSubmit'] = async (
    values,
  ) => {
    if (state.type === 'edit') {
      await editAuthorAsync({
        id: state.data.id,
        ...values,
      });
    }
  };

  const isEmpty = authors.length === 0 && status !== 'pending';

  return (
    <Page title="Author">
      <AuthorForm onSubmit={handleCreateAuthor} />

      <div className="mt-10">
        {isLoading && <LoadingState />}
        {isEmpty && (
          <EmptyState
            title="No authors found"
            message="Create a new author to get started."
          />
        )}
        <div
          className="grid grid-cols-3 gap-4"
          style={{ visibility: isLoading ? 'hidden' : 'visible' }}
        >
          {authors.map((author) => {
            return (
              <div key={author.id} className="border-2 p-3 rounded-md">
                <div className="flex items-center gap-2">
                  <Avatar src="" name={author.name} />
                  <div className="flex flex-col">
                    <span className="text-lg font-bold">{author.name}</span>
                    <span className="text-sm text-muted-foreground">
                      Author
                    </span>
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-2">
                  <Button
                    variant="secondary"
                    onClick={() => setState({ data: author, type: 'edit' })}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => setState({ data: author, type: 'delete' })}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            );
          })}

          <DialogDeclarative
            open={state.type !== 'none'}
            onOpenChange={() => setState({ type: 'none', data: {} })}
            trigger={null}
            title={state.type === 'edit' ? 'Edit Author' : 'Delete Author'}
            description={
              state.type === 'delete' ? 'Are you sure you want to delete' : ''
            }
          >
            {state.type === 'delete' && (
              <DialogFooter>
                <Button
                  variant="destructive"
                  onClick={handleDeleteAuthor}
                  isLoading={isDeleting}
                >
                  Delete
                </Button>
                <Button variant="default">Cancel</Button>
              </DialogFooter>
            )}

            {state.type === 'edit' && (
              <AuthorForm
                defaultValues={state.data}
                onSubmit={handleEditAuthor}
                className="w-full"
              />
            )}
          </DialogDeclarative>
        </div>
      </div>
    </Page>
  );
}
