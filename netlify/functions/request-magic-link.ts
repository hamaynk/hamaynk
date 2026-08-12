export const prerender = false;

import type { Handler } from '@netlify/functions';

require('dotenv').config({ path: '.env.local' });

const handler: Handler = async (event) => {
  console.log('✅ 1. Magic link function invoked');

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { email } = JSON.parse(event.body || '{}');

    if (!email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Email is required' }),
      };
    }

    console.log(`✅ 2. Email parsed: ${email}`);

    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    console.log('✅ 3. Supabase client created with service role');

    const callbackUrl = `http://localhost:8888/.netlify/functions/auth-callback`;

    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: callbackUrl,
      },
    });

    if (error) {
      console.error(`❌ Magic link request failed: ${error.message}`);
      return {
        statusCode: 400,
        body: JSON.stringify({ error: error.message }),
      };
    }

    console.log(`✅ 4. Magic link sent to ${email}`);
    console.log(`Callback URL: ${callbackUrl}`);

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Magic link sent' }),
    };
  } catch (error) {
    console.error('Magic link request error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};

export { handler };
