import Head from 'next/head'
import Layout from '@/components/layout'
import Container from '@/components/container'
import HeadContent from '@/components/head'

export default function Home() {
  return (
    <>
      <Head>
        <HeadContent
          title={'Dungeons and Dragons 5e - Character Generator and Battle Map'}
          description={'Battle Map for use with Dungeons and Dragons 5e'}
        />
      </Head>
      <main>
        <Layout>
          <Container center={true} padding={'1rem'}>
            <h1>Welcome to Battle Map</h1>
            <p>A character generator and battle map for creating and running Dungeons and Dragons 5e encounters</p>
          </Container>
        </Layout>
      </main>
    </>
  )
}
