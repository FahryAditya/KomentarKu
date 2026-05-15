const fs = require('fs');
const path = require('path');

// Manual .env.local parsing
const envPath = path.join(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const [key, ...valueParts] = line.split('=');
  if (key && valueParts.length > 0) {
    let value = valueParts.join('=').trim();
    if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
    env[key.trim()] = value;
  }
});

const url = env.NEXT_PUBLIC_SUPABASE_URL;
const key = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

async function check() {
  console.log('Checking table via REST API...');
  try {
    const response = await fetch(`${url}/rest/v1/comments?select=*&limit=1`, {
      headers: {
        'apikey': key,
        'Authorization': `Bearer ${key}`
      }
    });
    
    if (response.ok) {
      console.log('SUCCESS: Table "comments" exists and is accessible!');
      const data = await response.json();
      console.log('Data:', data);
    } else {
      const error = await response.json();
      console.error('FAILED:', response.status, response.statusText);
      console.error(JSON.stringify(error, null, 2));
    }
  } catch (err) {
    console.error('FETCH ERROR:', err.message);
  }
}

check();
