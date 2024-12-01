import Head from "next/head"
import { PropsWithChildren } from 'react'

export default function Page({
  children,
  title,
}: PropsWithChildren<{ title?: string }>) {
  return (
    <div className="page p-3">
      <Head key={title}>
        <title>{title ? `${title} | Bookstore CMS` : 'Bookstore CMS'}</title>
      </Head>
      {title ? <h1 className="text-xl mb-10">{title}</h1> : null}
      {children}
    </div>
  )
}
