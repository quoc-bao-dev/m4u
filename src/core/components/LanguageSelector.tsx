'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { locales, localeNames, defaultLocale } from '@/locale/config'

interface LanguageSelectorProps {
  isOpen: boolean
  onClose: () => void
}

export default function LanguageSelector({
  isOpen,
  onClose,
}: LanguageSelectorProps) {
  const [selectedLocale, setSelectedLocale] = useState<string>('')
  const router = useRouter()
  const pathname = usePathname()

  const handleLanguageSelect = (locale: string) => {
    setSelectedLocale(locale)

    // Lưu preference vào localStorage
    localStorage.setItem('user-locale-preference', locale)

    // Redirect đến locale được chọn
    const newPath = pathname.replace(/^\/[^\/]+/, `/${locale}`)
    router.replace(newPath)

    onClose()
  }

  const handleClose = () => {
    // Nếu người dùng đóng mà không chọn, sử dụng default locale
    if (!selectedLocale) {
      localStorage.setItem('user-locale-preference', 'skip')
      router.replace(`/${defaultLocale}`)
    }
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md mx-4 text-center">
        <h3 className="text-lg font-semibold mb-4">Chọn ngôn ngữ của bạn</h3>
        <p className="text-greyscale-600 mb-6">
          Vui lòng chọn ngôn ngữ bạn muốn sử dụng trên trang web này.
        </p>

        <div className="space-y-3">
          {locales.map((locale) => (
            <button
              key={locale}
              onClick={() => handleLanguageSelect(locale)}
              className={`w-full p-4 rounded-full border-2 transition-colors ${
                selectedLocale === locale
                  ? 'border-pink-500 bg-pink-50 text-pink-700'
                  : 'border-greyscale-200 hover:border-greyscale-300 hover:bg-greyscale-50'
              }`}
            >
              <div className="font-medium">{localeNames[locale]}</div>
              <div className="text-sm text-greyscale-500 capitalize">
                {locale}
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={handleClose}
          className="mt-4 text-greyscale-500 hover:text-greyscale-700 underline text-sm font-medium"
        >
          Đóng
        </button>
      </div>
    </div>
  )
}
