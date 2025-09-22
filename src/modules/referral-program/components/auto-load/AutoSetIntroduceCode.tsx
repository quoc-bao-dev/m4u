'use client'

import { envConfig } from '@/core/config'
import { useEffect } from 'react'

const AutoSetIntroduceCode = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const params = new URLSearchParams(window.location.search)
    const key = envConfig.introduceCodeQueryKey
    const storageKey = envConfig.introduceCodeStorageKey
    const code = params.get(key)

    if (code && code.trim()) {
      try {
        localStorage.setItem(storageKey, code.trim())
      } catch {}
    }
  }, [])

  return null
}

export default AutoSetIntroduceCode
