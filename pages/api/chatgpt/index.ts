import { NextApiRequest, NextApiResponse } from 'next';
import { ChatGPTClient } from '@/lib/chatGPTClient';
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

  const chatGPTRequest: string = req.body;

  console.log('chatGPTRequest', chatGPTRequest)
  try {
    const client = new ChatGPTClient();
    console.log('Attempting to generate character...');
    const characterResponse = await client.generateCharacter(chatGPTRequest);
    console.log('Character generated:', characterResponse);
    const response = await supabaseServerClient.auth.getUser()
    const characterJson: Json = await JSON.parse(JSON.stringify(characterResponse.character))
    const userId = response.data.user?.id
    if (!userId) {
      return res.status(500).json({ error: 'No user id provided' })
    }

    const character: Database['public']['Tables']['characters']['Insert'] = {
      character_data: characterJson,
      image_filename: characterResponse.imageUrl,
      user_id: userId
    }

    
    const { data, error } = await supabaseServerClient
      .from('characters')
      .insert([character])
    if (error) {
      return res.status(500).json({ error: error.message })
    }
    console.log('data', data)
    return res.status(200).json(characterResponse);
  } catch (error) {
    const e = error as PostgresError;
    return res.status(500).json(e);
  }
};