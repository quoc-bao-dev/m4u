'use client'

import { useReviewStatus } from '@/services/review-status/queries'
import { useTableFilter } from '../../stores/useTableFilter'
import { useEffect, useMemo, useState } from 'react'

export type ReviewTab = {
  key: string
  label: string
  count?: number
  color?: string
}

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

  const tabs: ReviewTab[] = useMemo(() => {
    if (!reviewStatusData || !Array.isArray(reviewStatusData)) {
      return []
    }

    // Map API data to ReviewTab format
    return reviewStatusData.map((item, index) => ({
      key: item.id.toString(),
      label: item.name,
      count: item.countReview, // You may need to get actual counts from another API
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

  const handleClick = (key: string) => {
    setLocalActiveKey(key)
    setActiveTab(key) // Cập nhật global state
    onChange?.(key)
  }

  // Skeleton loading state
  if (isLoading) {
    return (
      <div className={`w-full border-b border-gray-300 ${className ?? ''}`}>
        <div className="flex items-center gap-6 relative pt-4 overflow-x-auto custom-scrollbar">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="relative pb-3 animate-pulse">
              <div className="flex items-center gap-2">
                <div className="h-6 bg-gray-200 rounded w-20"></div>
                <div className="h-6 w-8 bg-gray-200 rounded-md"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={`w-full relative  ${className ?? ''}`}>
      <div className="absolute bottom-0 h-[1.5px] bg-gray-200 w-full"></div>
      <div className="flex items-center gap-6 relative pt-4 overflow-x-auto overflow-y-hidden custom-scrollbar ">
        {tabs.map((tab) => {
          const isActive = localActiveKey === tab.key
          return (
            <button
              key={tab.key}
              className={
                'relative pb-3 text-[16px] transition-colors cursor-pointer' +
                (isActive
                  ? 'text-gray-900 font-semibold'
                  : 'text-gray-400 hover:text-gray-600')
              }
              onClick={() => handleClick(tab.key)}
            >
              <span className="inline-flex items-center gap-2">
                <span className="truncate">{tab.label}</span>
                {typeof tab.count === 'number' && (
                  <span
                    className={
                      'inline-flex py-0.5 min-w-5 items-center justify-center rounded-md px-2 text-sm font-semibold text-white'
                    }
                    style={{ backgroundColor: tab.color || '#ea4b8b' }}
                  >
                    {tab.count}
                  </span>
                )}
              </span>
              {isActive && (
                <span
                  className="absolute z-10 -bottom-[2px] left-0 right-0 h-[6px] rounded-t-full"
                  style={{ backgroundColor: tab.color || '#ea4b8b' }}
                />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default HistoryTabs
