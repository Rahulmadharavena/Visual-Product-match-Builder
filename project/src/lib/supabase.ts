import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string | null;
  image_url: string;
  price: number | null;
  created_at: string;
  updated_at: string;
  similarity_score?: number;
}

export interface SearchHistory {
  id: string;
  search_image_url: string;
  results_count: number;
  created_at: string;
}
