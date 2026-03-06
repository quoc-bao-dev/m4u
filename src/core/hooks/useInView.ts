'use client'

import { useEffect, useRef, useState } from 'react'

interface UseInViewOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
  onInView?: () => void
  onNotInView?: () => void
}

export const useInView = <T extends HTMLElement = HTMLElement>(
  options: UseInViewOptions = {}
) => {
  const {
    threshold = 0,
    rootMargin = '0px',
    triggerOnce = false,
    onInView,
    onNotInView,
  } = options
  const [isInView, setIsInView] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)
  const ref = useRef<T>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting
        setIsInView(inView)

        if (inView && triggerOnce && !hasTriggered) {
          setHasTriggered(true)
          onInView?.()
        } else {
          onNotInView?.()
        }
      },
      {
        threshold,
        rootMargin,
      }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [threshold, rootMargin, triggerOnce, hasTriggered])

  return { ref, isInView: triggerOnce ? hasTriggered || isInView : isInView }
}
