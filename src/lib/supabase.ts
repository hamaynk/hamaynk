import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Client-side Supabase client (use anon key)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-side Supabase client (use service role key for admin operations)
export const supabaseAdmin = createClient(
  supabaseUrl,
  supabaseServiceRoleKey || supabaseAnonKey
);

export type Database = {
  public: {
    Tables: {
      events: {
        Row: {
          id: string;
          email: string;
          organizers: string;
          event_title: string;
          venue_address: string;
          venue_city: string;
          venue_state: string;
          event_url: string | null;
          event_date: string;
          start_time: string;
          price: string | null;
          age_group: string | null;
          interest: string | null;
          event_description: string;
          source: string | null;
          status: 'pending' | 'approved' | 'denied';
          created_at: string;
          updated_at: string;
          approved_by: string | null;
          approval_notes: string | null;
        };
        Insert: Omit<Database['public']['Tables']['events']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['events']['Row']>;
      };
      authorized_users: {
        Row: {
          id: string;
          email: string;
          user_id: string | null;
          created_at: string;
          is_active: boolean;
        };
      };
    };
  };
};
