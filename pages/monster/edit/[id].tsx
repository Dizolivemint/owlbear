import { useRouter } from 'next/router';
import { isCharacter } from '@/lib/typeGuards';
import { Database } from '@/lib/database.types'
import Container from '@/components/container';
import Image from 'next/image';
import List from '@/components/lists';
import { useEffect, useState } from 'react';
import Loader from '@/components/loader';
import Button from '@/components/button';
import Social from '@/components/social';

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

export default function CharacterEditPage () {
  const [character, setCharacter] = useState<Database['public']['Tables']['characters']['Row']>(characterPlaceholder);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const { id } = router.query;
  const domain = typeof window !== 'undefined' ? window.location.host : '';

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

  async function updateCharacter(updatedCharacter: Database['public']['Tables']['characters']['Row']) {
    setLoading(true);
    try {
      const response = await fetch(`/api/characters/edit/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCharacter),
      })
      if (response.status !== 200) throw new Error('Error updating character!')
      setCharacter(updatedCharacter)
      setLoading(false);
    } catch (error) {
      alert(error)
      console.log(error)
    }
  }

  // Render the character data
  return (
    <>
      {isCharacter(character?.character_data) && (
        <Container padding='2rem'>
          <Image 
            src={character.image_filename || ''} 
            alt={character.character_data.name || ''} 
            height={768}
            width={512}
            style={{objectFit: 'contain', maxWidth: '100%'}}
          />
          {!character.public ? (
            <Container padding='1rem'>
              <Loader showLoader={loading}>
                <Button
                  onClick={() => updateCharacter({ ...character, public: true })}
                >
                  Make public
                </Button>
              </Loader>
            </Container>
          ) : (
            <Social title={character.character_data.name || ''} description={character.character_data.background || ''} url={`https://${domain}/monster/${character.id}`} />
          )}
          <h2>{character.character_data.name}</h2>
          <h3>Background</h3>
          <p>{character.character_data.background || character.character_data.description}</p>
          <h3>Appearance</h3>
          <p>{character.character_data.appearance}</p>
          <h3>Size</h3>
          <p>{character.character_data.size}</p>
          <h3>Species</h3>
          <p>{character.character_data.species}</p>
          <h3>Challenge Rating</h3>
          <p>{character.character_data.challenge_rating}</p>
          <h3>Attributes</h3>
          <List direction={'column'}>
            <li>STR: {character.character_data.attributes.STR}</li>
            <li>DEX: {character.character_data.attributes.DEX}</li>
            <li>CON: {character.character_data.attributes.CON}</li>
            <li>INT: {character.character_data.attributes.INT}</li>
            <li>WIS: {character.character_data.attributes.WIS}</li>
            <li>CHA: {character.character_data.attributes.CHA}</li>
          </List>
          <h3>Skills</h3>
          {character.character_data.skills.map((skill, index) => (
            <div key={index}>
              <h5 id={`h-skill-${index}`}>Name</h5>
              <p aria-labelledby={`h-skill-${index}`}>{skill.skill}</p>
              <h5 id={`h-description-${index}`}>Description</h5>
              <p aria-labelledby={`h-description-${index}`}>{skill.description}</p>
            </div>
          ))}
          <h3>Actions</h3>
          {character.character_data.actions.map((action, index) => (
            <div key={index}>
              <h5 id={`h-action-${index}`}>Name</h5>
              <p aria-labelledby={`h-action-${index}`}>{action.action}</p>
              <h5 id={`h-description-${index}`}>Description</h5>
              <p aria-labelledby={`h-description-${index}`}>{action.description}</p>
            </div>
          ))}
          <h3>Reactions</h3>
          {character.character_data.reactions.map((reaction, index) => (
            <div key={index}>
              <h5 id="h-reaction-name">Name</h5>
              <p aria-labelledby="h-reaction">{reaction.reaction}</p>
              <h5 id="h-reaction-description">Description</h5>
              <p aria-labelledby="h-reaction-description">{reaction.description}</p>
            </div>
          ))}
          {character.character_data.legendary_actions && (
            <h3>Legendary Actions</h3>
          )}
          {character.character_data.legendary_actions && (
            character.character_data.legendary_actions.map((legendaryAction, index) => (
              <div key={index}>
                <h5 id={`h-legendary-action-${index}`}>Name</h5>
                <p aria-labelledby={`h-legendary-action-${index}`}>{legendaryAction.legendary_action}</p>
                <h5 id={`h-legendary-description-${index}`}>Description</h5>
                <p aria-labelledby={`h-legendary-description-${index}`}>{legendaryAction.description}</p>
              </div>
            ))
          )}
        </Container>
      ) || loading && (
          <Loader showLoader={true} >
            <h2>Loading...</h2>
          </Loader>
        ) || (
          <Container padding={'2rem'}>
            <h2>Character not found</h2>
          </Container>
      )}
    </>
  );
};