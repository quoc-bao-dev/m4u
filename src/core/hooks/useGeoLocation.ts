'use client'

import { useState, useEffect } from 'react'
import { locales, defaultLocale } from '@/locale/config'

interface GeolocationPosition {
  coords: {
    latitude: number
    longitude: number
  }
}

interface CountryInfo {
  country: string
  countryCode: string
  region: string
  city: string
}

// Mapping từ country code đến locale
const countryToLocaleMap: Record<string, string> = {
  VN: 'vi',
  KR: 'kr',
  TH: 'th',
  CN: 'cn',
}

export function useGeoLocation() {
  const [isDetecting, setIsDetecting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [detectedLocale, setDetectedLocale] = useState<string | null>(null)

  const detectLocation = async (): Promise<string | null> => {
    setIsDetecting(true)
    setError(null)

    try {
      // Sử dụng browser geolocation API
      const position = await getCurrentPosition()

      // Sử dụng reverse geocoding để lấy thông tin quốc gia
      const countryInfo = await getCountryFromCoordinates(
        position.coords.latitude,
        position.coords.longitude
      )

      const locale = getLocaleFromCountry(countryInfo)

      if (locale) {
        setDetectedLocale(locale)
        return locale
      }

      return null
    } catch (err) {
      console.error('Geolocation detection failed:', err)
      setError('Không thể phát hiện vị trí của bạn')

      // Fallback: sử dụng timezone hoặc language header
      const fallbackLocale = getFallbackLocale()
      if (fallbackLocale) {
        setDetectedLocale(fallbackLocale)
        return fallbackLocale
      }

      return null
    } finally {
      setIsDetecting(false)
    }
  }

  const getCurrentPosition = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported'))
        return
      }

      navigator.geolocation.getCurrentPosition(
        resolve,
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              reject(new Error('User denied geolocation permission'))
              break
            case error.POSITION_UNAVAILABLE:
              reject(new Error('Location information unavailable'))
              break
            case error.TIMEOUT:
              reject(new Error('Location request timed out'))
              break
            default:
              reject(new Error('Unknown geolocation error'))
              break
          }
        },
        {
          enableHighAccuracy: false,
          timeout: 10000,
          maximumAge: 300000, // 5 minutes
        }
      )
    })
  }

  const getCountryFromCoordinates = async (
    latitude: number,
    longitude: number
  ): Promise<CountryInfo> => {
    try {
      // Sử dụng OpenStreetMap Nominatim API (miễn phí)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`
      )

      if (!response.ok) {
        throw new Error('Geocoding API request failed')
      }

      const data = await response.json()

      if (!data || !data.address) {
        throw new Error('No geocoding results found')
      }

      const address = data.address

      return {
        country: address.country || '',
        countryCode: address.country_code?.toUpperCase() || '',
        region: address.state || address.region || '',
        city: address.city || address.town || address.village || '',
      }
    } catch (error) {
      console.error('Geocoding failed:', error)
      throw error
    }
  }

  const getLocaleFromCountry = (countryInfo: CountryInfo): string | null => {
    // Kiểm tra country code trước
    if (
      countryInfo.countryCode &&
      countryToLocaleMap[countryInfo.countryCode]
    ) {
      return countryToLocaleMap[countryInfo.countryCode]
    }

    // Fallback: kiểm tra tên quốc gia
    const countryName = countryInfo.country.toLowerCase()

    if (countryName.includes('vietnam') || countryName.includes('việt nam')) {
      return 'vi'
    }
    if (countryName.includes('korea') || countryName.includes('south korea')) {
      return 'kr'
    }
    if (countryName.includes('thailand')) {
      return 'th'
    }
    if (countryName.includes('china')) {
      return 'cn'
    }

    return null
  }

  const getFallbackLocale = (): string | null => {
    // Sử dụng browser language
    const browserLang = navigator.language || navigator.languages?.[0]

    if (browserLang) {
      if (browserLang.startsWith('vi')) return 'vi'
      if (browserLang.startsWith('ko')) return 'kr'
      if (browserLang.startsWith('th')) return 'th'
      if (browserLang.startsWith('zh')) return 'cn'
    }

    // Sử dụng timezone
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    if (
      timezone.includes('Asia/Ho_Chi_Minh') ||
      timezone.includes('Asia/Hanoi')
    ) {
      return 'vi'
    }
    if (timezone.includes('Asia/Seoul')) {
      return 'kr'
    }
    if (timezone.includes('Asia/Bangkok')) {
      return 'th'
    }
    if (
      timezone.includes('Asia/Shanghai') ||
      timezone.includes('Asia/Beijing')
    ) {
      return 'cn'
    }

    return null
  }

  return {
    isDetecting,
    error,
    detectedLocale,
    detectLocation,
  }
}
