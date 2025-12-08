import createMiddleware from 'next-intl/middleware'
import { locales, defaultLocale, localePrefix } from './src/locale/config'
import { NextRequest } from 'next/server'

const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale,

  // The `localePrefix` setting controls whether a locale prefix is shown for the default locale
  localePrefix,

  // Always redirect to default locale for root path
  alternateLinks: false,
})

export default function proxy(request: NextRequest) {
  // Handle root path explicitly for better iPhone compatibility
  if (request.nextUrl.pathname === '/') {
    const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value
    const isSupported =
      cookieLocale && locales.includes(cookieLocale as (typeof locales)[number])

    if (isSupported) {
      return Response.redirect(new URL(`/${cookieLocale}`, request.url), 302)
    }

    // No or unsupported cookie → go to default locale and trigger language selector
    return Response.redirect(
      // ?selectLanguage=1
      new URL(`/${defaultLocale}`, request.url),
      302
    )
  }

  return intlMiddleware(request)
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/((?!api|_next|_vercel|.*\\..*).*)'],
}
