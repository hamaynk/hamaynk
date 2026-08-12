export const prerender = false;

import type { Handler } from '@netlify/functions';

require('dotenv').config({ path: '.env.local' });

const handler: Handler = async (event) => {
  console.log('✅ 1. Function invoked');

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
    console.log('SUPABASE_URL:', process.env.SUPABASE_URL ? 'LOADED' : 'MISSING');
    console.log('SERVICE_ROLE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY ? 'LOADED' : 'MISSING');

    const { data, error } = await supabase
      .from('authorized_users')
      .select('email, is_active')
      .eq('email', email)
      .single();

    console.log('✅ 4. Query completed');
    console.log('Error:', error);
    console.log('Data:', data);

    if (error || !data) {
      console.log(`❌ User not found or error: ${error?.message || 'Unknown error'}`);
      return {
        statusCode: 401,
        body: JSON.stringify({ authorized: false, message: 'User not authorized' }),
      };
    }

    if (!data.is_active) {
      console.log(`❌ User ${email} is inactive`);
      return {
        statusCode: 403,
        body: JSON.stringify({ authorized: false, message: 'User account is inactive' }),
      };
    }

    console.log(`✅ 5. User authorized: ${email}`);
    return {
      statusCode: 200,
      body: JSON.stringify({ authorized: true, email: data.email }),
    };

  } catch (error) {
    console.error('Authorization check error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};

export { handler };
