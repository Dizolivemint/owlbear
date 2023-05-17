import Head from 'next/head'
import Layout from '@/components/layout'


export default function Home() {
  return (
    <>
      <Head>
        <title>Battle Map</title>
        <meta name="description" content="Battle Map for use with Dungeons and Dragons 5e" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Layout>
          <div>
            <h1>Welcome to Battle Map</h1>
            <p>A battle map for Dungeons and Dragons 5e</p>
          </div>
        </Layout>
      </main>
    </>
  )
}
