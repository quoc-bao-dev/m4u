import { MainLayout } from '@/core/components'
import { locales } from '@/locale/config'
import { AppProvider } from '@/provider'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  // Pass locale explicitly to getMessages
  const messages = await getMessages({ locale })

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <AppProvider>
        <MainLayout>{children}</MainLayout>
      </AppProvider>
    </NextIntlClientProvider>
  )
}
