const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Manual .env.local parsing
const envPath = path.join(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const [key, ...valueParts] = line.split('=');
  if (key && valueParts.length > 0) {
    let value = valueParts.join('=').trim();
    // Remove quotes if present
    if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
    env[key.trim()] = value;
  }
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('Testing connection with:');
console.log('URL:', supabaseUrl);
console.log('Key:', supabaseAnonKey ? 'EXISTS' : 'MISSING');

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing environment variables in .env.local!');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: false },
  realtime: { enabled: false }
});

async function test() {
  console.log('Fetching comments...');
  const { data, error } = await supabase.from('comments').select('*').limit(1);
  
  if (error) {
    console.error('Connection Test Failed:');
    console.error(JSON.stringify(error, null, 2));
  } else {
    console.log('Connection Test Success!');
    console.log('Sample Data:', data);
  }
}

test();
