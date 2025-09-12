'use client'

import { useLanguageSwitch } from '@/locale/hooks/useLanguageSwitch'
import { useGetLanguageCurrent } from '@/services/language/queries'
import Image from 'next/image'
import { useEffect, useMemo, useRef, useState } from 'react'

const LanguageSwitcher = () => {
  const { currentLocale, localeNames, switchLanguage } = useLanguageSwitch()
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)

  const { data: languageCurrent } = useGetLanguageCurrent()
  
  const currentLabel = useMemo(
    () => localeNames[currentLocale],
    [currentLocale, localeNames]
  )

  const handleSelect = (language: any) => {
    switchLanguage(language.code)
    setIsOpen(false)
  }

  useEffect(() => {
    if (!isOpen) return

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null
      if (
        containerRef.current &&
        target &&
        !containerRef.current.contains(target)
      ) {
        setIsOpen(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('touchstart', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('touchstart', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  // Get current language data from API
  const currentLanguageData = useMemo(() => {
    return languageCurrent?.find((lang: any) => lang.code === currentLocale)
  }, [languageCurrent, currentLocale])

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className="inline-flex items-center gap-1 md:gap-3 rounded-full md:px-4 py-2 text-gray-800 hover:bg-gray-50"
      >
        <span className="hidden md:block text-base md:text-lg font-medium">
          {currentLanguageData?.name_website || currentLabel}
        </span>
        <Image
          src={currentLanguageData?.image || '/image/flag/image-01.png'}
          alt={`${currentLanguageData?.name || currentLabel} flag`}
          width={200}
          height={200}
          className="rounded-full object-cover size-[28px] md:size-[32px]"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className={`size-5 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.25 8.29a.75.75 0 01-.02-1.08z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <ul className="absolute right-0 mt-2 w-48 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
          {languageCurrent?.map((lang: any) => (
            <li key={lang.id}>
              <button
                type="button"
                onClick={() => handleSelect(lang)}
                className={`flex w-full items-center justify-between px-4 py-2 text-left hover:bg-gray-50 ${
                  currentLocale === lang.code ? 'bg-gray-50 font-semibold' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <Image
                    src={lang?.image}
                    alt={lang?.name}
                    width={20}
                    height={20}
                    className="rounded-full object-cover"
                  />
                  <span>{lang?.name_website}</span>
                </div>
                {currentLocale === lang.code && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="size-5 text-emerald-600"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 5.29a1 1 0 010 1.414l-7.25 7.25a1 1 0 01-1.414 0l-3.25-3.25a1 1 0 111.414-1.414L8.75 11.83l6.543-6.54a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default LanguageSwitcher
