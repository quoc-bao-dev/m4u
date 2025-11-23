'use client'

import { useEffect, useRef, useState } from 'react'

interface UseNearViewportOptions {
  /**
   * Khoảng cách tính bằng pixel từ viewport để trigger preload
   * @default 400
   */
  distance?: number
  /**
   * Callback khi component vào vùng preload
   */
  onNearViewport?: () => void
  /**
   * Callback khi component rời khỏi vùng preload
   */
  onFarFromViewport?: () => void
}

/**
 * Hook để detect khi component nằm ngoài viewport nhưng trong khoảng cách nhất định
 * Hữu ích cho việc preload video hoặc tài nguyên khác
 */
export const useNearViewport = <T extends HTMLElement = HTMLElement>(
  options: UseNearViewportOptions = {}
) => {
  const { distance = 400, onNearViewport, onFarFromViewport } = options
  const [isNearViewport, setIsNearViewport] = useState(false)
  const ref = useRef<T>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Helper function để check manually (quan trọng trên mobile)
    const checkIfNearViewport = () => {
      const rect = element.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const viewportWidth = window.innerWidth

      // Check xem element có nằm trong viewport mở rộng không
      const isNear =
        rect.bottom >= -distance &&
        rect.top <= viewportHeight + distance &&
        rect.right >= -distance &&
        rect.left <= viewportWidth + distance

      return isNear
    }

    // Check ban đầu ngay khi mount (quan trọng trên mobile)
    const initialCheck = checkIfNearViewport()
    if (initialCheck) {
      setIsNearViewport(true)
      onNearViewport?.()
    }

    // Sử dụng rootMargin để mở rộng vùng detect từ mọi phía
    const rootMargin = `${distance}px`

    const observer = new IntersectionObserver(
      ([entry]) => {
        // isIntersecting = true khi component vào viewport hoặc trong khoảng rootMargin
        const near = entry.isIntersecting

        setIsNearViewport(near)

        if (near) {
          onNearViewport?.()
        } else {
          onFarFromViewport?.()
        }
      },
      {
        rootMargin,
        threshold: 0, // Chỉ cần detect khi bất kỳ phần nào của element vào vùng
      }
    )

    observer.observe(element)

    // Thêm scroll listener để đảm bảo hoạt động đúng trên mobile
    // (IntersectionObserver có thể delay trên mobile)
    let scrollTimeout: NodeJS.Timeout
    let currentState = initialCheck
    const handleScroll = () => {
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        const near = checkIfNearViewport()
        if (near !== currentState) {
          currentState = near
          setIsNearViewport(near)
          if (near) {
            onNearViewport?.()
          } else {
            onFarFromViewport?.()
          }
        }
      }, 50)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })

    return () => {
      observer.unobserve(element)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
      clearTimeout(scrollTimeout)
    }
  }, [distance, onNearViewport, onFarFromViewport])

  return { ref, isNearViewport }
}
