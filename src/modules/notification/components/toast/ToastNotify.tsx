'use client'

import { useSocket, useToast } from '@/core/hooks'
import { useGetStatusNotification } from '@/services/notification'
import { apiNotification } from '@/services/notification/api'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

// Type for the notification data received from socket "new_notification" event

export interface SocketNotificationData {
  user: {
    id: number
    user_id: number | string
    socket_id: string
    object: string // JSON string with user_id, user_name, db_name
    rooms_id: number | null
    db_name: string
    UserSockets: Array<{
      id: number
      user_socket_id: number
      socket_id: string
      active: number
    }>
  }
  data: {
    id_notication: number
    title: string
    arr_object_id: Array<{
      object_id: number
      object_type: string
    }>
    player_id: any[]
    json_data: string // JSON string with id, id_review, active, content
    content: string
    created_by: number
    title_owen: string
    object_type: string
  }
}

const ToastNotify = () => {
  const socket = useSocket()
  const queryClient = useQueryClient()
  const { refetch: refetchStatus } = useGetStatusNotification()
  const toast = useToast()

  useEffect(() => {
    if (!socket) return

    const handler = async (data: SocketNotificationData) => {
      try {
        const id = data?.data?.id_notication
        console.log(data)
        console.log(id)

        if (id) {
          try {
            const response = await apiNotification.getNotificationDetail(id)
            console.log(response)

            const detail = response?.data?.data
            const message =
              detail?.content || detail?.title || 'Bạn có thông báo mới'
            toast.showInfo(message)
          } catch (err) {
            console.log(err)
          }
        }
      } finally {
        // Refetch notifications và status khi có thông báo mới
        refetchStatus()
        queryClient.invalidateQueries({ queryKey: ['list-notifications'] })
      }
    }

    socket.on('new_notification', handler)

    return () => {
      socket.off('new_notification', handler)
    }
  }, [socket, refetchStatus, queryClient])

  return null
}

export default ToastNotify
