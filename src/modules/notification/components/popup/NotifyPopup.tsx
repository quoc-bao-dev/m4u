'use client'

import { Nodata } from '@/core/components/common'
import { useNavigate } from '@/locale'
import { useGetListNotifications } from '@/services/notification'
import { useMarkNotificationRead } from '@/services/notification/queries'
import type { NotificationItem as ApiNotificationItem } from '@/services/notification/type'
import { X } from '@phosphor-icons/react'
import { useTranslations } from 'next-intl'
import React, { useMemo } from 'react'
import { formatNotificationTimeI18n } from '../../utils'
import { renderNotificationIcon } from '../../utils/render-icon'
import { useNotificationHandler } from '../../utils/notificationHandler'
import styles from './NotifyPopup.module.css'
import { Skeleton } from '@/components/ui/skeleton'

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
  isRead: boolean
  originalData?: ApiNotificationItem
}

interface NotifyPopupProps {
  onClose: () => void
}

const NotifyPopup: React.FC<NotifyPopupProps> = ({ onClose }) => {
  const nav = useNavigate()
  const t = useTranslations()

  const { data: notifications, isLoading } = useGetListNotifications(null)
  const markReadMutation = useMarkNotificationRead()

  const { handleNotificationClick } = useNotificationHandler({
    onClick: onClose,
  })

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
      isRead: n.is_read === 1,
      originalData: n, // Store original API data for handler
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
        {isLoading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="rounded-lg p-2 my-1 flex gap-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <div className="flex-1 flex flex-col">
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-3 w-1/3" />
              </div>
            </div>
          ))
        ) : mappedNotifications.length === 0 ? (
          <Nodata
            title={t('notification.nodata.title')}
            description={t('notification.nodata.desc')}
            className="py-8"
          />
        ) : (
          mappedNotifications.map((notification, index) => (
            <div key={notification.id}>
              <div
                className={`rounded-lg p-2 my-1 flex gap-2 hover:bg-gray-50 transition-colors cursor-pointer ${
                  notification.isRead ? '' : 'bg-blue-50/30'
                }`}
                onClick={() => {
                  if (notification.originalData) {
                    markReadMutation.mutate(notification.originalData.id)
                    handleNotificationClick(notification.originalData)
                  }
                }}
              >
                {/* Icon */}
                {renderNotificationIcon(notification.type)}

                {/* Content */}
                <div className="flex-1 flex flex-col">
                  <p
                    className={`text-sm mb-1 ${
                      notification.isRead
                        ? 'text-gray-700'
                        : 'text-gray-900 font-medium'
                    }`}
                  >
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
