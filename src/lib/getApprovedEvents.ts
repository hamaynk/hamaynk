import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.SUPABASE_URL;
const supabaseAnonKey = import.meta.env.SUPABASE_ANON_KEY;

export async function getApprovedEvents() {
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('status', 'approved');

  if (error) {
    console.error('Error fetching approved events:', error);
    return [];
  }

  return data || [];
}
