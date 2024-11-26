import { Toaster as Sonner } from '@/components/ui/sonner'
import { Toaster } from '@/components/ui/toaster'
import { MenuLayout } from '@/layouts/MenuLayout'
import { Provider } from '@/provider/Provider'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  const Comp = (
    <Provider>
      <Component {...pageProps} />
      <Sonner />
      <Toaster />
    </Provider>
  )

  if (Component.getLayout) {
    return Component.getLayout(Comp)
  }

  return <MenuLayout>{Comp}</MenuLayout>
}
