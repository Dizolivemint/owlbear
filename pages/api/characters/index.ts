import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { Database } from '@/lib/database.types'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const supabaseServerClient = createServerSupabaseClient<Database>({
    req,
    res,
  })
  const response = await supabaseServerClient.auth.getUser()
  const { user } = response.data
  const { data, error } = await supabaseServerClient
    .from('characters')
    .select('*')
    .eq('user_id', user?.id)

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  res.status(200).json(data)
}