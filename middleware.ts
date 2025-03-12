import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  const publicPaths = ['/sign-in', '/sign-up', '/favicon.ico'];

  const ignorePaths = ['/_next', '/static', '/api'];

  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path));

  const isIgnoredPath = ignorePaths.some((path) => pathname.startsWith(path));

  if (isIgnoredPath) {
    return NextResponse.next();
  }

  if (isPublicPath) {
    if (token && ['/sign-in', '/sign-up'].includes(pathname)) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next|static|sign-in|sign-up|favicon.ico).*)',
  ],
};