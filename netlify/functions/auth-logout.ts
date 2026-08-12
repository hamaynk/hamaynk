export const prerender = false;

import type { Handler, HandlerResponse } from '@netlify/functions';

export const handler: Handler = async (event): Promise<HandlerResponse> => {
  return {
    statusCode: 302,
    headers: {
      Location: '/events-approval/login',
    },
    multiValueHeaders: {
      'Set-Cookie': [
        'sb-access-token=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0',
        'sb-refresh-token=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0',
      ],
    },
  } as HandlerResponse;
};
