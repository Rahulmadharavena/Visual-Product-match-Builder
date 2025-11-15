import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://mcseuaejdcedzvmbufii.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1jc2V1YWVqZGNlZHp2bWJ1ZmlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4NDMzNzksImV4cCI6MjA3ODQxOTM3OX0.IVsBcqQY_PFYiooeZouG4Z7vDOH5Dl6fNvG_Q-wOnUk';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface BadImage {
  id: string;
  url: string;
  status?: number;
  error?: string;
  reason?: string;
}

async function updateBadImages() {
  const reportPath = path.join(process.cwd(), 'bad-images.json');

  if (!fs.existsSync(reportPath)) {
    console.error('bad-images.json not found. Run checkImages.ts first.');
    return;
  }

  const badImages: BadImage[] = JSON.parse(fs.readFileSync(reportPath, 'utf-8'));

  if (badImages.length === 0) {
    console.log('No bad images to update.');
    return;
  }

  console.log(`Updating ${badImages.length} bad image URLs to placeholder...`);

  const updates = badImages.map(bad => ({
    id: bad.id,
    image_url: '/placeholder.jpg'
  }));

  const { data, error } = await supabase
    .from('products')
    .upsert(updates, { onConflict: 'id' });

  if (error) {
    console.error('Error updating products:', error);
    throw error;
  }

  console.log(`✅ Successfully updated ${updates.length} products with placeholder image.`);
}

updateBadImages().catch(console.error);
