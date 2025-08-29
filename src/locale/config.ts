import type { LocalePrefix } from 'next-intl/routing';

export const locales = ['vi', 'en', 'ko'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'vi';

export const localePrefix: LocalePrefix<typeof locales> = 'always';

export const localeNames = {
  vi: 'Tiếng Việt',
  en: 'English',
  ko: '한국어',
} as const;
