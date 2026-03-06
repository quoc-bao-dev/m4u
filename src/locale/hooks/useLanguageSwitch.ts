'use client'

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
    // Cập nhật cookie NEXT_LOCALE để nhớ lựa chọn ngôn ngữ của người dùng
    try {
      const oneYearInSeconds = 60 * 60 * 24 * 365
      document.cookie =
        `NEXT_LOCALE=${targetLocale}; Max-Age=${oneYearInSeconds}; Path=/; SameSite=Lax` +
        (typeof window !== 'undefined' && window.location.protocol === 'https:'
          ? '; Secure'
          : '')
    } catch (err) {
      // noop - nếu cookie không set được, vẫn tiếp tục điều hướng
    }

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
