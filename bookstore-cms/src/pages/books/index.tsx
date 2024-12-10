import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/EmptyState';
import { LoadingState } from '@/components/ui/LoadingState';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Page from '@/layouts/Page';
import { formatDate } from '@/lib/date';
import { qk } from '@/lib/query-keys';
import { Book, getBooks } from '@/modules/books/service';
import { useQuery } from '@tanstack/react-query';
import { EditIcon, Pencil } from 'lucide-react';
import Link from 'next/link';

export default function BooksPage() {
  const { isLoading, data: books } = useQuery({
    queryKey: qk.books(),
    queryFn: () => {
      return getBooks();
    },
  });

  return (
    <Page title="Books">
      <div className="flex justify-end my-5">
        <Link href="books/create">
          <Button>Create</Button>
        </Link>
      </div>

      {isLoading ? <LoadingState /> : <BooksTable data={books || []} />}
    </Page>
  );
}

const BooksTable = ({ data = [] }: { data: Array<Book> }) => {
  if (data.length === 0) {
    return (
      <EmptyState
        title="No books found"
        message="Create a new book to get started."
      />
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Book Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Genre</TableHead>
            <TableHead>Published</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((book) => (
            <TableRow key={book.id}>
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>
                {book.genres?.map((genre) => genre.name).join(', ')}
              </TableCell>
              <TableCell>{formatDate(book.published_date)}</TableCell>
              <TableCell>
                <Link href={`/books/${book.id}/edit-book`}>
                  <EditIcon />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
