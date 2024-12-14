import { useAuthProtection } from '@/hooks/useAuthProtection';
import { cn } from '@/lib/utils';
import Head from 'next/head';
import { PropsWithChildren } from 'react';

export default function Page({
  children,
  title,
  disableAuthProtection = false,
  className,
}: PropsWithChildren<{
  title?: string;
  disableAuthProtection?: boolean;
  className?: string;
}>) {
  useAuthProtection({ enabled: !disableAuthProtection });

  return (
    <div className={cn('page p-3', className)}>
      <Head key={title}>
        <title>{title ? `${title} | Bookstore CMS` : 'Bookstore CMS'}</title>
      </Head>
      {title ? <h1 className="text-xl mb-10">{title}</h1> : null}
      {children}
    </div>
  );
}
