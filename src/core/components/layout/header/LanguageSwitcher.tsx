'use client'

import { useLanguageSwitch } from '@/locale/hooks/useLanguageSwitch'
import { useGetLanguageCurrent } from '@/services/language/queries'
import Image from 'next/image'
import { useEffect, useMemo, useRef, useState } from 'react'

type LanguageSwitcherSize = 'sm' | 'md' | 'lg'
type LanguageSwitcherPlacement = 'top' | 'bottom'

interface LanguageSwitcherProps {
  /** Kích thước hiển thị; 'md' giữ nguyên giao diện hiện tại */
  size?: LanguageSwitcherSize
  /** Vị trí popup so với nút */
  placement?: LanguageSwitcherPlacement
}

const LanguageSwitcher = ({
  size = 'md',
  placement = 'bottom',
}: LanguageSwitcherProps) => {
  const { currentLocale, localeNames, switchLanguage } = useLanguageSwitch()
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)

  const { data: languageCurrent } = useGetLanguageCurrent()

  // ----- Size styles (md giữ nguyên class gốc) -----
  const styles = useMemo(() => {
    const map: Record<
      LanguageSwitcherSize,
      {
        btnGap: string
        btnPadX: string
        btnPadY: string
        labelText: string
        flagSize: string
        chevronSize: string
        listWidth: string
        itemPad: string
        itemGap: string
        checkIconSize: string
      }
    > = {
      sm: {
        btnGap: 'gap-1',
        btnPadX: 'md:px-3',
        btnPadY: 'py-1.5',
        labelText: 'hidden md:block text-sm font-medium',
        flagSize: 'size-[24px] md:size-[28px]',
        chevronSize: 'size-4',
        listWidth: 'w-44',
        itemPad: 'px-3 py-1.5',
        itemGap: 'gap-2',
        checkIconSize: 'size-4',
      },
      md: {
        // KHÔNG thay đổi giao diện hiện tại
        btnGap: 'gap-1 md:gap-3',
        btnPadX: 'md:px-4',
        btnPadY: 'py-2',
        labelText: 'hidden md:block text-base md:text-lg font-medium',
        flagSize: 'size-[28px] md:size-[32px]',
        chevronSize: 'size-5',
        listWidth: 'w-48',
        itemPad: 'px-4 py-2',
        itemGap: 'gap-3',
        checkIconSize: 'size-5',
      },
      lg: {
        btnGap: 'gap-2 md:gap-4',
        btnPadX: 'md:px-5',
        btnPadY: 'py-2.5',
        labelText: 'hidden md:block text-lg md:text-xl font-medium',
        flagSize: 'size-[32px] md:size-[36px]',
        chevronSize: 'size-6',
        listWidth: 'w-56',
        itemPad: 'px-5 py-2.5',
        itemGap: 'gap-3.5',
        checkIconSize: 'size-6',
      },
    }
    return map[size]
  }, [size])

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
      if (event.key === 'Escape') setIsOpen(false)
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

  // ----- Popup placement classes -----
  const popupPositionClass =
    placement === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className={`inline-flex items-center ${styles.btnGap} rounded-full ${styles.btnPadX} ${styles.btnPadY} text-gray-800 hover:bg-gray-50`}
      >
        <span className={styles.labelText}>
          {currentLanguageData?.name_website || currentLabel}
        </span>
        <Image
          src={currentLanguageData?.image || '/image/flag/image-01.png'}
          alt={`${currentLanguageData?.name || currentLabel} flag`}
          width={200}
          height={200}
          className={`rounded-full object-cover ${styles.flagSize}`}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className={`${styles.chevronSize} transition-transform ${
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
        <ul
          className={`absolute right-0 ${popupPositionClass} ${styles.listWidth} overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg z-50`}
        >
          {languageCurrent?.map((lang: any) => (
            <li key={lang.id}>
              <button
                type="button"
                onClick={() => handleSelect(lang)}
                className={`flex w-full items-center justify-between ${
                  styles.itemPad
                } text-left hover:bg-gray-50 ${
                  currentLocale === lang.code ? 'bg-gray-50 font-semibold' : ''
                }`}
              >
                <div className={`flex items-center ${styles.itemGap}`}>
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
                    className={`${styles.checkIconSize} text-emerald-600`}
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
