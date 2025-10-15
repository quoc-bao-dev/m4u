'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { defaultLocale } from '@/locale/config'
import { LANGUAGE_SELECTOR_CONFIG } from '@/core/config/languageSelector'

export function useLanguageSelector() {
  const [isOpen, setIsOpen] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Khởi tạo ngay lập tức nếu được cấu hình
  useEffect(() => {
    if (
      LANGUAGE_SELECTOR_CONFIG.showImmediately &&
      LANGUAGE_SELECTOR_CONFIG.enabled
    ) {
      setIsInitialized(true)
    }
  }, [])

  useEffect(() => {
    // Kiểm tra xem tính năng có được bật không
    if (!LANGUAGE_SELECTOR_CONFIG.enabled) {
      setIsInitialized(true)
      return
    }

    const checkAndShowLanguageSelector = () => {
      // Ưu tiên query flag để bật popup ngay (sau redirect từ "/")
      const shouldForceOpen = searchParams?.get('selectLanguage') === '1'

      // Nếu URL đã có prefix locale (/vi, /en, /kr, /th, /cn)
      // và KHÔNG có flag ép mở, thì không bật popup
      if (
        !shouldForceOpen &&
        (pathname?.startsWith('/vi') ||
          pathname?.startsWith('/en') ||
          pathname?.startsWith('/kr') ||
          pathname?.startsWith('/th') ||
          pathname?.startsWith('/cn'))
      ) {
        setIsInitialized(true)
        return
      }

      // Kiểm tra localStorage để xem người dùng đã chọn ngôn ngữ chưa
      const userLocalePreference = localStorage.getItem(
        'user-locale-preference'
      )

      // Nếu chưa có preference hoặc preference là 'skip' và cho phép hiển thị sau skip
      const shouldShow =
        shouldForceOpen ||
        !userLocalePreference ||
        (userLocalePreference === 'skip' &&
          LANGUAGE_SELECTOR_CONFIG.showAfterSkip)

      if (shouldShow) {
        // Nếu showImmediately = true, hiển thị ngay lập tức bất kể trang nào
        if (LANGUAGE_SELECTOR_CONFIG.showImmediately) {
          setIsOpen(true)
        } else {
          // Nếu có flag, mở ngay; nếu không, chỉ hiển thị khi ở trang gốc
          if (shouldForceOpen) {
            setIsOpen(true)
          } else {
            const isAtRoot =
              pathname === '/' ||
              (!pathname.startsWith('/vi') &&
                !pathname.startsWith('/en') &&
                !pathname.startsWith('/kr') &&
                !pathname.startsWith('/th') &&
                !pathname.startsWith('/cn'))

            if (isAtRoot) {
              setIsOpen(true)
            }
          }
        }
      }
    }

    // Nếu showImmediately = true, chạy ngay lập tức
    if (LANGUAGE_SELECTOR_CONFIG.showImmediately) {
      checkAndShowLanguageSelector()
    } else {
      // Logic cũ với delay
      if (LANGUAGE_SELECTOR_CONFIG.delay > 0) {
        const timer = setTimeout(
          checkAndShowLanguageSelector,
          LANGUAGE_SELECTOR_CONFIG.delay
        )
        return () => clearTimeout(timer)
      } else {
        checkAndShowLanguageSelector()
      }
    }

    setIsInitialized(true)
  }, [pathname, searchParams])

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleLanguageSelect = (locale: string) => {
    // Lưu preference vào localStorage
    localStorage.setItem('user-locale-preference', locale)

    // Redirect đến locale được chọn
    const newPath = pathname.replace(/^\/[^\/]+/, `/${locale}`)
    router.replace(newPath)

    setIsOpen(false)
  }

  const handleSkip = () => {
    // Đánh dấu là đã skip và redirect đến default locale
    localStorage.setItem('user-locale-preference', 'skip')
    router.replace(`/${defaultLocale}`)
    setIsOpen(false)
  }

  return {
    isOpen,
    isInitialized,
    handleClose,
    handleLanguageSelect,
    handleSkip,
  }
}
