import { createClient } from '@supabase/supabase-js';
import { SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_KEY || '';
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

// Service functions for interacting with Supabase can be added here.