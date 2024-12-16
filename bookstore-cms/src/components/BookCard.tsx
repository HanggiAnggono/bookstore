import { Book } from '@/modules/books/service';
import { formatDate } from '@/lib/date';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { EditIcon, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { formatCurrency } from '@/lib/utils';

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-shadow duration-200">
      <div className="flex">
        {/* Left side - Book cover */}
        <div className="w-[180px] h-[220px] bg-muted flex flex-col items-center justify-center gap-2 shrink-0">
          <BookOpen className="w-12 h-12 text-muted-foreground/50" />
          <span className="text-sm text-muted-foreground/70 px-4 text-center line-clamp-2">
            {book.title}
          </span>
        </div>

        {/* Right side - Book details */}
        <CardContent className="flex-1 p-6">
          <div className="relative">
            <Link
              href={`/books/${book.id}/edit-book`}
              className="absolute -top-2 right-0 p-2 bg-background/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              <EditIcon className="w-4 h-4" />
            </Link>

            <h3 className="font-semibold text-xl mb-1" title={book.title}>
              {book.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              by {book.author?.name}
            </p>

            <div className="space-y-4">
              <div className="flex gap-1 flex-wrap">
                {book.genres?.map((genre) => (
                  <Badge key={genre.id} variant="secondary" className="text-xs">
                    {genre.name}
                  </Badge>
                ))}
              </div>

              <div className="flex justify-between text-sm text-muted-foreground pt-2 border-t">
                <span>{formatDate(book.published_date)}</span>
                <span>{formatCurrency(book.default_price)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
