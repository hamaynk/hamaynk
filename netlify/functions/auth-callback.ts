export const prerender = false;

import type { Handler, HandlerResponse } from '@netlify/functions';

require('dotenv').config({ path: '.env.local' });

const handler: Handler = async (event): Promise<HandlerResponse> => {
  console.log('✅ Auth callback invoked');
  console.log(`Event query string parameters:`, event.queryStringParameters);
  console.log(`Event raw query string:`, event.rawQuery);

  const { code } = event.queryStringParameters || {};

  if (!code) {
    return {
      statusCode: 400,
      body: 'No code provided',
    };
  }

  try {
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(
      process.env.PUBLIC_SUPABASE_URL!,
      process.env.PUBLIC_SUPABASE_ANON_KEY!
    );

    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error('Token exchange error:', error.message);
      return {
        statusCode: 400,
        body: `Authentication failed: ${error.message}`,
      };
    }

    console.log('✅ Session established');

    const finalRedirect = '/events-approval';

    return {
      statusCode: 302,
      multiValueHeaders: {
        'Set-Cookie': [
          `sb-access-token=${data.session.access_token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=3600`,
          `sb-refresh-token=${data.session.refresh_token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=604800`,
        ],
      },
      headers: {
        Location: finalRedirect,
      },
      body: '',
    };
  } catch (error) {
    console.error('Callback error:', error);
    return {
      statusCode: 500,
      body: 'Internal server error',
    };
  }
};

export { handler };
