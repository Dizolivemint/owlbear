import Head from 'next/head'
import Layout from '@/components/layout'
import Container from '@/components/container'
import HeadContent from '@/components/head'

export default function Home() {
  return (
    <>
      <Head>
        <HeadContent
          title={'AI Monster Generator'}
          description={'Quickly generate completely unique monsters for you game or campaign.'}
        />
      </Head>
      <main>
        <Layout>
          <Container center={true} padding={'1rem'}>
            <h1>Welcome to Owlbear Online</h1>
            <p>A Monster/NPC generator.</p>
          </Container>
        </Layout>
      </main>
    </>
  )
}
