import { NextApiRequest, NextApiResponse } from 'next';
import { ChatGPTClient } from '@/lib/chatGPTClient';
import { PostgresError } from '@/lib/postgres.types';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  const chatGPTRequest: string = req.body;

  try {
    const client = new ChatGPTClient();
    const chatGPTResponse = await client.generateCharacter(chatGPTRequest);
    // const chatGPTResponse = chatGPTRequest
    res.status(200).json(chatGPTResponse);
  } catch (error) {
    const e = error as PostgresError;
    res.status(500).json(e);
  }
};
