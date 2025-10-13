'use client'

import { useState } from 'react'
import { locales, localeNames } from '@/locale/config'
import { LANGUAGE_SELECTOR_CONFIG } from '@/core/config/languageSelector'

interface LanguageSelectorProps {
  isOpen: boolean
  onClose: () => void
  onLanguageSelect: (locale: string) => void
  onSkip: () => void
}

export default function LanguageSelector({
  isOpen,
  onClose,
  onLanguageSelect,
  onSkip,
}: LanguageSelectorProps) {
  const [selectedLocale, setSelectedLocale] = useState<string>('')

  const handleLanguageSelect = (locale: string) => {
    setSelectedLocale(locale)
    onLanguageSelect(locale)
  }

  const handleClose = () => {
    // Nếu người dùng đóng mà không chọn, skip
    if (!selectedLocale) {
      onSkip()
    } else {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center"
      style={{ zIndex: LANGUAGE_SELECTOR_CONFIG.zIndex }}
    >
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

        <div className="mt-4 flex gap-3 justify-center">
          <button
            onClick={handleClose}
            className="text-greyscale-500 hover:text-greyscale-700 underline text-sm font-medium"
          >
            Đóng
          </button>
          <button
            onClick={onSkip}
            className="text-greyscale-500 hover:text-greyscale-700 underline text-sm font-medium"
          >
            Bỏ qua
          </button>
        </div>
      </div>
    </div>
  )
}
