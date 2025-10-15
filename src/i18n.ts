import { getRequestConfig } from 'next-intl/server'
import { locales, defaultLocale } from './locale/config'

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming locale parameter is valid
  if (!locale || !locales.includes(locale as (typeof locales)[number])) {
    locale = defaultLocale
  }

  return {
    locale,
    messages: (await import(`../public/locale/${locale}.json`)).default,
  }
})
