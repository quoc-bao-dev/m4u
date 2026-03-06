'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import { locales, localeNames } from '@/locale/config'
import { LANGUAGE_SELECTOR_CONFIG } from '@/core/config/languageSelector'
import { useGetLanguageCurrent } from '@/services/language/queries'

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
  const { data: languageData } = useGetLanguageCurrent()

  type LanguageItem = { code: string; name_website?: string; flagUrl?: string }

  const languages: LanguageItem[] = useMemo(() => {
    // Expecting API to return array like [{ code: 'vi', name: 'Tiếng Việt', flagUrl?: string }]
    // Fallback to local config if API not available
    const apiItems: LanguageItem[] = Array.isArray(languageData)
      ? languageData
      : []

    if (apiItems.length > 0) return apiItems

    return (locales as unknown as string[]).map((code) => ({
      code,
      name_website: (localeNames as Record<string, string>)[code] ?? code,
    }))
  }, [languageData])

  const getFlagContent = (code: string, flagUrl?: string) => {
    if (flagUrl) {
      return (
        <Image
          src={flagUrl}
          alt={`${code} flag`}
          width={20}
          height={14}
          className="rounded-sm object-cover"
        />
      )
    }

    // Try local images for known codes
    const localFlagMap: Record<string, string> = {
      vi: '/image/flag/vi.png',
      en: '/image/flag/us.png',
      kr: '/image/flag/kr.png',
    }
    const localSrc = localFlagMap[code]
    if (localSrc) {
      return (
        <Image
          src={localSrc}
          alt={`${code} flag`}
          width={20}
          height={14}
          className="rounded-sm object-cover"
        />
      )
    }

    // Emoji fallback
    const emojiMap: Record<string, string> = {
      vi: '🇻🇳',
      en: '🇺🇸',
      kr: '🇰🇷',
      th: '🇹🇭',
      cn: '🇨🇳',
      zh: '🇨🇳',
    }
    return (
      <span className="text-base leading-none">{emojiMap[code] ?? '🏳️'}</span>
    )
  }

  const handleLanguageSelect = (locale: string) => {
    setSelectedLocale(locale)
    try {
      // Set cookie to persist language selection across sessions
      document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=${
        60 * 60 * 24 * 365
      }; samesite=lax`
    } catch (e) {
      // no-op
    }
    onLanguageSelect(locale)
  }

  const handleClose = () => {
    // Nếu người dùng đóng mà không chọn, skip
    try {
      // Set cookie to persist language selection across sessions
      document.cookie = `NEXT_LOCALE=${'en'}; path=/; max-age=${
        60 * 60 * 24 * 365
      }; samesite=lax`
    } catch (e) {
      // no-op
    }
    handleLanguageSelect('en')
    // if (!selectedLocale) {
    //   onSkip()
    // } else {
    //   onClose()
    // }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center"
      style={{ zIndex: LANGUAGE_SELECTOR_CONFIG.zIndex }}
    >
      <div className="bg-white rounded-lg p-6 max-w-md mx-4 text-center">
        <h3 className="text-lg font-semibold mb-4">Select your language</h3>
        <p className="text-greyscale-600 mb-6">
          Please choose the language you want to use on this website.
        </p>

        <div className="space-y-3">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageSelect(lang.code)}
              className={`w-full py-2 px-4 rounded-full border-2 transition-colors flex items-center justify-between gap-3 ${
                selectedLocale === lang.code
                  ? 'border-pink-500 bg-pink-50 text-pink-700'
                  : 'border-greyscale-200 hover:border-greyscale-300 hover:bg-greyscale-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-[20px] h-[14px] flex items-center justify-center">
                  {getFlagContent(lang.code, (lang as LanguageItem).flagUrl)}
                </div>
                <div className="font-medium">
                  {lang.name_website ??
                    (localeNames as Record<string, string>)[lang.code] ??
                    lang.code}
                </div>
              </div>
              <div className="text-sm text-greyscale-500 uppercase">
                {lang.code}
              </div>
            </button>
          ))}
        </div>

        <div className="mt-4 flex gap-3 justify-center">
          <button
            onClick={handleClose}
            className="text-greyscale-500 hover:text-greyscale-700 underline text-sm font-medium"
          >
            Close
          </button>
          {/* <button
            onClick={onSkip}
            className="text-greyscale-500 hover:text-greyscale-700 underline text-sm font-medium"
          >
            Bỏ qua
          </button> */}
        </div>
      </div>
    </div>
  )
}
