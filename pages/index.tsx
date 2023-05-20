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
            <h1>Owlbear Online</h1>
            <p>a monster/npc generator</p>
            <Container padding={'2rem'}>
              <h2>Instructions</h2>
              <h3>Step 1 - Log in</h3>
              <ol style={{marginLeft: '4rem'}}>
                <li>Go to the login page using the navigation</li>
                <li>Fill in your email and send yourself a magic link.</li>
                <li>That link should show up in your email (if not, check your spam or retry).</li>
                <li>When you select the "send magic link" button, it should open a new tab in your browser.</li> 
                <li>The old tab will still be open, which is kind of annoying, but I'm working on it.</li>
              </ol>
              <h3>Step 2 - Create your Monsters</h3>
              <ol style={{marginLeft: '4rem'}}>
                <li>Go to Monsters in the navigation</li>
                <li>Otherwise, go to the Create tab</li>
                <li>Pick a size, type in a species or whatever you want (it gets funny when you get wacky, but it may not work if you get perverted)</li>
                <li>Finally, pick a CR and select Is Legendary if you want legendary actions</li>
                <li>Select the "Create Monster" button and wait about 30 seconds</li>
              </ol>
              <h3>Step 3 - View your Monsters</h3>
              <ol style={{marginLeft: '4rem'}}>
                <li>Go back to the Monsters tab to see your monsters (I know the UX sUX).</li>
                <li>Select the monster you want to see.</li>
                <li>Eventually, you will be able to edit it and add HP and movement speed.</li>
              </ol>
            </Container>
          </Container>
        </Layout>
      </main>
    </>
  )
}
