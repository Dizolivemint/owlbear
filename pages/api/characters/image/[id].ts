import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { Database } from '@/lib/database.types'
import { ChatGPTClient } from '@/lib/chatGPTClient';

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

  const { data, error } = await supabaseServerClient
    .from('characters')
    .select('image_fetch_url')
    .eq('id', id)

  if (!data || !data[0]) {
    return res.status(400).json({ error: 'No character found' })
  }

  const image_fetch_url = data[0].image_fetch_url

  if (!image_fetch_url) {
    return res.status(400).json({ error: 'No image found' })
  }

  try {
    const client = new ChatGPTClient();
    const response = await client.fetchImage(image_fetch_url)
    if (!response) {
      return res.status(500).json({ error: 'Error fetching image. Try again, later.' });
    }
    const { data, error } = await supabaseServerClient
      .from('characters')
      .update({ image_filename: response })
      .eq('id', id)
    if (error) {
      return res.status(500).json({ error: error.message })
    }
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error });
  }
}