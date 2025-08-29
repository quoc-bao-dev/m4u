'use client';

import { NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';

interface LocaleProviderProps {
  children: ReactNode;
  messages: Record<string, unknown>;
  locale: string;
}

export function LocaleProvider({
  children,
  messages,
  locale,
}: LocaleProviderProps) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
