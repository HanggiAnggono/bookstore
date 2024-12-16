import { Toaster as Sonner } from '@/components/ui/sonner';
import { Toaster } from '@/components/ui/toaster';
import { MenuLayout } from '@/layouts/MenuLayout';
import { Provider } from '@/provider/Provider';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <div className="min-h-screen bg-background text-foreground">
        {/* @ts-expect-error Server Component */}
        {Component.getLayout ? (
          // @ts-expect-error Server Component
          Component.getLayout(<Component {...pageProps} />)
        ) : (
          <MenuLayout>
            <Component {...pageProps} />
          </MenuLayout>
        )}
        <Sonner />
        <Toaster />
      </div>
    </Provider>
  );
}
