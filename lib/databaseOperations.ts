import { supabase } from '@/supabaseClient';
import {
  Database
} from '@/lib/database.types';

// Profiles
export const getProfiles = async () => {
  const response = await supabase.from('profiles').select('*');
  const data = response.data as Database['public']['Tables']['profiles']['Row'][] | null;
  const error = response.error;
  if (error) throw error;
  return data;
};

export const insertProfile = async (profile: Database['public']['Tables']['profiles']['Insert']) => {
  const response = await supabase.from('profiles').insert([profile]);
  const data = response.data as Database['public']['Tables']['profiles']['Row'][] | null;
  const error = response.error;
  if (error) throw error;
  return data;
};

export const updateProfile = async (id: string, profile: Database['public']['Tables']['profiles']['Update']) => {
  const response = await supabase.from('profiles').update(profile).eq('id', id);
  const data = response.data as Database['public']['Tables']['profiles']['Row'][] | null;
  const error = response.error;
  if (error) throw error;
  return data;
};

export const deleteProfile = async (id: string) => {
  const response = await supabase.from('profiles').delete().eq('id', id);
  const data = response.data as Database['public']['Tables']['profiles']['Row'][] | null;
  const error = response.error;
  if (error) throw error;
  return data;
};


// quiz
export const getquiz = async () => {
  const response = await supabase.from('quiz').select('*');
  const data = response.data as Database['public']['Tables']['quiz']['Row'][] | null;
  const error = response.error;
  if (error) throw error;
  return data;
}

export const insertQuiz = async (quiz: Database['public']['Tables']['quiz']['Insert']) => {
  const response = await supabase.from('quiz').insert([quiz]);
  const data = response.data as Database['public']['Tables']['quiz']['Row'][] | null;
  const error = response.error;
  if (error) throw error;
  return data;
}

export const updateQuiz = async (id: string, quiz: Database['public']['Tables']['quiz']['Update']) => {
  const response = await supabase.from('quiz').update(quiz).eq('id', id);
  const data = response.data as Database['public']['Tables']['quiz']['Row'][] | null;
  const error = response.error;
  if (error) throw error;
  return data;
}

export const deleteQuiz = async (id: string) => {
  const response = await supabase.from('quiz').delete().eq('id', id);
  const data = response.data as Database['public']['Tables']['quiz']['Row'][] | null;
  const error = response.error;
  if (error) throw error;
  return data;
}

// Questions
export const getQuestions = async () => {
  const response = await supabase.from('questions').select('*');
  const data = response.data as Database['public']['Tables']['questions']['Row'][] | null;
  const error = response.error;
  if (error) throw error;
  return data;
}

export const insertQuestion = async (question: Database['public']['Tables']['questions']['Insert']) => {
  const response = await supabase.from('questions').insert([question]);
  const data = response.data as Database['public']['Tables']['questions']['Row'][] | null;
  const error = response.error;
  if (error) throw error;
  return data;
}

export const updateQuestion = async (id: string, question: Database['public']['Tables']['questions']['Update']) => {
  const response = await supabase.from('questions').update(question).eq('id', id);
  const data = response.data as Database['public']['Tables']['questions']['Row'][] | null;
  const error = response.error;
  if (error) throw error;
  return data;
}

export const deleteQuestion = async (id: string) => {
  const response = await supabase.from('questions').delete().eq('id', id);
  const data = response.data as Database['public']['Tables']['questions']['Row'][] | null;
  const error = response.error;
  if (error) throw error;
  return data;
}

// Quiz Question Many-to-Many Relationship
export const getQuizQuestions = async () => {
  const response = await supabase.from('quiz_questions').select('*');
  const data = response.data as Database['public']['Tables']['quiz_questions']['Row'][] | null;
  const error = response.error;
  if (error) throw error;
}

export const insertQuizQuestion = async (quizQuestion: Database['public']['Tables']['quiz_questions']['Insert']) => {
  const response = await supabase.from('quiz_questions').insert([quizQuestion]);
  const data = response.data as Database['public']['Tables']['quiz_questions']['Row'][] | null;
  const error = response.error;
  if (error) throw error;
  return data;
}

export const updateQuizQuestion = async (id: string, quizQuestion: Database['public']['Tables']['quiz_questions']['Update']) => {
  const response = await supabase.from('quiz_questions').update(quizQuestion).eq('id', id);
  const data = response.data as Database['public']['Tables']['quiz_questions']['Row'][] | null;
  const error = response.error;
  if (error) throw error;
  return data;
}

export const deleteQuizQuestion = async (id: string) => {
  const response = await supabase.from('quiz_questions').delete().eq('id', id);
  const data = response.data as Database['public']['Tables']['quiz_questions']['Row'][] | null;
  const error = response.error;
  if (error) throw error;
  return data;
}

// Outcomes
export const getOutcomes = async () => {
  const response = await supabase.from('outcomes').select('*');
  const data = response.data as Database['public']['Tables']['outcomes']['Row'][] | null;
  const error = response.error;
  if (error) throw error;
  return data;
}

export const insertOutcome = async (outcome: Database['public']['Tables']['outcomes']['Insert']) => {
  const response = await supabase.from('outcomes').insert([outcome]);
  const data = response.data as Database['public']['Tables']['outcomes']['Row'][] | null;
  const error = response.error;
  if (error) throw error;
  return data;
}

export const updateOutcome = async (id: string, outcome: Database['public']['Tables']['outcomes']['Update']) => {
  const response = await supabase.from('outcomes').update(outcome).eq('id', id);
  const data = response.data as Database['public']['Tables']['outcomes']['Row'][] | null;
  const error = response.error;
  if (error) throw error;
  return data;
}

export const deleteOutcome = async (id: string) => {
  const response = await supabase.from('outcomes').delete().eq('id', id);
  const data = response.data as Database['public']['Tables']['outcomes']['Row'][] | null;
  const error = response.error;
  if (error) throw error;
  return data;
}