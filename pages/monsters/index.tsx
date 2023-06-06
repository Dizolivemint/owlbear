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
import { Tab, Tabs } from '@/components/tabs'
import Loader from '@/components/loader'
import Checkbox from '@/components/checkbox'
import useSWR from 'swr'
import LayoutCharacter from '@/components/layout/character'
import HeadContent from '@/components/head'
import Link from 'next/link'

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
  const [loading, setLoading] = useState<boolean>(false)
  const [size, setSize] = useState<string>('Small')
  const [species, setSpecies] = useState<string>('')
  const [challengeRating, setChallengeRating] = useState<string>('')
  const [activeTab, setActiveTab] = useState<number>(0)
  const [isLegendary, setIsLegendary] = useState<boolean>(false)
  const [characters, setCharacters] = useState<Database['public']['Tables']['characters']['Row'][]>([])
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
    if (data) {
      setCharacters(data);
      setActiveTab(0);
    }
  }, [data]);

  // useEffect(() => {
  //   console.log('Characters', characters.map((character) => isCharacter(character.character_data)))
  // }, [characters])

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
    } catch (error) {
      console.error('Error generating character:', error)
    }
    setLoading(false)
  }

  return (
    <>
      <Head>
        <HeadContent
          title={'Dungeons and Dragons 5e | Monster Limbo'}
          description={"Dungeon Master's monster generator and DnD 5e stat block maker."}
        />
      </Head>
      <main>
        <Layout>
          <Container center={true}>
            <Tabs activeTabIndex={activeTab} key={activeTab}>
              <Tab title={'Monsters'}>
                {isLoading ? (
                  <Container center={true} style={{maxWidth: '1200px', margin: 'auto', minHeight: 'calc(100vh - 15rem)'}}>
                    <Loader showLoader={isLoading}>
                    </Loader>
                  </Container>
                ) : characters.length > 0 ? (
                  <Container padding='1rem' center={true} style={{maxWidth: '1200px', margin: 'auto', minHeight: 'calc(100vh - 15rem)'}}>
                    <List>
                      {characters.map((character) => (
                        <li key={character.id}>
                          <LayoutCharacter character={character} isAccordion={true}>
                            <>
                              <Link href={`/monster/view/${character.id}`}><Button>View</Button></Link>
                              <Link href={`/monster/edit/${character.id}`}><Button>Edit</Button></Link>
                            </>
                          </LayoutCharacter>
                        </li>
                      ))}
                    </List>
                  </Container>
                ) : (
                  <Container>
                    <p>No monsters found, yet.</p>
                  </Container>
                )}
              </Tab>
              <Tab title={'Create'}>
                <Container center={true} style={{width:'100vw'}}>
                  <Container center={true} padding='1rem' style={{maxWidth: '233px'}}>
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
                    </form>
                  </Container>
                  <Container center={true} textCenter={true} padding='1rem'>
                    {error && (
                      <>
                        <p>{error}</p>
                        <p>Please try again later...</p>
                      </>
                    )}
                    {isSuccess && (
                      <>
                        <p>Successfully queued!</p>
                        <p>When your monster is ready, you will be notified by email or push notification.</p>
                      </>
                    )}
                  </Container>
                </Container>
              </Tab>
            </Tabs>
          </Container>
        </Layout>
      </main>
    </>
  )
}