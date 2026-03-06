import { defaultLocale, locales } from '@/locale/config'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

// Root page - redirect to default locale
export default async function RootPage() {
  const cookieStore = await cookies()
  const savedLocale = cookieStore.get('NEXT_LOCALE')?.value
  const isSupported =
    savedLocale && (locales as readonly string[]).includes(savedLocale)

  if (isSupported) {
    redirect(`/${savedLocale}`)
  }

  // No saved or unsupported locale → redirect to default with a flag to show selector
  // redirect(`/${defaultLocale}?selectLanguage=1`)
  redirect(`/${defaultLocale}`)
}
