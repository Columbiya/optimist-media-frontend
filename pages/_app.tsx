import '@/styles/globals.css'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { ReactElement, ReactNode, useEffect } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '@/utils/theme'
import { useAuthStore } from '@/store/authStore'
import NextProgress from 'next-progress'

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)
  const { check } = useAuthStore()

  useEffect(() => {
    check()
  }, [])

  return (
    <ChakraProvider theme={theme}>
      <NextProgress delay={100} options={{ showSpinner: false }} />
      {getLayout(<Component {...pageProps} />)}
    </ChakraProvider>
  )
}

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}