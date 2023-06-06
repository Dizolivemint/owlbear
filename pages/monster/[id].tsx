

import { GetServerSideProps } from 'next';
import { supabase } from '@/lib/supabaseClient';
import { Database } from '@/lib/database.types'
import Container from '@/components/container';
import { parse } from 'url';
import Layout from '@/components/layout';
import LayoutCharacter from '@/components/layout/character'

type Props = {
  data: Database['public']['Tables']['characters']['Row'];
  domain: string;
};

const CharacterPage: React.FC<Props> = ({ data }) => {
  // Render the character data
  const character = data
  const domain = typeof window !== 'undefined' ? window.location.host : '';

  if (character?.character_data) {
    return (
      <Layout>
        <Container padding='1rem'>
          <LayoutCharacter character={character} />
        </Container>
      </Layout>
    );
  } else {
    return (
      <Layout>
        <Container>
          <h1>Character data is not formatted correctly</h1>
        </Container>
      </Layout>
    );
  }
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id;

  const { host } = context.req.headers;
  const parsedUrl = parse(`https://${host}`);
  if (!parsedUrl.host) throw new Error('Host is undefined')
  const domain = parsedUrl.host.replace(/\/$/, '');


  try {
    const { data, error } = await supabase
      .from('characters')
      .select('*')
      .eq('public', true)
      .eq('id', id)
      .single();

    if (error || !data) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        data,
        domain
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default CharacterPage;