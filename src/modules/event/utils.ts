/**
 * Event module utility functions
 */

import type { Locale } from '@/locale/config'

/**
 * Get locale-specific date formatting options
 * @param locale - Current locale
 * @returns Date formatting options for the locale
 */
const getLocaleDateOptions = (locale: Locale) => {
  const baseOptions = {
    day: '2-digit' as const,
    year: 'numeric' as const,
  }

  switch (locale) {
    case 'vi':
      return {
        ...baseOptions,
        month: 'long' as const,
        timeZone: 'Asia/Ho_Chi_Minh',
      }
    case 'en':
      return {
        ...baseOptions,
        month: 'long' as const,
        timeZone: 'Asia/Ho_Chi_Minh',
      }
    case 'kr':
      return {
        ...baseOptions,
        month: 'long' as const,
        timeZone: 'Asia/Ho_Chi_Minh',
      }
    case 'th':
      return {
        ...baseOptions,
        month: 'long' as const,
        timeZone: 'Asia/Ho_Chi_Minh',
      }
    case 'cn':
      return {
        ...baseOptions,
        month: 'long' as const,
        timeZone: 'Asia/Ho_Chi_Minh',
      }
    default:
      return {
        ...baseOptions,
        month: 'long' as const,
        timeZone: 'Asia/Ho_Chi_Minh',
      }
  }
}

/**
 * Format date for display - handles API format: "2025-09-05 13:54:00"
 * @param dateString - Date string from API
 * @param locale - Current locale for formatting
 * @param fallbackLabel - Fallback text if date is invalid
 * @returns Formatted date string for the specified locale
 */
export const formatEventDate = (
  dateString: string,
  locale: Locale = 'vi',
  fallbackLabel: string = ''
) => {
  if (!dateString) return fallbackLabel

  try {
    // API format: "2025-09-05 13:54:00" (no timezone, assume Vietnam time)
    let date: Date

    if (dateString.match(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/)) {
      // API format: "2025-09-05 13:54:00" -> treat as Vietnam timezone (+07:00)
      const isoString = dateString.replace(' ', 'T') + '+07:00'
      date = new Date(isoString)
    } else {
      // Other formats (ISO, etc.)
      date = new Date(dateString)
    }

    // Validate date
    if (isNaN(date.getTime())) {
      console.warn('Invalid date format:', dateString)
      return fallbackLabel
    }

    // Get locale-specific formatting options
    const options = getLocaleDateOptions(locale)

    // Map locale to Intl locale string
    const intlLocale =
      locale === 'vi'
        ? 'vi-VN'
        : locale === 'en'
        ? 'en-US'
        : locale === 'kr'
        ? 'ko-KR'
        : locale === 'th'
        ? 'th-TH'
        : locale === 'cn'
        ? 'zh-CN'
        : 'vi-VN'

    return date.toLocaleDateString(intlLocale, options)
  } catch (error) {
    console.error('Error formatting date:', error)
    return fallbackLabel
  }
}

/**
 * Convert API date to proper ISO format for countdown
 * Handles API format: "2025-09-05 13:54:00"
 * @param dateString - Date string from API
 * @param fallbackDate - Fallback ISO date string
 * @returns ISO formatted date string with timezone
 */
export const formatEventDateForCountdown = (
  dateString: string,
  fallbackDate: string = '2025-10-01T00:00:00+07:00'
) => {
  if (!dateString) return fallbackDate

  try {
    // Check if it matches API format: "2025-09-05 13:54:00"
    if (dateString.match(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/)) {
      // Convert API format to ISO with Vietnam timezone
      return dateString.replace(' ', 'T') + '+07:00'
    }

    // If already ISO format or other format, return as is
    return dateString
  } catch (error) {
    console.error('Error formatting date for countdown:', error)
    return fallbackDate
  }
}

/**
 * Parse target date with proper timezone handling for countdown
 * @param targetDate - Target date string
 * @param fallbackDate - Fallback date string
 * @returns Parsed date timestamp
 */
export const parseEventDateForCountdown = (
  targetDate: string,
  fallbackDate: string = '2025-10-01T00:00:00+07:00'
) => {
  try {
    let date: Date

    // Check if it's API format: "2025-09-05 13:54:00"
    if (targetDate.match(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/)) {
      // Convert API format to ISO with Vietnam timezone
      const isoString = targetDate.replace(' ', 'T') + '+07:00'
      date = new Date(isoString)
    } else {
      // Already ISO format or other format
      date = new Date(targetDate)
    }

    if (isNaN(date.getTime())) {
      console.warn('Invalid target date:', targetDate)
      return new Date(fallbackDate).getTime()
    }

    return date.getTime()
  } catch (error) {
    console.error('Error parsing target date:', error)
    return new Date(fallbackDate).getTime()
  }
}

/**
 * Calculate time remaining for countdown
 * @param targetTime - Target timestamp
 * @param currentTime - Current timestamp
 * @returns Object with days, hours, minutes
 */
export const calculateTimeRemaining = (
  targetTime: number,
  currentTime: number
) => {
  const diff = Math.max(0, targetTime - currentTime)

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

  return { days, hours, minutes }
}

/**
 * Format banner event headline
 * @param titleOne - First part of title
 * @param titleTwo - Second part of title
 * @param fallbackHeadline - Fallback headline
 * @returns Combined headline string
 */
export const formatBannerHeadline = (
  titleOne?: string,
  titleTwo?: string,
  fallbackHeadline: string = ''
) => {
  const parts = []
  if (titleOne) parts.push(titleOne)
  if (titleTwo) parts.push(titleTwo)

  return parts.length > 0 ? parts.join(' ') : fallbackHeadline
}
