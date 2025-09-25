'use client'

import { useSocket } from '@/core/hooks'
import {
  useGetListNotifications,
  useGetStatusNotification,
} from '@/services/notification'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

const ToastNotify = () => {
  const socket = useSocket()
  const queryClient = useQueryClient()
  const { refetch: refetchStatus } = useGetStatusNotification()

  useEffect(() => {
    if (!socket) return

    const handler = () => {
      // Refetch notifications và status khi có thông báo mới
      refetchStatus()
      queryClient.invalidateQueries({ queryKey: ['list-notifications'] })
    }

    socket.on('new_notification', handler)

    return () => {
      socket.off('new_notification', handler)
    }
  }, [socket, refetchStatus, queryClient])

  return null
}

export default ToastNotify
