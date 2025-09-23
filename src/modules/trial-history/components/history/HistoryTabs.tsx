'use client'

import { useReviewStatus } from '@/services/review-status/queries'
import { useTableFilter } from '../../stores/useTableFilter'
import { useEffect, useMemo, useState } from 'react'
import { Tabs, type TabItem } from '@/core/components'

export type ReviewTab = TabItem

const HistoryTabs = ({
  onChange,
  className,
  defaultActiveKey,
}: {
  onChange?: (key: string) => void
  className?: string
  defaultActiveKey?: string
}) => {
  // Gọi hook table status và đồng bộ với bộ lọc tabs
  const { data: reviewStatusData, isLoading } = useReviewStatus()
  const { activeTab, setActiveTab } = useTableFilter()

  const tabs: TabItem[] = useMemo(() => {
    if (!reviewStatusData || !Array.isArray(reviewStatusData)) {
      return []
    }

    // Map API data to TabItem format
    return reviewStatusData.map((item) => ({
      key: item.id.toString(),
      label: item.name,
      count: item.countReview,
      color: item.color,
    }))
  }, [reviewStatusData])

  const [localActiveKey, setLocalActiveKey] = useState<string>('')

  // Set first tab as active when tabs are loaded
  useEffect(() => {
    if (tabs.length > 0 && !localActiveKey) {
      setLocalActiveKey(tabs[0].key)
      setActiveTab(tabs[0].key) // Đồng bộ với global state
    }
  }, [tabs, localActiveKey, setActiveTab])

  // Handle defaultActiveKey prop
  useEffect(() => {
    if (defaultActiveKey) {
      setLocalActiveKey(defaultActiveKey)
      setActiveTab(defaultActiveKey) // Đồng bộ với global state
    }
  }, [defaultActiveKey, setActiveTab])

  // Sync local state with global state
  useEffect(() => {
    if (activeTab && activeTab !== localActiveKey) {
      setLocalActiveKey(activeTab)
    }
  }, [activeTab, localActiveKey])

  const handleChange = (key: string) => {
    setLocalActiveKey(key)
    setActiveTab(key) // Cập nhật global state
    onChange?.(key)
  }

  return (
    <Tabs
      items={tabs}
      activeKey={localActiveKey}
      onChange={handleChange}
      loading={isLoading}
      className={className}
      loadingSkeletonCount={5}
      activeIndicatorColor="#ea4b8b"
    />
  )
}

export default HistoryTabs
