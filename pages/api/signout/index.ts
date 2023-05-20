import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: 'No token provided' });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return res.status(500).json({ error: 'Missing env variables for Supabase' });
  }

  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

  const { error } = await supabase.auth.admin.signOut(token);

  if (error) {
    console.error('Error signing out:', error.message);
    return res.status(500).json({ error: 'Error signing out' });
  }

  return res.status(200).json({ message: 'Signed out successfully' });
}
