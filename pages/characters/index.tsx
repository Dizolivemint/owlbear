import Head from 'next/head'
import Layout from '@/components/layout'
import { useState } from 'react'
import { Database } from '@/lib/database.types'
import { useSession } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Container from '@/components/container'
import Button from '@/components/button'
import Input, { InputLabel } from '@/components/input'
import Select from '@/components/select'
import { Character } from '@/lib/app.types'

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false)
  const [size, setSize] = useState<string>('Small')
  const [species, setSpecies] = useState<string>('')
  const [challengeRating, setChallengeRating] = useState<string>('')

  const router = useRouter()

  const session = useSession()

  useEffect(() => {
    // if (!session) {
    //   router.push('/login')
    // }
    console.log('Session', session)
  }, [session, router])

  const [characters, setCharacters] = useState<Database['public']['Tables']['characters']['Row'][]>([])

  // useEffect(() => {
  //   getCharacters()
  // }, [])

  async function getCharacters() {
    try {
      const response = await fetch('/api/characters')
      if (response.status !== 200) throw new Error('Error loading characters!')
      const data = (await response.json()) as Database['public']['Tables']['characters']['Row'][]
      setCharacters(data)
    } catch (error) {
      alert(error)
      console.log(error)
    }
  }

  async function createCharacter(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!size || !species || !challengeRating) return
    try {
      
      const response = await fetch('/api/chatgpt', {
        method: 'POST',
        body: JSON.stringify({
          size,
          species,
          challengeRating
        }),
      })
      if (response.status !== 200) throw new Error('Error creating character!')
      const data = (await response.json()) as Database['public']['Tables']['characters']['Row'][]
      setCharacters(data)
    } catch (error) {
      console.error('Error generating character:', error)
    }
  }

  return (
    <>
      <Head>
        <title>Battle Map</title>
        <meta name="description" content="Battle Map Character List for Dungeons and Dragons 5e" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Layout>
          {characters.length > 0 ? (
            <Container>
              <h1>Characters</h1>
              <ul>
                {characters.map((character) => (
                  <li key={character.id}>
                    <a href={`/characters/${character.id}`}>
                      {isCharacter(character.character_data) &&
                        <div>
                          <h2>{character.name}</h2>
                          <h3>Description</h3>
                          <p>{character.character_data.description}</p>
                          <p>{character.character_data.size}</p>
                          <p>{character.character_data.species}</p>
                          <p>{character.character_data.challenge_rating}</p>
                          <h3>Attributes</h3>
                          <p>{character.character_data.attributes.STR}</p>
                          <p>{character.character_data.attributes.DEX}</p>
                          <p>{character.character_data.attributes.CON}</p>
                          <p>{character.character_data.attributes.INT}</p>
                          <p>{character.character_data.attributes.WIS}</p>
                          <p>{character.character_data.attributes.CHA}</p>
                          <h3>Skills</h3>
                          {Object.entries(character.character_data.skills).map(([key, value]) => 
                            <p key={key}>{key}: {value}</p>
                          )}
                          <h3>Actions</h3>
                          {Object.entries(character.character_data.actions).map(([key, value]) =>
                            <p key={key}>{key}: {value}</p>
                          )}
                          <h3>Reactions</h3>
                          {Object.entries(character.character_data.reactions).map(([key, value]) =>
                            <p key={key}>{key}: {value}</p>
                          )}
                        </div>
                      }
                    
                    </a>
                  </li>
                ))}
              </ul>
            </Container>
          ) : (
            <Container>
              <h1>No Characters</h1>
              <Button onClick={getCharacters}>Load Characters</Button>
            </Container>
          )}
          <Container>
            <form onSubmit={createCharacter}>
              <InputLabel htmlFor="size">Size</InputLabel>
              <Select id={'size'} value={size} onChange={(e) => setSize(e.target.value)}>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
                <option value="huge">Huge</option>
                <option value="gargantuan">Gargantuan</option>
              </Select>
              <InputLabel htmlFor="species">Species</InputLabel>
              <Input type='text' id={'species'} value={species} onChange={(e) => setSpecies(e.target.value)} />
              <InputLabel htmlFor="challengeRating">Challenge Rating</InputLabel>
              <Input type='number' id={'challengeRating'} value={challengeRating} onChange={(e) => setChallengeRating(e.target.value)}/>
              <Button type="submit">Create Character</Button>
            </form>
              
          </Container>

        </Layout>
      </main>
    </>
  )
}

function isCharacter(value: any): value is Character {
  return value !== null
    && typeof value === 'object'
    && typeof value.name === 'string'
    && typeof value.species === 'string'
    && typeof value.challenge_rating === 'number'
    && typeof value.attributes === 'object'
    && typeof value.attributes.STR === 'number'
    && typeof value.attributes.DEX === 'number'
    && typeof value.attributes.CON === 'number'
    && typeof value.attributes.INT === 'number'
    && typeof value.attributes.WIS === 'number'
    && typeof value.attributes.CHA === 'number'
    && typeof value.skills === 'object'
    && typeof value.actions === 'object'
    && typeof value.reactions === 'object'
    && typeof value.description === 'string';
}