'use client'

import { useSocket, useToast } from '@/core/hooks'
import { useEffect } from 'react'

const ToastNotify = () => {
  // TODO: nhận sự kiên và thông báo toast
  const socket = useSocket()
  const toast = useToast()

  useEffect(() => {
    if (!socket) return

    socket.on('new_notification', () => {
      toast.showInfo('Thông báo mới')
    })
  }, [socket])
  return null
}

export default ToastNotify
