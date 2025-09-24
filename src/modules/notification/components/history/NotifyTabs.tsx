'use client'

import { Tabs as CoreTabs, type TabItem } from '@/core/components'
import { useState } from 'react'
import { useTranslations } from 'next-intl'

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
  // Mock data for notification tabs
  const tabs: TabItem[] = [
    {
      key: 'all',
      label: t('notification.tabs.all'),
      count: 4,
      color: '#FE6BBA', // Pink color
    },
    {
      key: 'reviews',
      label: t('notification.tabs.reviews'),
      count: 3,
      color: '#8B5CF6', // Purple color
    },
    {
      key: 'products',
      label: t('notification.tabs.products'),
      count: 1,
      color: '#3B82F6', // Blue color
    },
  ]

  const [localActiveKey, setLocalActiveKey] = useState<string>(
    defaultActiveKey || tabs[0].key
  )

  const handleChange = () => {
    // Empty arrow function - no functionality
    onChange?.('')
  }

  const handleMarkReadAll = () => {
    // Empty arrow function - no functionality
  }

  // Right element for "Mark Read All" button
  const rightElement = (
    <button
      onClick={handleMarkReadAll}
      className="text-[14px] font-medium text-[#3B82F6] hover:text-[#2563EB] transition-colors cursor-pointer"
    >
      {t('notification.actions.markReadAll')}
    </button>
  )

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
