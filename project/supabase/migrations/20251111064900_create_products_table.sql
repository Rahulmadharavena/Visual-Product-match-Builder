/*
  Visual Product Matcher - Products Database Schema
  
  1. New Tables
    - products: Stores product information with images
      - id (uuid, primary key)
      - name (text, required)
      - category (text, required)
      - description (text)
      - image_url (text, required)
      - price (numeric)
      - created_at (timestamptz)
      - updated_at (timestamptz)
    
    - search_history: Tracks user searches
      - id (uuid, primary key)
      - search_image_url (text)
      - results_count (integer)
      - created_at (timestamptz)
  
  2. Security
    - Enable RLS on all tables
    - Public read access to products
    - Public insert access for search history
  
  3. Indexes
    - Category index for filtering
    - Created_at index for sorting
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,
  description text,
  image_url text NOT NULL,
  price numeric,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS search_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  search_image_url text NOT NULL,
  results_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE search_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Products are publicly readable"
  ON products
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Search history is publicly insertable"
  ON search_history
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Search history is publicly readable"
  ON search_history
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_search_history_created_at ON search_history(created_at DESC);