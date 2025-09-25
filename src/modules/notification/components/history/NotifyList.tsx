'use client'

import { Nodata } from '@/core/components/common'
import { useNavigate } from '@/locale'
import { useGetListNotifications } from '@/services/notification'
import { useMarkNotificationRead } from '@/services/notification/queries'
import type {
  NotificationItem as ApiNotificationItem,
  ListNotificationsParams,
} from '@/services/notification/type'
import moment from 'moment'
import { useTranslations } from 'next-intl'
import { useEffect, useMemo, useState } from 'react'
import { useNotificationFilter } from '../../stores/useNotificationFilter'
import { formatNotificationTimeI18n, renderNotificationIcon } from '../../utils'
import { useNotificationHandler } from '../../utils/notificationHandler'
import { NotificationItem } from '../popup/NotifyPopup'
import { Skeleton } from '@/components/ui/skeleton'

const NotifyList = () => {
  const t = useTranslations()
  const { activeTab, dateRange } = useNotificationFilter()

  const { handleNotificationClick } = useNotificationHandler({})
  const markReadMutation = useMarkNotificationRead()

  const [params, setParams] = useState<ListNotificationsParams>({
    current_page: 1,
    per_page: 10,
  })

  const { data, refetch, isLoading } = useGetListNotifications({
    ...params,
    status: activeTab,
    date_start: dateRange.from
      ? moment(dateRange.from).format('DD/MM/YYYY')
      : undefined,
    date_end: dateRange.to
      ? moment(dateRange.to).format('DD/MM/YYYY')
      : undefined,
  })

  // Refetch khi filter thay đổi
  useEffect(() => {
    refetch()
  }, [activeTab, dateRange.from, dateRange.to, refetch])

  const mappedNotifications = useMemo<NotificationItem[]>(() => {
    const items: ApiNotificationItem[] = data?.data ?? []

    const mapType = (objectType?: string): NotificationItem['type'] => {
      if (!objectType) return 'review_submitted'
      const type = objectType.toLowerCase()
      if (type.includes('trial')) return 'trial_registered'
      if (type.includes('approved')) return 'review_approved'
      if (type.includes('like')) return 'review_liked'
      return 'review_submitted'
    }

    return items.map((n) => ({
      id: String(n.id),
      type: mapType(n.object_type),
      content: n.content || n.json_data?.content || n.title || '',
      timestamp: new Date(n.created_at),
      isRead: n.is_read === 1,
      originalData: n, // Store original API data for handler
    }))
  }, [data])

  const currentPage = data?.meta?.current_page ?? params.current_page
  const lastPage = data?.meta?.last_page ?? 1

  const handlePrev = () => {
    if (currentPage <= 1) return
    setParams((p) => ({ ...p, current_page: currentPage - 1 }))
  }

  const handleNext = () => {
    if (currentPage >= lastPage) return
    setParams((p) => ({ ...p, current_page: currentPage + 1 }))
  }

  const isEmpty = mappedNotifications.length === 0

  return (
    <div className="">
      {isLoading ? (
        <div className="pt-2 flex flex-col pb-12 lg:pb-0 lg:max-h-[56vh] 2xl:max-h-[65vh] overflow-y-auto">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="border-t first:border-t-0 border-gray-100 border-dashed"
            >
              <div className="py-5 px-2 flex gap-2">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex-1 flex flex-col">
                  <Skeleton className="h-4 w-2/3 mb-2" />
                  <Skeleton className="h-3 w-1/4" />
                </div>
                <div className="ml-auto">
                  <Skeleton className="h-8 w-24 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : isEmpty ? (
        <Nodata
          title={t('notification.nodata.title')}
          description={t('notification.nodata.desc')}
          className="py-16"
        />
      ) : (
        <div className="pt-2 flex flex-col pb-12 lg:pb-0 lg:max-h-[56vh] 2xl:max-h-[65vh] overflow-y-auto">
          {mappedNotifications.map((notification) => (
            <div
              key={notification.id}
              className="border-t first:border-t-0 border-gray-100 border-dashed"
            >
              <div
                className={`rounded-lg- py-5 px-2 flex gap-2 hover:bg-gray-50 transition-colors cursor-pointer ${
                  notification.isRead ? '' : 'bg-blue-50/30'
                }`}
                onClick={() => {
                  if (notification.originalData) {
                    // mark as read then navigate/handle
                    markReadMutation.mutate(notification.originalData.id)
                    handleNotificationClick(notification.originalData)
                  }
                }}
              >
                {renderNotificationIcon(notification.type)}

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
                <div className="ml-auto">
                  <button className="truncate  w-fit lg:w-full cursor-pointer px-4 py-2 text-xs bg-white text-greyscale-900 font-medium border border-greyscale-300 hover:bg-white/60 transition-colors rounded-full">
                    {t('notification.viewDetail')}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!isEmpty && (
        <div className="absolute z-20 bottom-5 left-8 right-8 flex items-center justify-center gap-6">
          <button
            onClick={handlePrev}
            disabled={currentPage <= 1}
            className="bg-white cursor-pointer px-3 py-2 text-sm rounded-lg border border-gray-300 disabled:opacity-50"
          >
            {t('notification.pagination.prev')}
          </button>
          <span className="text-sm text-gray-600">
            {t('notification.pagination.pageXofY', {
              current: currentPage,
              total: lastPage,
            })}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage >= lastPage}
            className="bg-white cursor-pointer px-3 py-2 text-sm rounded-lg border border-gray-300 disabled:opacity-50"
          >
            {t('notification.pagination.next')}
          </button>
        </div>
      )}
    </div>
  )
}

export default NotifyList
