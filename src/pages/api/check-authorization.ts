export const prerender = false;

import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

export const POST: APIRoute = async ({ request }) => {
  console.log('🔥 check-authorization endpoint called');
  console.log('📥 Request method:', request.method);
  console.log('📥 Request content-type:', request.headers.get('content-type'));

  if (request.method !== 'POST') {
    console.error('❌ Invalid method:', request.method);
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
    });
  }

  try {
    const text = await request.text();
    console.log('📝 Raw request body:', text);

    if (!text) {
      console.error('❌ Request body is empty');
      return new Response(
        JSON.stringify({ error: 'Request body is empty', authorized: false }),
        { status: 400 }
      );
    }

    const body = JSON.parse(text);
    const email = body?.email;

    console.log('📧 Email from request:', email);
    console.log('🔑 SUPABASE_URL exists:', !!import.meta.env.SUPABASE_URL);
    console.log('🔑 SUPABASE_SERVICE_ROLE_KEY exists:', !!import.meta.env.SUPABASE_SERVICE_ROLE_KEY);

    if (!email) {
      console.error('❌ No email in request body');
      return new Response(
        JSON.stringify({ error: 'Email is required', authorized: false }),
        { status: 400 }
      );
    }

    if (!import.meta.env.SUPABASE_URL || !import.meta.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error('❌ Missing Supabase environment variables');
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        { status: 500 }
      );
    }

    console.log('🚀 Creating Supabase admin client...');
    const supabaseAdmin = createClient(
      import.meta.env.SUPABASE_URL,
      import.meta.env.SUPABASE_SERVICE_ROLE_KEY
    );

    console.log('📊 Querying authorized_users table for:', email.toLowerCase());
    const { data: authorized, error } = await supabaseAdmin
      .from('authorized_users')
      .select('id, is_active, email')
      .eq('email', email.toLowerCase())
      .single();

    console.log('📋 Query response:', { authorized, error });

    if (error) {
      console.error('🚨 Supabase error:', error.code, error.message);
      return new Response(
        JSON.stringify({
          authorized: false,
          error: error.message,
          code: error.code
        }),
        { status: 200 }
      );
    }

    if (!authorized) {
      console.log('❌ No user found with email:', email);
      return new Response(
        JSON.stringify({ authorized: false }),
        { status: 200 }
      );
    }

    if (!authorized.is_active) {
      console.log('❌ User found but not active:', authorized.email);
      return new Response(
        JSON.stringify({ authorized: false, reason: 'inactive' }),
        { status: 200 }
      );
    }

    console.log('✅ Authorization successful:', authorized.email);
    return new Response(
      JSON.stringify({ authorized: true }),
      { status: 200 }
    );
  } catch (err) {
    console.error('🚨 Catch error:', err);
    console.error('Error type:', err instanceof Error ? err.message : String(err));
    console.error('Full error:', err);

    return new Response(
      JSON.stringify({
        error: 'Server error',
        message: err instanceof Error ? err.message : String(err)
      }),
      { status: 500 }
    );
  }
};
