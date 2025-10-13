'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { locales, defaultLocale } from '@/locale/config'
import LanguageSelector from './LanguageSelector'
import GeoLocationPermission from './GeoLocationPermission'
import { useGeoLocation } from '@/core/hooks/useGeoLocation'
import {
  getConfigForEnvironment,
  getConfigForMode,
  GeolocationConfig,
  DEFAULT_GEOLOCATION_CONFIG,
} from '@/core/config/geolocation.config'

// ===== CONFIGURATION =====
// Chọn cách lấy config:
// 1. Tự động detect theo environment
// 2. Chọn mode cụ thể
// 3. Sử dụng config tùy chỉnh

// Option 1: Tự động detect (khuyến nghị)
const config: GeolocationConfig = getConfigForEnvironment()

// Option 2: Chọn mode cụ thể
// const config: GeolocationConfig = getConfigForMode('auto') // hoặc 'ui'

// Option 3: Config tùy chỉnh
// const config: GeolocationConfig = {
//   ...DEFAULT_GEOLOCATION_CONFIG,
//   mode: 'auto',
//   autoMode: {
//     showNotification: true,
//     notificationDuration: 2000,
//     useBrowserLanguageFallback: true,
//     useTimezoneFallback: true,
//     showLoadingState: false,
//   }
// }
// ===== END CONFIGURATION =====

export default function GeoLocationDetector() {
  const [showLanguageSelector, setShowLanguageSelector] = useState(false)
  const [showPermission, setShowPermission] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState('')
  const router = useRouter()
  const pathname = usePathname()
  const { isDetecting, error, detectLocation } = useGeoLocation()

  // Kiểm tra xem đã có locale trong URL chưa
  const hasLocaleInPath = locales.some((locale) =>
    pathname.startsWith(`/${locale}`)
  )

  useEffect(() => {
    // Kiểm tra nếu tính năng bị disable
    if (!config.enabled) {
      return
    }

    // Chỉ chạy nếu chưa có locale trong URL và chưa có trong localStorage
    if (localStorage.getItem('user-locale-preference')) {
      return
    }

    if (config.debug) {
      console.log(
        'GeoLocationDetector: Starting detection with config:',
        config
      )
    }

    if (config.mode === 'auto') {
      handleAutoMode()
    } else if (config.mode === 'ui') {
      handleUIMode()
    }
  }, [hasLocaleInPath])

  const handleAutoMode = async () => {
    try {
      // Thử detect location tự động
      const detectedLocale = await detectLocation()

      if (detectedLocale) {
        // Lưu preference và redirect
        localStorage.setItem('user-locale-preference', detectedLocale)
        const newPath = pathname.replace(/^\/[^\/]+/, `/${detectedLocale}`)

        if (config.autoMode.showNotification) {
          setNotificationMessage(
            `Đã tự động chuyển đến ${detectedLocale.toUpperCase()}`
          )
          setShowNotification(true)
          setTimeout(() => {
            router.replace(newPath)
          }, config.autoMode.notificationDuration)
        } else {
          router.replace(newPath)
        }
        return
      }
    } catch (error) {
      console.log('Auto detection failed, using fallback')
    }

    // Fallback logic
    const fallbackLocale = getFallbackLocale()
    if (fallbackLocale) {
      localStorage.setItem('user-locale-preference', fallbackLocale)
      const newPath = pathname.replace(/^\/[^\/]+/, `/${fallbackLocale}`)

      if (config.autoMode.showNotification) {
        setNotificationMessage(
          `Đã tự động chuyển đến ${fallbackLocale.toUpperCase()}`
        )
        setShowNotification(true)
        setTimeout(() => {
          router.replace(newPath)
        }, config.autoMode.notificationDuration)
      } else {
        router.replace(newPath)
      }
    } else {
      // Nếu không có fallback, chuyển về default
      localStorage.setItem('user-locale-preference', 'skip')
      router.replace(`/${defaultLocale}`)
    }
  }

  const handleUIMode = () => {
    if (config.uiMode.showPermissionDialog) {
      setShowPermission(true)
    } else {
      // Nếu không hiển thị permission dialog, thử detect trực tiếp
      handleAllowLocation()
    }
  }

  const getFallbackLocale = (): string | null => {
    let fallbackLocale = null

    if (config.autoMode.useBrowserLanguageFallback) {
      const browserLang = navigator.language || navigator.languages?.[0]
      if (browserLang) {
        if (browserLang.startsWith('vi')) fallbackLocale = 'vi'
        else if (browserLang.startsWith('ko')) fallbackLocale = 'kr'
        else if (browserLang.startsWith('th')) fallbackLocale = 'th'
        else if (browserLang.startsWith('zh')) fallbackLocale = 'cn'
      }
    }

    if (!fallbackLocale && config.autoMode.useTimezoneFallback) {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
      if (
        timezone.includes('Asia/Ho_Chi_Minh') ||
        timezone.includes('Asia/Hanoi')
      ) {
        fallbackLocale = 'vi'
      } else if (timezone.includes('Asia/Seoul')) {
        fallbackLocale = 'kr'
      } else if (timezone.includes('Asia/Bangkok')) {
        fallbackLocale = 'th'
      } else if (
        timezone.includes('Asia/Shanghai') ||
        timezone.includes('Asia/Beijing')
      ) {
        fallbackLocale = 'cn'
      }
    }

    return fallbackLocale
  }

  const handleAllowLocation = async () => {
    const detectedLocale = await detectLocation()

    if (detectedLocale) {
      // Lưu preference vào localStorage
      localStorage.setItem('user-locale-preference', detectedLocale)

      // Redirect đến locale phù hợp
      const newPath = pathname.replace(/^\/[^\/]+/, `/${detectedLocale}`)
      router.replace(newPath)
    } else {
      // Nếu không detect được locale, sử dụng fallback
      handleDenyLocation()
    }
  }

  const handleDenyLocation = () => {
    // Fallback: sử dụng browser language hoặc timezone
    const browserLang = navigator.language || navigator.languages?.[0]
    let fallbackLocale = null

    if (browserLang) {
      if (browserLang.startsWith('vi')) fallbackLocale = 'vi'
      else if (browserLang.startsWith('ko')) fallbackLocale = 'kr'
      else if (browserLang.startsWith('th')) fallbackLocale = 'th'
      else if (browserLang.startsWith('zh')) fallbackLocale = 'cn'
    }

    if (fallbackLocale) {
      localStorage.setItem('user-locale-preference', fallbackLocale)
      const newPath = pathname.replace(/^\/[^\/]+/, `/${fallbackLocale}`)
      router.replace(newPath)
    } else {
      // Nếu không detect được, hiển thị language selector
      setShowLanguageSelector(true)
    }
  }

  const handleSkipLocation = () => {
    // Hiển thị language selector thay vì tự động chuyển về vi
    setShowLanguageSelector(true)
  }

  //   // Không render gì nếu đã có locale trong URL
  //   if (hasLocaleInPath) {
  //     return null
  //   }

  return (
    <>
      {/* Auto Mode Notification */}
      {showNotification && (
        <div className="fixed top-4 right-4 bg-green-600 text-white px-4 py-3 rounded-full shadow-lg z-50">
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span>{notificationMessage}</span>
          </div>
        </div>
      )}

      {/* Permission Dialog - chỉ hiển thị khi cần thiết */}
      {showPermission && config.uiMode.showPermissionDialog && (
        <GeoLocationPermission
          onAllow={handleAllowLocation}
          onDeny={handleDenyLocation}
          onSkip={handleSkipLocation}
        />
      )}

      {/* Language Selector */}
      {config.uiMode.showLanguageSelector && (
        <LanguageSelector
          isOpen={showLanguageSelector}
          onClose={() => setShowLanguageSelector(false)}
        />
      )}

      {/* Loading State */}
      {isDetecting && config.uiMode.showLoadingState && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-990">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500 mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold mb-2">
              Đang phát hiện vị trí của bạn...
            </h3>
            <p className="text-gray-600 mb-4">
              Chúng tôi đang xác định vị trí để hiển thị ngôn ngữ phù hợp nhất.
            </p>
            {error && config.uiMode.showErrorMessage && (
              <p className="text-red-600 text-sm mb-4">{error}</p>
            )}
            {config.uiMode.showLanguageSelector && (
              <button
                onClick={() => setShowLanguageSelector(true)}
                className="text-blue-600 hover:text-blue-800 underline text-sm"
              >
                Chọn ngôn ngữ khác
              </button>
            )}
          </div>
        </div>
      )}
    </>
  )
}
