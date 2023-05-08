import Head from 'next/head'
import { Inter } from 'next/font/google'
import Layout from '@/components/layout'
import { useSession } from '@supabase/auth-helpers-react'

export default function Home() {
  const session = useSession()
  const navList = []
  if (!session) {
    navList.push({ name: "Login", href: "/login" })
  } else {
    navList.push({ name: "Characters", href: "/characters" })
    navList.push({ name: "Sessions", href: "/sesssions" })
    navList.push({ name: "Profile", href: "/profile" })
    navList.push({ name: "Logout", href: "signout" })
  }
  return (
    <>
      <Head>
        <title>Battle Map</title>
        <meta name="description" content="Battle Map for use with Dungeons and Dragons 5e" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Layout navList={navList}>
          <div>
            <h1>Welcome to Battle Map</h1>
            <p>A battle map for Dungeons and Dragons 5e</p>
          </div>
        </Layout>
      </main>
    </>
  )
}
