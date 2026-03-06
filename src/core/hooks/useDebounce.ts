import { useCallback, useEffect, useRef } from 'react'

export function useDebouncedCallback<T extends (...args: any[]) => void>(
  callback: T,
  delayMs: number
) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = setTimeout(() => {
        callback(...args)
      }, delayMs)
    },
    [callback, delayMs]
  )
}

export function useDebouncedValue<T>(value: T, delayMs: number): T {
  const debouncedValueRef = useRef(value)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      debouncedValueRef.current = value
    }, delayMs)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [value, delayMs])

  return debouncedValueRef.current
}
