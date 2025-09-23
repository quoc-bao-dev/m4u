'use client'

import { useReviewStatus } from '@/services/review-status/queries'
import { useTableFilter } from '../stores/useTableFilter'
import { useEffect, useMemo, useState } from 'react'
import { Tabs as CoreTabs, type TabItem } from '@/core/components'

const MyReviewTabs = ({
  onChange,
  className,
  defaultActiveKey,
}: {
  onChange?: (key: string) => void
  className?: string
  defaultActiveKey?: string
}) => {
  const { data: reviewStatusData, isLoading } = useReviewStatus()
  const { activeTab, setActiveTab } = useTableFilter()

  const tabs: TabItem[] = useMemo(() => {
    if (!reviewStatusData || !Array.isArray(reviewStatusData)) {
      return []
    }

    return reviewStatusData.map((item) => ({
      key: item.id.toString(),
      label: item.name,
      count: item.countReview,
      color: item.color,
    }))
  }, [reviewStatusData])

  const [localActiveKey, setLocalActiveKey] = useState<string>('')

  useEffect(() => {
    if (tabs.length > 0 && !localActiveKey) {
      setLocalActiveKey(tabs[0].key)
      setActiveTab(tabs[0].key)
    }
  }, [tabs, localActiveKey, setActiveTab])

  useEffect(() => {
    if (defaultActiveKey) {
      setLocalActiveKey(defaultActiveKey)
      setActiveTab(defaultActiveKey)
    }
  }, [defaultActiveKey, setActiveTab])

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

  return (
    <CoreTabs
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

export default MyReviewTabs
