'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/modules/auth'
import { useRouter } from '@/locale/navigation'
import { tokenManager } from '@/core/http/axiosInstance'
import { envConfig } from '@/core/config'

export const useAuthGuard = (redirectTo: string = '/') => {
  const { isAuthenticated, user } = useAuth()
  const router = useRouter()
  const [authState, setAuthState] = useState<
    'checking' | 'authenticated' | 'unauthenticated'
  >('checking')

  useEffect(() => {
    if (typeof window === 'undefined') return

    const checkAuthentication = async () => {
      const token = localStorage.getItem(envConfig.accessTokenKey)

      if (!token) {
        // Không có token, chắc chắn chưa đăng nhập
        setAuthState('unauthenticated')
        router.push(redirectTo)
        return
      }

      // Có token, kiểm tra xem đã có user chưa
      if (isAuthenticated && user) {
        setAuthState('authenticated')
        return
      }

      // Chờ AutoLogin hoàn tất (tối đa 3 giây)
      let timeoutId: NodeJS.Timeout
      let intervalId: NodeJS.Timeout

      const cleanup = () => {
        if (timeoutId) clearTimeout(timeoutId)
        if (intervalId) clearInterval(intervalId)
      }

      // Timeout sau 3 giây
      timeoutId = setTimeout(() => {
        cleanup()
        // Nếu sau 3 giây vẫn chưa có user, có thể token hết hạn
        if (!isAuthenticated || !user) {
          setAuthState('unauthenticated')
          // Không redirect ngay, để user tự quyết định
        }
      }, 3000)

      // Kiểm tra mỗi 100ms
      intervalId = setInterval(() => {
        if (isAuthenticated && user) {
          cleanup()
          setAuthState('authenticated')
        }
      }, 100)

      return cleanup
    }

    const cleanup = checkAuthentication()
    return () => {
      if (cleanup instanceof Function) cleanup()
    }
  }, [isAuthenticated, user, router, redirectTo])

  return {
    isAuthenticated,
    user,
    isInitialized: authState !== 'checking',
    authState,
  }
}

export const useLogoutWithRedirect = (redirectTo: string = '/') => {
  const { clearUser } = useAuth()
  const router = useRouter()

  const logout = () => {
    // Clear user state
    clearUser()

    // Clear tokens
    tokenManager.clearTokens()
    localStorage.removeItem(envConfig.accessTokenKey)

    // Redirect to home
    router.push(redirectTo)
  }

  return logout
}
