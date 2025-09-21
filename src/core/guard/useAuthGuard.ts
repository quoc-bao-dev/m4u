'use client'

import { useEffect } from 'react'
import { useAuth } from '@/modules/auth'
import { useRouter } from '@/locale/navigation'
import { tokenManager } from '@/core/http/axiosInstance'
import { envConfig } from '@/core/config'

export const useAuthGuard = (redirectTo: string = '/') => {
  const { isAuthenticated, user, clearUser } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Kiểm tra token trong localStorage
    const token = localStorage.getItem(envConfig.accessTokenKey)

    // Nếu không có token hoặc user chưa authenticated, redirect về home
    if (!token || (!isAuthenticated && user === null)) {
      router.push(redirectTo)
      return
    }

    // Nếu user đã logout (clearUser được gọi), redirect về home
    if (!user && !isAuthenticated) {
      router.push(redirectTo)
      return
    }
  }, [isAuthenticated, user, router, redirectTo])

  return { isAuthenticated, user }
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
