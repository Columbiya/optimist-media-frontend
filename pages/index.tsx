import Head from 'next/head'
import type { NextPageWithLayout } from './_app'
import { ReactElement } from 'react'
import { MainLayout } from '@/layouts/MainLayout'
import { Heading } from '@chakra-ui/react'

const Home: NextPageWithLayout = () =>  {
  return (
    <>
      <Head>
        <title>Optimist Media</title>
        <meta name="description" content="Optimist media - это где ты найдешь все самые свежие новости в области IT" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Heading>Optimist Media</Heading>
      </main>
    </>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      {page}
    </MainLayout>
  )
}

export default Home
