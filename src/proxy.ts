import createMiddleware from 'next-intl/middleware';
import {withAuth} from 'next-auth/middleware';
import {NextRequest} from 'next/server';
import {routing} from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

const authMiddleware = withAuth(
  // Note that this callback is only invoked if the `authorized` callback has returned `true` 
  // and not before.
  function onSuccess(req) {
    return; // Bypass intlMiddleware for admin paths
  },
  {
    callbacks: {
      authorized: ({token}) => token != null
    },
    pages: {
      signIn: '/auth/login'
    }
  }
);

export default function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  
  if (pathname.startsWith('/api/')) {
    return;
  }
  
  const isAdminPath = pathname === '/admin' || pathname.startsWith('/admin/');
  const isAuthPath = pathname === '/auth' || pathname.startsWith('/auth/');

  if (isAdminPath) {
    return (authMiddleware as any)(req);
  }

  if (isAuthPath) {
    return; // Let it fall through
  }

  // All other pages are public and handled by next-intl
  return intlMiddleware(req);
}

export const config = {
  matcher: [
    '/((?!api|_next|_static|_vercel|img|fonts|.*\\..*).*)',
    '/'
  ]
};
