import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { Database } from '@/lib/database.types'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query

  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid id provided' })
  }
  if (!id) {
    return res.status(400).json({ error: 'No id provided' })
  }

  const supabaseServerClient = createServerSupabaseClient<Database>({
    req,
    res,
  })
  const response = await supabaseServerClient.auth.getUser()
  const { user } = response.data

  if (req.method === 'GET') {
    const { data, error } = await supabaseServerClient
      .from('characters')
      .select('*')
      .eq('id', id)

    if (error) {
      console.error(error)
      return res.status(500).json({ error: error.message })
    }

    res.status(200).json(data)
  }

  if (req.method === 'PUT') {
    const { data, error } = await supabaseServerClient
      .from('characters')
      .update(req.body)
      .eq('id', req.body.id)

    if (error) {
      return res.status(500).json({ error: error.message })
    }

    res.status(200).json(data)
  }
}