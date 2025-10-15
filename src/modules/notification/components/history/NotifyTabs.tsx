'use client'

import { Tabs as CoreTabs, type TabItem } from '@/core/components'
import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import {
  useGetStatusNotification,
  useMarkAllAsRead,
} from '@/services/notification/queries'
import { StatusNotificationItem } from '@/services/notification/type'
import { useNotificationFilter } from '../../stores/useNotificationFilter'

const NotifyTabs = ({
  onChange,
  className,
  defaultActiveKey,
}: {
  onChange?: (key: string) => void
  className?: string
  defaultActiveKey?: string
}) => {
  const t = useTranslations()
  const { data: statusData, isLoading, error } = useGetStatusNotification()
  const { activeTab, setActiveTab } = useNotificationFilter()
  const markAllAsReadMutation = useMarkAllAsRead()

  // Map API data to TabItem format
  const tabs: TabItem[] =
    statusData?.data?.map((item: StatusNotificationItem) => ({
      key: item.id,
      label: item.name,
      count: item.count,
      color: item.color, // Lấy màu từ API
    })) || []

  const [localActiveKey, setLocalActiveKey] = useState<string>('')

  // Set default active tab khi data load xong
  useEffect(() => {
    if (tabs.length > 0) {
      // Nếu có defaultActiveKey và nó tồn tại trong tabs, dùng nó
      if (
        defaultActiveKey &&
        tabs.some((tab) => tab.key === defaultActiveKey)
      ) {
        setLocalActiveKey(defaultActiveKey)
        setActiveTab(defaultActiveKey)
      }
      // Nếu chưa có activeKey hoặc defaultActiveKey không hợp lệ, dùng tab đầu tiên
      else if (
        !localActiveKey ||
        !tabs.some((tab) => tab.key === localActiveKey)
      ) {
        setLocalActiveKey(tabs[0].key)
        setActiveTab(tabs[0].key)
      }
    }
  }, [tabs, defaultActiveKey, setActiveTab])

  // Sync với store khi activeTab thay đổi từ bên ngoài
  useEffect(() => {
    if (activeTab && activeTab !== localActiveKey) {
      setLocalActiveKey(activeTab)
    }
  }, [activeTab, localActiveKey])

  const handleChange = (key: string) => {
    setLocalActiveKey(key)
    setActiveTab(key)
    onChange?.(key)
  }

  const handleMarkReadAll = async () => {
    try {
      await markAllAsReadMutation.mutateAsync()
      // Có thể thêm toast notification ở đây nếu cần
    } catch (error) {
      console.error('Error marking all notifications as read:', error)
      // Có thể thêm error handling ở đây nếu cần
    }
  }

  // Right element for "Mark Read All" button
  const rightElement = (
    <button
      onClick={handleMarkReadAll}
      className={`text-[14px] font-medium transition-colors cursor-pointer ${
        markAllAsReadMutation.isPending
          ? 'text-[#2563EB]/40 cursor-not-allowed'
          : 'text-[#3B82F6] hover:text-[#2563EB]'
      }`}
    >
      {t('notification.actions.markReadAll')}
    </button>
  )

  // Show loading state
  if (isLoading) {
    return (
      <div className={`${className} flex items-center justify-center py-4`}>
        <div className="text-sm text-gray-500">Loading...</div>
      </div>
    )
  }

  // Show error state
  if (error) {
    return (
      <div className={`${className} flex items-center justify-center py-4`}>
        <div className="text-sm text-red-500">Error loading notifications</div>
      </div>
    )
  }

  // Show empty state if no data
  if (!tabs.length) {
    return (
      <div className={`${className} flex items-center justify-center py-4`}>
        <div className="text-sm text-gray-500">No notifications available</div>
      </div>
    )
  }

  return (
    <CoreTabs
      items={tabs}
      activeKey={localActiveKey}
      onChange={handleChange}
      className={className}
      rightElement={rightElement}
    />
  )
}

export default NotifyTabs
