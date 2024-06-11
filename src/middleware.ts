import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { DEFAULT_REDIRECT, PUBLIC_ROUTES, ROOT } from '@/lib/routes';

export async function middleware(req: NextRequest) {
	console.log('req', req);
	
  const token = await getToken({ req, secret: process.env.NEXT_PUBLIC_API_KEY });
  const { pathname } = req.nextUrl;

  console.log('Middleware: Pathname:', pathname);
  console.log('Middleware: Token:', token);

  const isAuthenticated = !!token;
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  if (isPublicRoute && isAuthenticated) {
    return NextResponse.redirect(new URL(DEFAULT_REDIRECT, req.url));
  }

  if (!isAuthenticated && !isPublicRoute) {
    return NextResponse.redirect(new URL(ROOT, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
