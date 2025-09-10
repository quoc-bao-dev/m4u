'use client'

import { useState } from 'react'
import MobileMenuWrapper from './mobile-menu-wrapper'
import DesktopMenuWrapper from './desktop-menu-wrapper'
import { useDevice } from '@/core/hooks'
import { Menu } from '@/icons'

const UserMenu = () => {
  const { isMobile } = useDevice()
  const [isReviewer, setIsReviewer] = useState<boolean | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {isMobile ? (
        <>
          <button
            onClick={() => setIsOpen(true)}
            className="hover:bg-gray-100 rounded-full transition-colors cursor-pointer sm:hidden"
            aria-label="Open menu"
          >
            <Menu className="text-gray-700 size-9" />
          </button>
          <MobileMenuWrapper
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            isReviewer={isReviewer}
            setIsReviewer={setIsReviewer}
          />
        </>
      ) : (
        <DesktopMenuWrapper
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          isReviewer={isReviewer}
          setIsReviewer={setIsReviewer}
        />
      )}
    </>
  )
}

export default UserMenu
