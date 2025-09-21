'use client'

import { useEffect } from 'react'
import { useAuth } from '@/modules/auth'
import { useRouter } from '@/locale/navigation'
import { PropsWithChildren } from 'react'

interface AuthGuardProps extends PropsWithChildren {
  redirectTo?: string
  fallback?: React.ReactNode
}

const AuthGuard = ({
  children,
  redirectTo = '/',
  fallback = null,
}: AuthGuardProps) => {
  const { isAuthenticated, user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Chỉ redirect khi component đã mount và user chưa được authenticate
    if (typeof window !== 'undefined' && !isAuthenticated && user === null) {
      router.push(redirectTo)
    }
  }, [isAuthenticated, user, router, redirectTo])

  // Nếu chưa authenticated, hiển thị fallback hoặc null
  if (!isAuthenticated || user === null) {
    return fallback
  }

  // Nếu đã authenticated, render children
  return <>{children}</>
}

export default AuthGuard
