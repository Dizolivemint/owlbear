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
import List from '@/components/lists'
import Accordion from '@/components/accordion'
import { Tab, Tabs } from '@/components/tabs'
import Loader from '@/components/loader'
import Image from 'next/image';
import Checkbox from '@/components/checkbox'
import { isCharacter } from '@/lib/typeGuards'
import Link from 'next/link'
import useSWR from 'swr'

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

export default function Monsters() {
  const { data, error: fetchError, isLoading } = useSWR('/api/characters', fetcher, { refreshInterval: 10000 });
  const [loading, setLoading] = useState<boolean>(isLoading)
  const [size, setSize] = useState<string>('Small')
  const [species, setSpecies] = useState<string>('')
  const [challengeRating, setChallengeRating] = useState<string>('')
  const [activeTab, setActiveTab] = useState<number>(0)
  const [isLegendary, setIsLegendary] = useState<boolean>(false)
  const [characters, setCharacters] = useState<Database['public']['Tables']['characters']['Row'][]>(data)
  const [error, setError] = useState<string>(fetchError?.message || '')
  const [isSuccess, setSuccess] = useState<boolean>(false)

  const router = useRouter()
  const session = useSession()

  useEffect(() => {
    if (!session) {
      router.push('/login')
    }
  }, [session, router])

  useEffect(() => {
    getCharacters()
  }, [])

  // useEffect(() => {
  //   console.log('Characters', characters.map((character) => isCharacter(character.character_data)))
  // }, [characters])

  async function getCharacters() {
    setLoading(true)
    try {
      const response = await fetch('/api/characters')
      if (response.status !== 200) throw new Error('Error loading characters!')
      const data = (await response.json()) as Database['public']['Tables']['characters']['Row'][]
      setCharacters(data)
      setActiveTab(0)
    } catch (error) {
      alert(error)
      console.log(error)
    }
    setLoading(false)
  }

  async function createCharacter(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('')
    setLoading(true)
    setSuccess(false)
    if (!size || !species || !challengeRating) return
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        body: JSON.stringify({
          size,
          species,
          challengeRating,
          isLegendary,
        }),
      })
      if (response.status !== 200) {
        setError('Error generating character!')
      }
      setSuccess(true)
      await getCharacters()
    } catch (error) {
      console.error('Error generating character:', error)
    }
    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>AI Monster Generator</title>
        <meta name="description" content="Generate a monster or NPC of any type" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Layout>
          <Container center={true}>
            <Tabs activeTabIndex={activeTab} key={activeTab}>
              <Tab title={'Monsters'}>
                {loading ? (
                  <Container>
                    <Loader showLoader={loading}>
                    </Loader>
                  </Container>
                ) : characters.length > 0 ? (
                  <List>
                    {characters.map((character) => (
                      <li key={character.id}>
                        {isCharacter(character.character_data) ? (
                          <Accordion title={character.character_data.name} imageUrl={character.image_filename || ''}>
                            <Container>
                              <Image 
                                src={character.image_filename || ''} 
                                alt={character.character_data.name || ''} 
                                height={200}
                                width={200}
                              />
                              <Link href={`/monster/edit/${character.id}`}><Button>Edit</Button></Link>
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
                          </Accordion>
                        ) : (
                          <div style={{ border: '1px solid red', padding: '1rem', marginBottom: '1rem' }}>
                            <p>One of your character's data is off. Please submit an issue (link in the footer).</p>
                          </div>
                        )}
                      </li>
                    ))}
                  </List>
                ) : (
                  <Container>
                    <p>No monsters found, yet.</p>
                  </Container>
                )}
              </Tab>
              <Tab title={'Create'}>
                <form onSubmit={createCharacter}>
                  <InputLabel htmlFor="size">Size</InputLabel>
                  <Select id={'size'} value={size} onChange={(e) => setSize(e.target.value)}>
                    <option value="tiny">Tiny</option>
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
                  <Checkbox id={'isLegendary'} isActive={isLegendary} isCircle={true} onChange={(e) => setIsLegendary(e.target.checked)}>
                    Is Legendary?
                  </Checkbox>
                  <Loader showLoader={loading}>
                    <Button type="submit">Create Monster</Button>
                  </Loader>
                  {error && (
                    <Container>
                      <p>{error}</p>
                      <p>Please try again later...</p>
                    </Container>
                  )}
                  {isSuccess && (
                    <Container>
                      <p>Successfully queued!</p>
                      <p>Your monster will be generated on the backend.</p>
                      <p>Check back in a few minutes and click the Load button.</p>
                      <p>In the future, you will be notified when your monster has been generated.</p>
                    </Container>
                  )}
                </form>
              </Tab>
            </Tabs>
          </Container>
        </Layout>
      </main>
    </>
  )
}