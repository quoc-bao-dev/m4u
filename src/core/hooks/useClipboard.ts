import { useCallback, useRef, useState } from 'react'

type UseClipboardOptions = {
  resetAfterMs?: number
}

export const useClipboard = (options: UseClipboardOptions = {}) => {
  const { resetAfterMs = 2000 } = options
  const [isCopied, setIsCopied] = useState(false)
  const timeoutRef = useRef<number | null>(null)

  const clearTimer = () => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }

  const copy = useCallback(
    async (text: string) => {
      try {
        if (!text) return false
        if (navigator?.clipboard?.writeText) {
          await navigator.clipboard.writeText(text)
        } else {
          const textarea = document.createElement('textarea')
          textarea.value = text
          textarea.style.position = 'fixed'
          textarea.style.opacity = '0'
          document.body.appendChild(textarea)
          textarea.select()
          document.execCommand('copy')
          document.body.removeChild(textarea)
        }

        setIsCopied(true)
        clearTimer()
        timeoutRef.current = window.setTimeout(() => {
          setIsCopied(false)
          timeoutRef.current = null
        }, resetAfterMs)

        return true
      } catch {
        return false
      }
    },
    [resetAfterMs]
  )

  return { isCopied, copy }
}
