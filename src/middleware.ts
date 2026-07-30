import { defineMiddleware } from 'astro:middleware';
import { supabase } from './lib/supabase';

export const onRequest = defineMiddleware(async (context, next) => {
  const { request, redirect } = context;
  const url = new URL(request.url);

  // Allow auth callback without session
  if (url.pathname === '/auth/callback') {
    return next();
  }

  // Allow login page
  if (url.pathname === '/events-approval/login') {
    return next();
  }

  // Protect /events-approval routes
  if (url.pathname.startsWith('/events-approval')) {
    // Get session from Supabase
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return redirect('/events-approval/login');
    }

    // Verify user is in authorized_users table
    const { data: authorized, error } = await supabase
      .from('authorized_users')
      .select('id, email, is_active')
      .eq('email', session.user.email)
      .eq('is_active', true)
      .single();

    if (error || !authorized) {
      console.log('❌ User not authorized:', session.user.email);
      return redirect('/events-approval/login');
    }

    console.log('✅ User authorized:', session.user.email);
  }

  return next();
});
