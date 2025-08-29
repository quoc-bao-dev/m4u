import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale, localePrefix } from './src/locale/config';

export default createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale,

  // The `localePrefix` setting controls whether a locale prefix is shown for the default locale
  localePrefix,
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/((?!api|_next|_vercel|.*\\..*).*)'],
};
