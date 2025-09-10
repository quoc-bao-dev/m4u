'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import MenuContent from './menu-content'

interface MobileMenuWrapperProps {
  isOpen: boolean
  onClose: () => void
  isReviewer: boolean | null
  setIsReviewer: (value: boolean) => void
}

const MobileMenuWrapper = ({
  isOpen,
  onClose,
  isReviewer,
  setIsReviewer,
}: MobileMenuWrapperProps) => {
  const [entered, setEntered] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (isOpen) {
      const id = requestAnimationFrame(() => setEntered(true))
      return () => cancelAnimationFrame(id)
    }
    setEntered(false)
  }, [isOpen])

  // Lock body scroll when open
  useEffect(() => {
    if (!mounted) return
    if (isOpen) {
      const original = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = original
      }
    }
  }, [isOpen, mounted])

  if (!isOpen) return null

  const content = (
    <div className={`fixed inset-0 h-screen w-screen z-[9999] sm:hidden overflow-hidden`}>
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${entered ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      {/* Sliding Panel */}
      <div className={`absolute inset-y-0 left-0 right-0 bg-white transform transition-transform duration-300 ease-out ${entered ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Close Button */}
        <div className="flex py-4 px-6">
          <button
            onClick={onClose}
            className="border border-greyscale-700 p-2 rounded-full size-9 flex items-center justify-center"
          >
            <X className="text-gray-700 size-4" />
          </button>
        </div>

        {/* Modal Content */}
        <MenuContent
          isReviewer={isReviewer}
          setIsReviewer={setIsReviewer}
          onClose={onClose}
          isMobile={true}
        />
      </div>
    </div>
  )

  // Use portal to escape transformed ancestors (like animated header)
  return mounted ? createPortal(content, document.body) : null
}

export default MobileMenuWrapper
