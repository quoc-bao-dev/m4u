'use client'

import { cn } from '@/core/utils/cn'
import { useDevice } from '@/core/hooks/useDevice'

interface SafeViewProps {
  children: React.ReactNode
  className?: string
  /**
   * Whether to apply safe area padding
   * @default true
   */
  safeArea?: boolean
  /**
   * Whether to apply safe area only on mobile devices
   * @default true
   */
  mobileOnly?: boolean
  /**
   * Custom safe area padding (overrides default)
   */
  customPadding?: {
    top?: string
    bottom?: string
    left?: string
    right?: string
  }
}

export const SafeView = ({
  children,
  className,
  safeArea = true,
  mobileOnly = true,
  customPadding,
}: SafeViewProps) => {
  const { isMobile } = useDevice()

  const shouldApplySafeArea = safeArea && (!mobileOnly || isMobile)

  const safeAreaStyles = shouldApplySafeArea
    ? {
        paddingTop: customPadding?.top || 'env(safe-area-inset-top)',
        paddingBottom: customPadding?.bottom || 'env(safe-area-inset-bottom)',
        paddingLeft: customPadding?.left || 'env(safe-area-inset-left)',
        paddingRight: customPadding?.right || 'env(safe-area-inset-right)',
      }
    : {}

  return (
    <div
      className={cn(
        'min-h-screen w-full',
        shouldApplySafeArea && 'safe-area-padding',
        className
      )}
      style={safeAreaStyles}
    >
      {children}
    </div>
  )
}
