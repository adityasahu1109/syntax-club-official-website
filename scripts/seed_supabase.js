import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Very basic .env parser
function loadEnv() {
  const envPath = path.resolve(__dirname, '../.env.local');
  if (!fs.existsSync(envPath)) {
    console.error('.env.local not found. Please create it first.');
    process.exit(1);
  }
  const fileContent = fs.readFileSync(envPath, 'utf8');
  const lines = fileContent.split('\n');
  lines.forEach(line => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      const key = match[1];
      let value = match[2] || '';
      // Remove surrounding quotes if present
      value = value.replace(/^(['"])(.*)\1$/, '$2');
      process.env[key] = value;
    }
  });
}

loadEnv();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function seedData(tableName, jsonFileName) {
  try {
    const filePath = path.resolve(__dirname, `../src/data/${jsonFileName}`);
    if (!fs.existsSync(filePath)) {
      console.warn(`Skipping ${tableName}: ${jsonFileName} not found.`);
      return;
    }
    
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    if (!data || data.length === 0) {
       console.log(`${tableName} data is empty.`);
       return;
    }

    // Clean up data objects to match the database schema
    const cleanData = data.map((item) => {
      const cleanItem = { ...item };
      delete cleanItem.id;
      delete cleanItem.created_at;

      if (tableName === 'alumni') {
        delete cleanItem.company;
        delete cleanItem.role;
        delete cleanItem.batch;
      }
      if (tableName === 'milestones') {
        delete cleanItem.color;
        delete cleanItem.order_id;
      }
      if (tableName === 'team') {
        delete cleanItem.order_id;
      }
      return cleanItem;
    });

    console.log(`Seeding ${cleanData.length} records into '${tableName}'...`);

    const { error } = await supabase.from(tableName).insert(cleanData);
    
    if (error) {
      console.error(`Error seeding ${tableName}:`, error.message);
    } else {
      console.log(`Successfully seeded '${tableName}'.`);
    }
  } catch (err) {
    console.error(`Unexpected error while seeding ${tableName}:`, err.message);
  }
}

async function main() {
  console.log('Starting data migration to Supabase...');
  
  await seedData('projects', 'projects.json');
  await seedData('team', 'team.json');
  await seedData('events', 'events.json');
  await seedData('blogs', 'blogs.json');
  await seedData('alumni', 'alumni.json');
  await seedData('milestones', 'milestones.json');
  
  console.log('Migration completed!');
}

main();
