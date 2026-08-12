import { defineMiddleware } from 'astro:middleware';
import type { MiddlewareHandler } from 'astro';
import { createClient } from '@supabase/supabase-js';

const protectedRoutes = ['/events-approval'];

export const onRequest: MiddlewareHandler = async (context, next) => {
  const { pathname } = new URL(context.request.url);

  const isStaticRoute =
    pathname.startsWith('/_astro/') ||
    pathname.startsWith('/api/') ||
    pathname === '/' ||
    pathname.startsWith('/events') ||
    pathname === '/about' ||
    pathname === '/contact' ||
    pathname.startsWith('/diy-guides') ||
    pathname.startsWith('/local-orgs') ||
    pathname === '/timeline' ||
    pathname === '/event-submission' ||
    /\.(js|css|svg|png|jpg|webp|ico)$/.test(pathname);

  if (isStaticRoute) {
    return next();
  }

  // Only create Supabase client for non-static routes
  const supabase = createClient(
    import.meta.env.PUBLIC_SUPABASE_URL,
    import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
    { global: { headers: { Authorization: context.request.headers.get('cookie') || '' } } }
  );

  try {
    const { data } = await supabase.auth.getSession();
    const session = data.session;

    if (!session && protectedRoutes.some(route => pathname.startsWith(route))) {
      return context.redirect('/events-approval/login');
    }

    if (session?.user?.email) {
      context.locals.user = {
        id: session.user.id,
        email: session.user.email,
      };
    } else {
      context.locals.user = null;
    }
  } catch (error) {
    console.error('Session restoration failed:', error);

    if (protectedRoutes.some(route => pathname.startsWith(route))) {
      return context.redirect('/events-approval/login');
    }

    context.locals.user = null;
  }

  return next();
};
