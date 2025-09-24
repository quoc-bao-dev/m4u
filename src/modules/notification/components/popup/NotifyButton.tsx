'use client'

import { Bell } from '@phosphor-icons/react'
import { useState, useRef, useEffect } from 'react'
import NotifyPopup from './NotifyPopup'
import { useSocket } from '@/core/hooks'

const NotifyButton = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const buttonRef = useRef<HTMLDivElement>(null)
  const popupRef = useRef<HTMLDivElement>(null)

  const [hasNotify, setHasNotify] = useState(false)

  const socket = useSocket()

  useEffect(() => {
    if (!socket) return

    socket.on('new_notification', () => {
      setHasNotify(true)
    })

    return () => {
      socket.off('new_notification', () => {
        setHasNotify(false)
      })
    }
  }, [socket])

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsPopupOpen(false)
      }
    }

    if (isPopupOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isPopupOpen])

  // Close popup on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsPopupOpen(false)
      }
    }

    if (isPopupOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isPopupOpen])

  const togglePopup = () => {
    setHasNotify(false)
    setIsPopupOpen(!isPopupOpen)
  }

  const closePopup = () => {
    setIsPopupOpen(false)
  }

  return (
    <div className="relative">
      {/* Notification Button */}
      <div
        ref={buttonRef}
        onClick={togglePopup}
        className={`relative cursor-pointer size-[36px] flex items-center justify-center rounded-full border transition-all duration-200 ${
          isPopupOpen
            ? 'border-gray-600 text-gray-600 bg-gray-50'
            : 'border-gray-900 text-gray-900 hover:border-gray-700 hover:text-gray-700'
        }`}
      >
        <Bell size={20} />
        {hasNotify && (
          <div className="absolute top-0 right-0 size-[10px] rounded-full bg-[#FF8092]"></div>
        )}
      </div>

      {/* Popup */}
      {isPopupOpen && (
        <div
          ref={popupRef}
          className="absolute top-full right-0 mt-2 z-50 animate-in fade-in-0 zoom-in-95 duration-200"
          style={{ minWidth: '320px' }}
        >
          <NotifyPopup onClose={closePopup} />
        </div>
      )}
    </div>
  )
}

export default NotifyButton
