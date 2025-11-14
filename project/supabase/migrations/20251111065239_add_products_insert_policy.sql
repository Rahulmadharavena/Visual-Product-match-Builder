/*
  Add INSERT policy for products table
  
  1. Security Changes
    - Add public INSERT policy for products table
    - This allows anyone to add products to the database
    - Necessary for initial data seeding and demo purposes
*/

CREATE POLICY "Products are publicly insertable"
  ON products
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);