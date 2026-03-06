'use client'

import { useEffect } from 'react'

type Props = {
  locale: string
}

export default function LocaleCookieSetter({ locale }: Props) {
  useEffect(() => {
    try {
      if (!locale) return
      const oneYearInSeconds = 60 * 60 * 24 * 365
      const isHttps =
        typeof window !== 'undefined' && window.location.protocol === 'https:'
      const secureAttr = isHttps ? '; Secure' : ''

      // Only set if different to avoid unnecessary writes
      const existing = document.cookie
        .split(';')
        .map((c) => c.trim())
        .find((c) => c.startsWith('NEXT_LOCALE='))
      const existingValue = existing?.split('=')[1]
      if (existingValue === locale) return

      document.cookie = `NEXT_LOCALE=${locale}; Max-Age=${oneYearInSeconds}; Path=/; SameSite=Lax${secureAttr}`
    } catch (_err) {
      // no-op on cookie write failure
    }
  }, [locale])

  return null
}
