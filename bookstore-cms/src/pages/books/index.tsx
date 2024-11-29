import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/ui/EmptyState'
import { LoadingState } from '@/components/ui/LoadingState'
import { Progress } from '@/components/ui/progress'
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import Page from '@/layouts/Page'
import { formatDate } from '@/utils/date'
import { qk } from '@/utils/query-keys'
import { useQuery } from '@tanstack/react-query'
import { EditIcon, Pencil } from 'lucide-react'
import Link from 'next/link'

export default function BooksPage() {
  const { isLoading, data } = useQuery({
    queryKey: qk.books(),
    queryFn: () =>
      fetch('/api/books/', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }).then((res) => res.json()),
  })

  return (
    <Page title="Books">
      <div className="flex justify-end my-5">
        <Link href="books/create">
          <Button>Create</Button>
        </Link>
      </div>

      {isLoading ? <LoadingState /> : <BooksTable data={data?.data || []} />}
    </Page>
  )
}

const BooksTable = ({
  data = [],
}: {
  data: Array<{
    id: number
    title: string
    author: string
    published_date: string
  }>
}) => {
  if (data.length === 0) {
    return (
      <EmptyState
        title="No books found"
        message="Create a new book to get started."
      />
    )
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>Book Title</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Published</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((book) => (
            <TableRow key={book.id}>
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
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
  )
}
