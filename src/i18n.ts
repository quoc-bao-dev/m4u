import { getRequestConfig } from 'next-intl/server';
import { locales, defaultLocale } from './locale/config';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default getRequestConfig(async ({ locale }): Promise<any> => {
  // Validate that the incoming locale parameter is valid
  if (!locale || !locales.includes(locale as (typeof locales)[number])) {
    // Use default locale if locale is undefined or invalid
    locale = defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../public/locale/${locale}.json`)).default,
  };
});
