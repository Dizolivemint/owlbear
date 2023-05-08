import Head from 'next/head';
import Layout from '@/components/layout';
import { useSession } from '@supabase/auth-helpers-react'

export default function About() {
  const session = useSession()
  const navList = [
    { name: "Home", href: "/" },
  ];
  if (session) {
    navList.push({ name: "Practice", href: "/practice" });
  } else {
    navList.push({ name: "Login", href: "/login" });
  }
  return (
    <>
      <Head>
        <title>About</title>
        <meta name="description" content="About page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Layout navList={navList}>
          <h1>About Herblingo</h1>
          <p>Herblingo is an application for training users on memorizing Chinese Herbs using spaced repetition and gamification.</p>
          <h2>Spaced Repetition</h2>
          <p>Spaced repetition is a learning technique that involves reviewing information at increasingly longer intervals of time. The idea behind spaced repetition is that by spacing out your reviews, you can retain information more effectively over the long term. Herblingo uses spaced repetition to help users memorize the properties and uses of Chinese Herbs.</p>
          <h2>Gamification</h2>
          <p>Gamification is the process of adding game-like elements to non-game contexts. The goal of gamification is to make learning more engaging and enjoyable by incorporating elements such as points, badges, and leaderboards. Herblingo uses gamification to motivate users to continue practicing and learning Chinese Herbs.</p>
        </Layout>
      </main>
    </>
  );
}
