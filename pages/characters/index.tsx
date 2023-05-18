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
import List from '@/components/lists'
import Accordion from '@/components/accordion'
import { Tab, Tabs } from '@/components/tabs'
import Loader from '@/components/loader'
import Image from 'next/image';
import Checkbox from '@/components/checkbox'

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false)
  const [size, setSize] = useState<string>('Small')
  const [species, setSpecies] = useState<string>('')
  const [challengeRating, setChallengeRating] = useState<string>('')
  const [activeTab, setActiveTab] = useState<number>(0)
  const [isLegendary, setIsLegendary] = useState<boolean>(false)
  const [characters, setCharacters] = useState<Database['public']['Tables']['characters']['Row'][]>([])

  const router = useRouter()
  const session = useSession()

  useEffect(() => {
    if (!session) {
      router.push('/login')
    }
    console.log('Session', session)
  }, [session, router])

  // useEffect(() => {
  //   getCharacters()
  // }, [])

  useEffect(() => {
    console.log('Characters', characters)
    console.log('Characters', characters.map((character) => isCharacter(character.character_data)))
  }, [characters])

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
    setLoading(true)
    if (!size || !species || !challengeRating) return
    try {
      
      const response = await fetch('/api/chatgpt', {
        method: 'POST',
        body: JSON.stringify({
          size,
          species,
          challengeRating,
          isLegendary,
        }),
      })
      if (response.status !== 200) throw new Error('Error creating character!')
      const data = (await response.json()) as Database['public']['Tables']['characters']['Row'][]
      await getCharacters()
    } catch (error) {
      console.error('Error generating character:', error)
    }
    setLoading(false)
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
          <Container center={true}>
            <Tabs activeTabIndex={activeTab}>
              <Tab title={'Characters'}>
                {characters.length > 0 ? (
                  <List>
                    {characters.map((character) => (
                      <li key={character.id}>
                        {isCharacter(character.character_data) &&
                          <Accordion title={character.character_data.name} imageUrl={character.image_filename || ''}>
                            <Container>
                              <Image 
                                src={character.image_filename || ''} 
                                alt={character.character_data.name || ''} 
                                height={200}
                                width={200}
                              />
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
                              <h3>Legendary Actions</h3>
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
                        }
                      </li>
                    ))}
                  </List>
                ) : (
                  <Container>
                    <Loader showLoader={loading}>
                      <Button onClick={getCharacters}>Load Characters</Button>
                    </Loader>
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
                    <Button type="submit">Create Character</Button>
                  </Loader>
                </form>
              </Tab>
            </Tabs>
          </Container>
        </Layout>
      </main>
    </>
  )
}

function isArray(value: any): value is any[] {
  return Array.isArray(value);
}

function isCharacter(value: any): value is Character {
  return (
    value !== null &&
    typeof value === "object" &&
    typeof value.name === "string" &&
    typeof value.species === "string" &&
    (value.background === undefined || typeof value.background === "string") &&
    (value.desciprtion === undefined || typeof value.description === "string") &&
    typeof value.appearance === "string" &&
    typeof value.size === "string" &&
    typeof value.challenge_rating === "string" &&
    typeof value.attributes === "object" &&
    typeof value.attributes.STR === "number" &&
    typeof value.attributes.DEX === "number" &&
    typeof value.attributes.CON === "number" &&
    typeof value.attributes.INT === "number" &&
    typeof value.attributes.WIS === "number" &&
    typeof value.attributes.CHA === "number" &&
    isArray(value.skills) &&
    value.skills.every((skill: any) => 
      typeof skill.skill === "string" && typeof skill.description === "string"
    ) &&
    isArray(value.actions) &&
    value.actions.every((action: any) =>
      typeof action.action === "string" && typeof action.description === "string"
    ) &&
    isArray(value.reactions) &&
    value.reactions.every((reaction: any) =>
      typeof reaction.reaction === "string" && typeof reaction.description === "string"
    ) &&
    (value.legendary_actions === undefined || isArray(value.legendary_actions)) &&
    (value.legendary_actions === undefined ||
      value.legendary_actions.every(
        (legendary_action: any) =>
          typeof legendary_action?.legendary_action === "string" &&
          typeof legendary_action?.description === "string"
      )
    )
  );
}