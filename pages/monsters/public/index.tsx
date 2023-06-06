import Head from 'next/head'
import Layout from '@/components/layout'
import { useState } from 'react'
import { Database } from '@/lib/database.types'
import Container from '@/components/container'
import List from '@/components/lists'
import LayoutCharacter from '@/components/layout/character'
import HeadContent from '@/components/head'
import { GetServerSideProps } from 'next/types'
import { supabase } from '@/lib/supabaseClient';

const fetcher = async (url: string) => {
  console.log('fetcher', url)
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Request failed');
    }
    return response.json();
  } catch (error) {
    console.error('Error in fetcher:', error);
    throw error;
  }
};

type Props = {
  data: Database['public']['Tables']['characters']['Row'][];
};

export default function MonstersPublic({ data }: Props) {
  const [characters, setCharacters] = useState<Database['public']['Tables']['characters']['Row'][]>(data)

  return (
    <>
      <Head>
        <HeadContent
          title={'Dungeons and Dragons 5e | Monsters on the Material Plane'}
          description={"Dungeon Master's public generated monsters for free use."}
        />
      </Head>
      <main>
        <Layout>
          <Container center={true}>
                {characters.length > 0 ? (
                  <Container padding='1rem' center={true} style={{maxWidth: '1200px', margin: 'auto', minHeight: 'calc(100vh - 15rem)'}}>
                    <List>
                      {characters.map((character) => (
                        <li key={character.id}>
                          <LayoutCharacter character={character} isAccordion={true}/>
                        </li>
                      ))}
                    </List>
                  </Container>
                ) : (
                  <Container>
                    <p>No monsters found, yet.</p>
                  </Container>
                )}
          </Container>
        </Layout>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  try {
    const { data: characters, error } = await supabase
      .from('characters')
      .select('*')
      .eq('public', true)
      .order('updated_at', { ascending: false });

    if (error || !characters) {
      return {
        notFound: true,
      };
    }

    const data = characters as Database['public']['Tables']['characters']['Row'][]

    return {
      props: {
        data
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}; 