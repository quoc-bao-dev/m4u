import { getRequestConfig } from 'next-intl/server'
import { createTranslator } from 'next-intl'

// Time format function with i18n support
export const formatNotificationTime = (timestamp: Date): string => {
  const now = new Date()
  const diffInMs = now.getTime() - timestamp.getTime()
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

  // We cannot use hooks here; instead read navigator language if available
  // and fallback to 'vi' if not set. The project routes already set locale,
  // but for utility usage we'll try from document or default.
  let locale: 'en' | 'vi' | 'kr' = 'vi'
  if (typeof document !== 'undefined') {
    const htmlLang = document.documentElement.lang as
      | 'en'
      | 'vi'
      | 'kr'
      | undefined
    if (htmlLang === 'en' || htmlLang === 'vi' || htmlLang === 'kr') {
      locale = htmlLang
    }
  }

  const dict: Record<string, (n?: number) => string> = {
    now: () => ({ en: 'Just now', vi: 'Vừa xong', kr: '방금 전' }[locale]),
    minutes: (n = 0) =>
      ({ en: `${n} minutes ago`, vi: `${n} phút trước`, kr: `${n}분 전` }[
        locale
      ]),
    hours: (n = 0) =>
      ({ en: `${n} hours ago`, vi: `${n} giờ trước`, kr: `${n}시간 전` }[
        locale
      ]),
    days: (n = 0) =>
      ({ en: `${n} days ago`, vi: `${n} ngày trước`, kr: `${n}일 전` }[locale]),
  }

  if (diffInMinutes < 1) return dict.now()
  if (diffInMinutes < 60) return dict.minutes(diffInMinutes)
  if (diffInHours < 24) return dict.hours(diffInHours)
  return dict.days(diffInDays)
}
