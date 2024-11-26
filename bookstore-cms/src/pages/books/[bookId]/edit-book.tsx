import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Page from '@/layouts/Page'
import { Loader2 } from 'lucide-react'
import { BookFormData, bookFormSchema } from '../create'
import { useToast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { qk } from '@/lib/query-keys'

export default function EditBookPage() {
  const { toast, dismiss } = useToast()
  const { handleSubmit, register, formState } = useForm<BookFormData>({
    resolver: zodResolver(bookFormSchema),
  })
  const { bookId } = useParams() || {}

  const { data, isLoading } = useQuery({
    queryKey: qk.book(bookId as string),
    queryFn: () =>
      fetch(`/api/books/${bookId}`, { method: 'GET' }).then((res) =>
        res.json()
      ),
    enabled: !!bookId,
  })

  console.log({ data, isLoading })

  const { mutate, isPending } = useMutation({
    mutationFn: (body: BookFormData) => {
      return fetch(`/api/books/${bookId}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        credentials: 'include',
      }).then((res) => res.json())
    },
    onSuccess: (resp) => {
      dismiss('creating')
      toast({ title: 'Book created!', duration: 10000 })
    },
    onError: (err) => {
      dismiss('creating')
      toast({
        title: 'Error creating book',
        description: `${err.message}`,
        duration: 10000,
      })
    },
  })

  const onSubmit = handleSubmit((data: BookFormData) => {
    toast({ itemID: 'creating', title: 'Creating book...', duration: Infinity })
    mutate(data)
  })

  return (
    <Page title="Edit Book">
      <div className="w-2/3 mx-auto">
        <Image
          width={400}
          height={400}
          alt="New book"
          className="rounded-xl mx-auto mb-10"
          src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/c424bbb0-a0e6-4a95-b422-56f707c6e172/dg7fmbl-f4907e8c-3e08-4dae-b63a-d1f6c4a77c7e.jpg/v1/fill/w_1024,h_683,q_75,strp/stack_of_books_illustration_by_gabimedia_dg7fmbl-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2M0MjRiYmIwLWEwZTYtNGE5NS1iNDIyLTU2ZjcwN2M2ZTE3MlwvZGc3Zm1ibC1mNDkwN2U4Yy0zZTA4LTRkYWUtYjYzYS1kMWY2YzRhNzdjN2UuanBnIiwiaGVpZ2h0IjoiPD02ODMiLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS53YXRlcm1hcmsiXSwid21rIjp7InBhdGgiOiJcL3dtXC9jNDI0YmJiMC1hMGU2LTRhOTUtYjQyMi01NmY3MDdjNmUxNzJcL2dhYmltZWRpYS00LnBuZyIsIm9wYWNpdHkiOjk1LCJwcm9wb3J0aW9ucyI6MC40NSwiZ3Jhdml0eSI6ImNlbnRlciJ9fQ.e7q_NMROCGyu_BVkSeiHbvPlXF9XNWu_fm-uSdXNvsY"
        />
        <p className="mb-5">
          We believe that every great story deserves to be shared with the
          world. Whether you&apos;re an aspiring author, a seasoned writer, or a
          publisher looking to expand your catalog, our platform is designed to
          make the process of creating and listing your book as seamless and
          enjoyable as possible.
        </p>

        <form onSubmit={onSubmit} className="flex flex-col gap-2">
          <div>
            <label htmlFor="title">Title</label>
            <Input type="text" {...register('title')} />
            {formState.errors.title && (
              <p className="text-destructive">
                {formState.errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="author">Author</label>
            <Input type="text" {...register('author')} />
            {formState.errors.author && (
              <p className="text-destructive">
                {formState.errors.author.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="published_date">Published</label>
            <Input type="date" {...register('published_date')} />
            {formState.errors.published_date && (
              <p className="text-destructive">
                {formState.errors.published_date.message}
              </p>
            )}
          </div>

          <Button type="submit" disabled={isPending}>
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Create Book
          </Button>
        </form>
      </div>
    </Page>
  )
}
