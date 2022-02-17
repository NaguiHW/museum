import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Head from 'next/head';
import Navbar from '../component/Navbar'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>My Museum</title>
        <meta name="description" content="My Museum - App test" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
