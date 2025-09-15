import { useLocale } from 'next-intl'
import { usePathname } from 'next/navigation'
import { useRouter } from '../navigation'
import { locales, type Locale, localeNames } from '../config'

export enum Language {
  VI = 'vi',
  EN = 'en',
  KR = 'kr',
}

export function useLanguageSwitch() {
  const locale = useLocale() as Locale
  const pathname = usePathname()
  const router = useRouter()

  // Hàm chuyển đổi ngôn ngữ
  const switchLanguage = (targetLocale: Language | Locale) => {
    // Lấy path hiện tại mà không có locale prefix
    const currentPath = pathname.replace(`/${locale}`, '') || '/'

    // Navigate đến path mới với locale mới
    router.push(currentPath, { locale: targetLocale })
  }

  // Trả về current locale
  const currentLocale = locale

  return {
    switchLanguage,
    currentLocale,
    availableLocales: locales,
    localeNames,
  }
}
