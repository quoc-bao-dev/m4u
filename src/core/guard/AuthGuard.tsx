'use client'

import { useAuthGuard } from './useAuthGuard'
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
  const { isAuthenticated, user, isInitialized } = useAuthGuard(redirectTo)

  // Đang trong quá trình kiểm tra authentication
  if (!isInitialized) {
    return fallback
  }

  // Nếu chưa authenticated sau khi đã check xong, hiển thị fallback
  if (!isAuthenticated || user === null) {
    return fallback
  }

  // Nếu đã authenticated, render children
  return <>{children}</>
}

export default AuthGuard
