import Head from 'next/head'
import Layout from '@/components/layout'
import Container from '@/components/container'
import HeadContent from '@/components/head'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  const height = 768
  const width = 512
  return (
    <>
      <Head>
        <HeadContent
          title={'Dungeons and Dragons 5e | Astral Plane | Home'}
          description={"Dungeon Master's Astral portal navigation system."}
        />
      </Head>
      <main>
        <Layout>
          <Link href='/monsters/public'>
            <Container center={true} style={{position: 'relative', height}}>
              <Image 
                src='/public/owlbear-home.png' 
                alt='Owlbear home'
                width={width}
                height={height}
                style={{objectFit: 'cover', objectPosition: 'center', zIndex: '1', position: 'absolute'}}

              />
              <Container center={true} padding={'1rem'} style={{zIndex: '2', filter: 'drop-shadow(2px 2px 4px black)', background: '#00000026', borderRadius: '50px'}}>
                <h1>Owlbear Online</h1>
              </Container>
            </Container>
          </Link>
        </Layout>
      </main>
    </>
  )
}
