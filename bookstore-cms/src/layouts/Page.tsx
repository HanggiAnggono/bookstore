import { PropsWithChildren } from 'react'

export default function Page({
  children,
  title,
}: PropsWithChildren<{ title?: string }>) {
  return (
    <div className="page p-3">
      {title ? <h1 className="text-xl mb-10">{title}</h1> : null}
      {children}
    </div>
  )
}
