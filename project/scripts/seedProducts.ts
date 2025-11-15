import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mcseuaejdcedzvmbufii.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1jc2V1YWVqZGNlZHp2bWJ1ZmlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4NDMzNzksImV4cCI6MjA3ODQxOTM3OX0.IVsBcqQY_PFYiooeZouG4Z7vDOH5Dl6fNvG_Q-wOnUk';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const sampleProducts = [
  {
    name: 'Classic White Sneakers',
    category: 'Footwear',
    description: 'Comfortable all-white leather sneakers perfect for everyday wear',
    image_url: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg',
    price: 79.99
  },
  {
    name: 'Black Running Shoes',
    category: 'Footwear',
    description: 'High-performance running shoes with excellent cushioning',
    image_url: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg',
    price: 119.99
  },
  {
    name: 'Brown Leather Boots',
    category: 'Footwear',
    description: 'Durable leather boots for all weather conditions',
    image_url: 'https://images.pexels.com/photos/1032110/pexels-photo-1032110.jpeg',
    price: 149.99
  },
  {
    name: 'Canvas Sneakers',
    category: 'Footwear',
    description: 'Casual canvas sneakers in multiple colors',
    image_url: 'https://images.pexels.com/photos/1280064/pexels-photo-1280064.jpeg',
    price: 49.99
  },
  {
    name: 'Sport Trainers',
    category: 'Footwear',
    description: 'Professional sport trainers for gym and athletics',
    image_url: 'https://images.pexels.com/photos/2385477/pexels-photo-2385477.jpeg',
    price: 89.99
  },
  {
    name: 'Denim Jacket',
    category: 'Clothing',
    description: 'Classic blue denim jacket with button closure',
    image_url: 'https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg',
    price: 69.99
  },
  {
    name: 'White T-Shirt',
    category: 'Clothing',
    description: 'Basic cotton white t-shirt, essential wardrobe item',
    image_url: 'https://images.pexels.com/photos/2894470/pexels-photo-2894470.jpeg',
    price: 19.99
  },
  {
    name: 'Black Leather Jacket',
    category: 'Clothing',
    description: 'Premium leather jacket with modern design',
    image_url: 'https://images.pexels.com/photos/1006206/pexels-photo-1006206.jpeg',
    price: 199.99
  },
  {
    name: 'Striped Casual Shirt',
    category: 'Clothing',
    description: 'Comfortable striped shirt for casual occasions',
    image_url: 'https://images.pexels.com/photos/2698645/pexels-photo-2698645.jpeg',
    price: 39.99
  },
  {
    name: 'Knit Sweater',
    category: 'Clothing',
    description: 'Cozy knit sweater for cold weather',
    image_url: 'https://images.pexels.com/photos/2112648/pexels-photo-2112648.jpeg',
    price: 59.99
  },
  {
    name: 'Blue Jeans',
    category: 'Clothing',
    description: 'Classic fit blue denim jeans',
    image_url: 'https://images.pexels.com/photos/1082526/pexels-photo-1082526.jpeg',
    price: 54.99
  },
  {
    name: 'Red Hoodie',
    category: 'Clothing',
    description: 'Comfortable cotton hoodie in vibrant red',
    image_url: 'https://images.pexels.com/photos/2220315/pexels-photo-2220315.jpeg',
    price: 44.99
  },
  {
    name: 'Vintage Watch',
    category: 'Accessories',
    description: 'Classic analog watch with leather strap',
    image_url: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg',
    price: 129.99
  },
  {
    name: 'Aviator Sunglasses',
    category: 'Accessories',
    description: 'Stylish aviator sunglasses with UV protection',
    image_url: 'https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg',
    price: 89.99
  },
  {
    name: 'Leather Wallet',
    category: 'Accessories',
    description: 'Genuine leather bifold wallet',
    image_url: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg',
    price: 39.99
  },
  {
    name: 'Canvas Backpack',
    category: 'Accessories',
    description: 'Durable canvas backpack for daily use',
    image_url: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg',
    price: 64.99
  },
  {
    name: 'Silver Bracelet',
    category: 'Accessories',
    description: 'Elegant sterling silver bracelet',
    image_url: 'https://images.pexels.com/photos/2697787/pexels-photo-2697787.jpeg',
    price: 79.99
  },
  {
    name: 'Baseball Cap',
    category: 'Accessories',
    description: 'Adjustable cotton baseball cap',
    image_url: 'https://images.pexels.com/photos/1124287/pexels-photo-1124287.jpeg',
    price: 24.99
  },
  {
    name: 'Leather Belt',
    category: 'Accessories',
    description: 'Classic brown leather belt with metal buckle',
    image_url: 'https://images.pexels.com/photos/1440387/pexels-photo-1440387.jpeg',
    price: 34.99
  },
  {
    name: 'Laptop Bag',
    category: 'Accessories',
    description: 'Professional laptop bag with multiple compartments',
    image_url: 'https://images.pexels.com/photos/2897462/pexels-photo-2897462.jpeg',
    price: 99.99
  },
  {
    name: 'Wireless Headphones',
    category: 'Electronics',
    description: 'Premium noise-canceling wireless headphones',
    image_url: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg',
    price: 249.99
  },
  {
    name: 'Smart Watch',
    category: 'Electronics',
    description: 'Fitness tracking smart watch with heart rate monitor',
    image_url: 'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg',
    price: 299.99
  },
  {
    name: 'Bluetooth Speaker',
    category: 'Electronics',
    description: 'Portable waterproof bluetooth speaker',
    image_url: 'https://images.pexels.com/photos/1279108/pexels-photo-1279108.jpeg',
    price: 79.99
  },
  {
    name: 'Digital Camera',
    category: 'Electronics',
    description: 'High-resolution digital camera for photography',
    image_url: 'https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg',
    price: 599.99
  },
  {
    name: 'Tablet Device',
    category: 'Electronics',
    description: '10-inch tablet with high-resolution display',
    image_url: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg',
    price: 399.99
  },
  {
    name: 'USB-C Cable',
    category: 'Electronics',
    description: 'Fast charging USB-C cable 6ft',
    image_url: 'https://images.pexels.com/photos/4219861/pexels-photo-4219861.jpeg',
    price: 19.99
  },
  {
    name: 'Power Bank',
    category: 'Electronics',
    description: '20000mAh portable power bank',
    image_url: 'https://images.pexels.com/photos/4666751/pexels-photo-4666751.jpeg',
    price: 49.99
  },
  {
    name: 'Gaming Mouse',
    category: 'Electronics',
    description: 'RGB gaming mouse with programmable buttons',
    image_url: 'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg',
    price: 69.99
  },
  {
    name: 'Mechanical Keyboard',
    category: 'Electronics',
    description: 'RGB mechanical keyboard with blue switches',
    image_url: 'https://images.pexels.com/photos/1772123/pexels-photo-1772123.jpeg',
    price: 129.99
  },
  {
    name: 'Desk Lamp',
    category: 'Home',
    description: 'Adjustable LED desk lamp with touch control',
    image_url: 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg',
    price: 44.99
  },
  {
    name: 'Coffee Mug Set',
    category: 'Home',
    description: 'Set of 4 ceramic coffee mugs',
    image_url: 'https://images.pexels.com/photos/1251175/pexels-photo-1251175.jpeg',
    price: 29.99
  },
  {
    name: 'Wall Clock',
    category: 'Home',
    description: 'Modern minimalist wall clock',
    image_url: 'https://images.pexels.com/photos/1178684/pexels-photo-1178684.jpeg',
    price: 34.99
  },
  {
    name: 'Throw Pillow',
    category: 'Home',
    description: 'Decorative throw pillow with geometric pattern',
    image_url: 'https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg',
    price: 24.99
  },
  {
    name: 'Plant Pot',
    category: 'Home',
    description: 'Ceramic plant pot with drainage',
    image_url: 'https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg',
    price: 19.99
  },
  {
    name: 'Picture Frame',
    category: 'Home',
    description: 'Wooden picture frame 8x10 inches',
    image_url: 'https://images.pexels.com/photos/1839919/pexels-photo-1839919.jpeg',
    price: 14.99
  },
  {
    name: 'Yoga Mat',
    category: 'Sports',
    description: 'Non-slip yoga mat with carrying strap',
    image_url: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg',
    price: 39.99
  },
  {
    name: 'Dumbbell Set',
    category: 'Sports',
    description: 'Adjustable dumbbell set 5-25 lbs',
    image_url: 'https://images.pexels.com/photos/3490363/pexels-photo-3490363.jpeg',
    price: 89.99
  },
  {
    name: 'Water Bottle',
    category: 'Sports',
    description: 'Insulated stainless steel water bottle 32oz',
    image_url: 'https://images.pexels.com/photos/4021857/pexels-photo-4021857.jpeg',
    price: 29.99
  },
  {
    name: 'Tennis Racket',
    category: 'Sports',
    description: 'Professional tennis racket with cover',
    image_url: 'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg',
    price: 119.99
  },
  {
    name: 'Basketball',
    category: 'Sports',
    description: 'Official size basketball for outdoor use',
    image_url: 'https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg',
    price: 34.99
  },
  {
    name: 'Resistance Bands',
    category: 'Sports',
    description: 'Set of 5 resistance bands with different levels',
    image_url: 'https://images.pexels.com/photos/4498606/pexels-photo-4498606.jpeg',
    price: 24.99
  },
  {
    name: 'Jump Rope',
    category: 'Sports',
    description: 'Speed jump rope for cardio workouts',
    image_url: 'https://images.pexels.com/photos/4498174/pexels-photo-4498174.jpeg',
    price: 14.99
  },
  {
    name: 'Running Armband',
    category: 'Sports',
    description: 'Adjustable armband for phone while running',
    image_url: 'https://images.pexels.com/photos/4498606/pexels-photo-4498606.jpeg',
    price: 19.99
  },
  {
    name: 'Leather Handbag',
    category: 'Bags',
    description: 'Elegant leather handbag with adjustable strap',
    image_url: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg',
    price: 129.99
  },
  {
    name: 'Travel Duffel Bag',
    category: 'Bags',
    description: 'Large capacity travel duffel bag',
    image_url: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
    price: 79.99
  },
  {
    name: 'Messenger Bag',
    category: 'Bags',
    description: 'Canvas messenger bag for work or school',
    image_url: 'https://images.pexels.com/photos/2422259/pexels-photo-2422259.jpeg',
    price: 59.99
  },
  {
    name: 'Tote Bag',
    category: 'Bags',
    description: 'Eco-friendly canvas tote bag',
    image_url: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg',
    price: 24.99
  },
  {
    name: 'Hiking Backpack',
    category: 'Bags',
    description: '50L hiking backpack with rain cover',
    image_url: 'https://images.pexels.com/photos/2681683/pexels-photo-2681683.jpeg',
    price: 149.99
  },
  {
    name: 'Crossbody Bag',
    category: 'Bags',
    description: 'Small leather crossbody bag',
    image_url: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg',
    price: 49.99
  },
  {
    name: 'Laptop Sleeve',
    category: 'Bags',
    description: 'Protective laptop sleeve 15 inch',
    image_url: 'https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg',
    price: 29.99
  }
];

async function seedDatabase() {
  console.log('Starting database seeding...');

  try {
    // Check existing products
    const { data: existingProducts, error: checkError } = await supabase
      .from('products')
      .select('id, name')
      .limit(5);

    if (checkError) {
      console.error('Error checking existing products:', checkError);
      throw checkError;
    }

    console.log(`Found ${existingProducts?.length || 0} existing products in database`);
    
    if (existingProducts && existingProducts.length > 0) {
      console.log('Sample existing products:', existingProducts.map(p => p.name));
      console.log('\nDatabase already contains products.');
      console.log('To force re-seed, delete existing products first or modify this script.');
      return;
    }

    console.log('No products found. Inserting sample products...');
    
    const { data, error } = await supabase
      .from('products')
      .insert(sampleProducts)
      .select();

    if (error) {
      console.error('Error seeding database:', error);
      throw error;
    }

    console.log(`✅ Successfully added ${data?.length || 0} products to the database!`);
  } catch (error) {
    console.error('Failed to seed database:', error);
    throw error;
  }
}

seedDatabase();
