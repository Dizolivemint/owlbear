import Head from 'next/head'
import Layout from '@/components/layout'
import Container from '@/components/container'
import HeadContent from '@/components/head'
import Image from 'next/image'

export default function Custom404() {
  return (
    <>
    <Head>
      <HeadContent
          title={'404'}
          description={'Owlbears are out hunting for this page'}
        />
    </Head>
    <Layout>
      <Container center={true}>
        <h1>You generated a 404 bear</h1>
      </Container>
      <Container center={true}>
        <Image
          src="/public/404bear.jpg"
          alt="404 Owlbear"
          width={512}
          height={512}
        />
      </Container>
    </Layout>
  </>
  )
}