import GenreForm from '@/components/genre/GenreForm';
import { EmptyState } from '@/components/ui/EmptyState';
import { LoadingState } from '@/components/ui/LoadingState';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import Page from '@/layouts/Page';
import { qk } from '@/lib/query-keys';
import { addGenre, Genre, getGenres } from '@/modules/genre/service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export default function GenrePage() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: (body: Parameters<typeof addGenre>['0']) => {
      return addGenre(body);
    },
    onSuccess: (_resp) => {
      toast({
        title: 'Success',
        description: 'Genre added successfully',
      });
      queryClient.invalidateQueries({ queryKey: qk.genres() });
    },
    onError: (err) => {
      toast({
        title: 'Error Creating Genre',
        description: err.message,
      });
    },
  });

  const onSubmit = async (data: Parameters<typeof addGenre>['0']) => {
    await mutateAsync(data);
  };

  return (
    <Page title="Book Genre">
      <GenreForm onSubmit={onSubmit} />

      <div className="mt-10">
        <GenreTable />
      </div>
    </Page>
  );
}

function GenreTable() {
  const { data: genres = [], isLoading } = useQuery({
    queryKey: qk.genres(),
    queryFn: async () => {
      const genres = await getGenres();

      return genres;
    },
  });

  if (isLoading) {
    return <LoadingState />;
  }

  if (genres.length === 0) {
    return <EmptyState title="Genre is empty" message="Create a new genre." />;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead style={{ width: 50 }}>ID</TableHead>
          <TableHead>Name</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {genres.map((genre: Genre) => {
          return (
            <TableRow key={genre.id}>
              <TableCell>{genre.id}</TableCell>
              <TableCell>{genre.name}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
