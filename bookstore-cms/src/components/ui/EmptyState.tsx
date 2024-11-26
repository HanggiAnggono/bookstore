import Image from 'next/image'

export const EmptyState = ({ title, message }) => {
  return (
    <div className="my-5 flex flex-col items-center">
      <p className="text-center text-lg">{title}</p>
      <p className="text-center text-neutral-600">{message}</p>
      <Image
        width={400}
        height={400}
        alt="No books found"
        src="https://component.gallery/static/8d36eaa25b6dcb026685101ebc379022/Empty%20state%20icon..svg"
      />
    </div>
  )
}
