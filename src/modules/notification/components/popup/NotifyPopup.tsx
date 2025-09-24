'use client'

import { useSocket } from '@/core/hooks'
import { useGetListNotifications } from '@/services/notification'
import type { NotificationItem as ApiNotificationItem } from '@/services/notification/type'
import { X } from '@phosphor-icons/react'
import React, { useEffect, useMemo } from 'react'
import { formatNotificationTime, formatNotificationTimeI18n } from '../../utils'
import { renderNotificationIcon } from '../../utils/render-icon'
import styles from './NotifyPopup.module.css'
import { useNavigate } from '@/locale'
import { useTranslations } from 'next-intl'
import { Nodata } from '@/core/components/common'

// Types
export interface NotificationItem {
  id: string
  type:
    | 'review_liked'
    | 'review_approved'
    | 'review_submitted'
    | 'trial_registered'
  content: string
  timestamp: Date
}

interface NotifyPopupProps {
  onClose: () => void
}

// Mock data
const mockNotifications: NotificationItem[] = [
  {
    id: '1',
    type: 'review_liked',
    content: 'Phượng Lê đã thích đánh giá của bạn.',
    timestamp: new Date(Date.now() - 1000 * 60 * 2), // 2 minutes ago
  },
  {
    id: '2',
    type: 'review_approved',
    content: 'Đánh giá của bạn đã được duyệt.',
    timestamp: new Date(Date.now() - 1000 * 60 * 10), // 10 minutes ago
  },
  {
    id: '3',
    type: 'review_submitted',
    content: 'Bạn vừa gửi đánh giá cho sản phẩm Manyo.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
  },
  {
    id: '4',
    type: 'trial_registered',
    content: 'Bạn đã đăng ký dùng thử Manyo thành công.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
  },
  {
    id: '5',
    type: 'trial_registered',
    content: 'Bạn đã đăng ký dùng thử Manyo thành công.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
  },
  {
    id: '6',
    type: 'trial_registered',
    content: 'Bạn đã đăng ký dùng thử Manyo thành công.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
  },
]

const NotifyPopup: React.FC<NotifyPopupProps> = ({ onClose }) => {
  const socket = useSocket()

  const nav = useNavigate()
  const t = useTranslations()

  useEffect(() => {
    if (!socket) return

    const handler = (data: any) => {
      console.log('Data:', data)
    }

    socket.on('new_notification', handler)

    return () => {
      socket.off('new_notification', handler)
    }
  }, [socket])

  const { data: notifications } = useGetListNotifications(null)

  const mappedNotifications = useMemo<NotificationItem[]>(() => {
    const items: ApiNotificationItem[] = notifications?.data ?? []

    const mapType = (objectType?: string): NotificationItem['type'] => {
      if (!objectType) return 'review_submitted'
      const type = objectType.toLowerCase()
      if (type.includes('trial')) return 'trial_registered'
      if (type.includes('approved')) return 'review_approved'
      if (type.includes('like')) return 'review_liked'
      return 'review_submitted'
    }

    return items.map((n: ApiNotificationItem) => ({
      id: String(n.id),
      type: mapType(n.object_type),
      content: n.content || n.json_data?.content || n.title || '',
      timestamp: new Date(n.created_at),
    }))
  }, [notifications])

  return (
    <div className="bg-white border min-w-[360px] border-gray-200 rounded-2xl p-3 shadow-[0_12px_16px_-4px_rgba(16,24,40,0.08),0_4px_6px_-2px_rgba(16,24,40,0.03)]">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
          {t('notification.title')}
        </h2>
        <button
          onClick={onClose}
          className="text-gray-600 hover:text-gray-800 transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      {/* Line */}
      <div className="border-b border-gray-200 mb-3"></div>

      {/* Notifications List */}
      <div
        className={`max-h-[339px] overflow-y-auto mb-3 ${styles.notificationScroll}`}
      >
        {mappedNotifications.length === 0 ? (
          <Nodata
            title={t('notification.nodata.title')}
            description={t('notification.nodata.desc')}
            className="py-8"
          />
        ) : (
          mappedNotifications.map((notification, index) => (
            <div key={notification.id}>
              <div className="rounded-lg p-2 flex gap-2 hover:bg-gray-50 transition-colors cursor-pointer">
                {/* Icon */}
                {renderNotificationIcon(notification.type)}

                {/* Content */}
                <div className="flex-1 flex flex-col">
                  <p className="text-sm text-gray-900 mb-1">
                    {notification.content}
                  </p>
                  <span className="text-xs text-gray-500">
                    {formatNotificationTimeI18n(notification.timestamp, t)}
                  </span>
                </div>
              </div>

              {/* Line between items (except last item) */}
              {index < mappedNotifications.length - 1 && (
                <div className="border-b border-gray-100 mx-2"></div>
              )}
            </div>
          ))
        )}
      </div>

      {/* View All Button */}
      <button
        onClick={() => {
          nav('/notification')
          onClose()
        }}
        className="cursor-pointer w-full rounded-lg border border-gray-300 py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
      >
        {t('notification.viewAll')}
      </button>
    </div>
  )
}

export default NotifyPopup
