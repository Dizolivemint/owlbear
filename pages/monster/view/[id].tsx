import { useRouter } from 'next/router';
import { Database } from '@/lib/database.types'
import { useEffect, useState } from 'react';
import Loader from '@/components/loader';
import Layout from '@/components/layout';
import LayoutCharacter from '@/components/layout/character';
import HeadContent from '@/components/head';

const characterPlaceholder: Database['public']['Tables']['characters']['Row'] = {
  id: -1,
  user_id: '',
  character_data: {
    name: '',
    background: '',
    appearance: '',
    size: '',
    species: '',
    challenge_rating: '',
    attributes: {
      STR: 0,
      DEX: 0,
      CON: 0,
      INT: 0,
      WIS: 0,
      CHA: 0,
    },
    skills: [
      {
        skill: '',
        description: '',
      },
    ],
    actions: [
      {
        action: '',
        description: '',
      },
    ],
  },
  image_filename: 'https://picsum.photos/512/512',
  created_at: '2023-05-18 02:29:32.134629+00',
  updated_at: '2023-05-18 02:29:32.134629+00',
  hit_points: 0,
  initiative: 0,
  movement_speed: 0,
  public: false,
}

export default function CharacterViewPage () {
  const [character, setCharacter] = useState<Database['public']['Tables']['characters']['Row']>(characterPlaceholder);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getCharacters(id);
  }, [id])
  
  async function getCharacters(id: string | string[] | undefined) {
    setLoading(true);
    if (!id) return console.log('No id');
    try {
      const response = await fetch(`/api/characters/edit/${id}`)
      if (response.status !== 200) throw new Error('Error loading characters!')
      const data = (await response.json()) as Database['public']['Tables']['characters']['Row'][]
      setCharacter(data[0])
      setLoading(false);
    } catch (error) {
      alert(error)
      console.log(error)
    }
  }

  // Render the character data
  return (
    <Layout>
      <HeadContent
        title={'Dungeons and Dragons 5e | Monster Maker View'}
        description={"Dungeon Master's monster view and DnD 5e stat block maker."}
      />
      <Loader showLoader={loading} >
        <LayoutCharacter character={character} />
      </Loader>
    </Layout>
  );
};