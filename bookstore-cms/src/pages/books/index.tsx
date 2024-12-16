import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/EmptyState';
import { LoadingState } from '@/components/ui/LoadingState';
import Page from '@/layouts/Page';
import { qk } from '@/lib/query-keys';
import { Book, getBooks } from '@/modules/books/service';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { BookCard } from '@/components/BookCard';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { formatDate } from '@/lib/utils';
import { EditIcon, LayoutGrid, List } from 'lucide-react';
import { useState } from 'react';

type ViewMode = 'grid' | 'list';

export default function BooksPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const { isLoading, data: books } = useQuery({
    queryKey: qk.books(),
    queryFn: () => {
      return getBooks();
    },
  });

  return (
    <Page title="Books">
      <div className="flex justify-between items-center my-5">
        <div className="flex gap-1 border rounded-md">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="icon"
            onClick={() => setViewMode('grid')}
            className="rounded-none"
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="icon"
            onClick={() => setViewMode('list')}
            className="rounded-none"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>

        <Link href="books/create">
          <Button>Create</Button>
        </Link>
      </div>

      {isLoading ? (
        <LoadingState />
      ) : viewMode === 'grid' ? (
        <BooksGrid data={books || []} />
      ) : (
        <BooksTable data={books || []} />
      )}
    </Page>
  );
}

const BooksGrid = ({ data = [] }: { data: Array<Book> }) => {
  if (data.length === 0) {
    return (
      <EmptyState
        title="No books found"
        message="Create a new book to get started."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {data.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
};

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
              <TableCell>{book.author?.name}</TableCell>
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
