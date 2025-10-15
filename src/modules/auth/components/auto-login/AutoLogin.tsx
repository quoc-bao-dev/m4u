'use client'

import { useEffect } from 'react'
import { envConfig } from '@/core/config'
import { authApi } from '@/services/auth/api'
import { useAuth } from '@/modules/auth'

const AutoLogin = () => {
  const { user, isAuthenticated, setUser } = useAuth()

  useEffect(() => {
    if (typeof window === 'undefined') return

    const token = localStorage.getItem(envConfig.accessTokenKey)
    if (!token) return

    if (isAuthenticated && user) return

    const fetchUser = async () => {
      try {
        const response = await authApi.userInfo({ token })
        if (response.data?.result && response.data.info) {
          setUser(response.data.info)
        }
      } catch (error) {
        console.error('AutoLogin error:', error)
      }
    }

    fetchUser()
  }, [])

  return null
}

export default AutoLogin
