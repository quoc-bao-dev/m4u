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

    // Sử dụng rootMargin để mở rộng vùng detect 400px từ mọi phía
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

    return () => {
      observer.unobserve(element)
    }
  }, [distance, onNearViewport, onFarFromViewport])

  return { ref, isNearViewport }
}
