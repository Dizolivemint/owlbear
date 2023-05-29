import { NextApiRequest, NextApiResponse } from 'next';
import { PostgresError } from '@/lib/postgres.types';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { Database, Json } from '@/lib/database.types';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const supabaseServerClient = createServerSupabaseClient<Database>({
    req,
    res,
  })

  
  const { size, species, challengeRating, isLegendary } = JSON.parse(req.body)
  const response = await supabaseServerClient.auth.getUser()

  console.log(size, species, challengeRating, isLegendary)
  const userId = response.data.user?.id
  if (!userId) {
    return res.status(500).json({ error: 'No user id provided' })
  }

  try {
    const request: Database['public']['Tables']['requests']['Insert'] = {
      size,
      species,
      challengeRating,
      isLegendary,
      user: userId
    }
    
    const { data, error } = await supabaseServerClient
      .from('requests')
      .insert([request])

    if (error) {
      return res.status(500).json({ error: error.message })
    }
    
    console.log('data', data)
    return res.status(200).json(data);
  } catch (error) {
    const e = error as PostgresError;
    return res.status(500).json(e);
  }
};