import { useState, useEffect } from 'react'
import { useUser, useSupabaseClient, Session } from '@supabase/auth-helpers-react'
import { Database } from 'lib/database.types'
import Head from 'next/head'
import Layout from '@/components/layout'
import Container from '@/components/container'
import HeadContent from '@/components/head'
import Button from '@/components/button'
import Input, { InputLabel } from '@/components/input'

type Profiles = Database['public']['Tables']['profiles']['Row']

export default function Account({ session }: { session: Session }) {
  const supabase = useSupabaseClient<Database>()
  const user = useUser()
  const [loading, setLoading] = useState(true)
  const [display_name, setDisplayName] = useState<Profiles['display_name']>(null)
  const [avatar_url, setAvatarUrl] = useState<Profiles['avatar_url']>(null)

  useEffect(() => {
    getProfile()
  }, [session])

  async function getProfile() {
    try {
      setLoading(true)
      if (!user) throw new Error('No user')

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`display_name, avatar_url`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setDisplayName(data.display_name)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      alert('Error loading user data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile({
    display_name,
    avatar_url,
  }: {
    display_name: Profiles['display_name']
    avatar_url: Profiles['avatar_url']
  }) {
    try {
      setLoading(true)
      if (!user) throw new Error('No user')

      const updates = {
        auth_uid: user.id,
        display_name,
        avatar_url,
        updated_at: new Date().toISOString(),
      }

      let { error } = await supabase.from('profiles').upsert(updates)
      if (error) throw error
      alert('Profile updated!')
    } catch (error) {
      alert('Error updating the data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  if (!user || loading) {
    return <div>Loading...</div>; // Or return an empty element: return <></>;
  }

  return (
    <>
    <Head>
      <HeadContent
          title={'Dungeons and Dragons 5e - Character Generator and Owlbear'}
          description={'Owlbear for use with Dungeons and Dragons 5e'}
        />
    </Head>
    <Layout>
      <Container padding={'1rem'}>
        <Container>
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input type="text" value={user.email} />
        </Container>
        <Container>
          <InputLabel htmlFor="displayName">Display Name</InputLabel>
          <Input
            id="displayName"
            type="text"
            value={display_name || ''}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </Container>

        <Container>
          <Button
            onClick={() => updateProfile({ display_name, avatar_url })}
            disabled={loading}
          >
            {loading ? 'Loading ...' : 'Update'}
          </Button>
        </Container>

        <Container>
          <Button onClick={() => supabase.auth.signOut()}>
            Sign Out
          </Button>
        </Container>
      </Container>
    </Layout>
  </>
  )
}