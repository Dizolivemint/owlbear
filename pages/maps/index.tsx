import { useUser, Session } from '@supabase/auth-helpers-react'
import Head from 'next/head'
import Layout from '@/components/layout'
import Container from '@/components/container'
import HeadContent from '@/components/head'

export default function Account({ session }: { session: Session }) {
  const user = useUser()

  if (!user) {
    return <div>Login first</div>
  }

  return (
    <>
    <Head>
      <HeadContent
          title={'Dungeons and Dragons 5e - Character Generator and Battle Map'}
          description={'Battle Map for use with Dungeons and Dragons 5e'}
        />
    </Head>
    <Layout>
      <Container center={true}>
        <h1>Maps</h1>
        <h2>Coming soon!</h2>
      </Container>
    </Layout>
  </>
  )
}