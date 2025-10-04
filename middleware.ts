import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale, localePrefix } from './src/locale/config';
import { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale,

  // The `localePrefix` setting controls whether a locale prefix is shown for the default locale
  localePrefix,
  
  // Always redirect to default locale for root path
  alternateLinks: false,
});

export default function middleware(request: NextRequest) {
  // Handle root path explicitly for better iPhone compatibility
  if (request.nextUrl.pathname === '/') {
    return Response.redirect(new URL(`/${defaultLocale}`, request.url), 302);
  }
  
  return intlMiddleware(request);
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/((?!api|_next|_vercel|.*\\..*).*)'],
};
