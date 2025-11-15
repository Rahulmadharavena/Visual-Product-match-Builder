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

async function checkImages() {
  console.log('Fetching products from Supabase...');

  const { data: products, error: fetchError } = await supabase
    .from('products')
    .select('id, image_url');

  if (fetchError) {
    console.error('Error fetching products:', fetchError);
    throw fetchError;
  }

  if (!products || products.length === 0) {
    console.log('No products found.');
    return;
  }

  console.log(`Checking ${products.length} image URLs...`);

  const badImages: BadImage[] = [];

  for (const product of products) {
    const url = product.image_url;
    if (!url) {
      badImages.push({ id: product.id, url: '', reason: 'no-url' });
      continue;
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch(url, {
        method: 'HEAD',
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        badImages.push({ id: product.id, url, status: response.status });
      }
    } catch (err) {
      badImages.push({
        id: product.id,
        url,
        error: err instanceof Error ? err.message : 'Unknown error'
      });
    }
  }

  const reportPath = path.join(process.cwd(), 'bad-images.json');
  fs.writeFileSync(reportPath, JSON.stringify(badImages, null, 2));

  console.log(`Done. Found ${badImages.length} bad images. Report saved to bad-images.json`);
}

checkImages().catch(console.error);
