'use client'

import { ReactNode } from 'react'

export type TabItem = {
  key: string
  label: string
  count?: number
  color?: string
}

export interface TabsProps {
  items: TabItem[]
  activeKey?: string
  onChange?: (key: string) => void
  className?: string
  loading?: boolean
  loadingSkeletonCount?: number
  activeIndicatorColor?: string
  countBackgroundColor?: string
  renderTabContent?: (tab: TabItem, isActive: boolean) => ReactNode
}

const Tabs = ({
  items,
  activeKey,
  onChange,
  className,
  loading = false,
  loadingSkeletonCount = 5,
  activeIndicatorColor = '#ea4b8b',
  countBackgroundColor,
  renderTabContent,
}: TabsProps) => {
  const handleClick = (key: string) => {
    onChange?.(key)
  }

  // Skeleton loading state
  if (loading) {
    return (
      <div className={`w-full border-b border-gray-300 ${className ?? ''}`}>
        <div className="flex items-center gap-6 relative pt-4 overflow-x-auto custom-scrollbar">
          {Array.from({ length: loadingSkeletonCount }).map((_, index) => (
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
    <div className={`w-full relative ${className ?? ''}`}>
      <div className="absolute bottom-0 h-[1.5px] bg-gray-200 w-full"></div>
      <div className="flex items-center gap-6 relative pt-4 overflow-x-auto overflow-y-hidden custom-scrollbar">
        {items.map((tab) => {
          const isActive = activeKey === tab.key

          // Use custom render function if provided
          if (renderTabContent) {
            return (
              <button
                key={tab.key}
                className="relative pb-3 transition-colors cursor-pointer"
                onClick={() => handleClick(tab.key)}
              >
                {renderTabContent(tab, isActive)}
                {isActive && (
                  <span
                    className="absolute z-10 -bottom-[2px] left-0 right-0 h-[6px] rounded-t-full"
                    style={{ backgroundColor: activeIndicatorColor }}
                  />
                )}
              </button>
            )
          }

          // Default tab rendering
          return (
            <button
              key={tab.key}
              className={
                'relative pb-3 text-[16px] transition-colors cursor-pointer ' +
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
                    className="inline-flex py-0.5 min-w-5 items-center justify-center rounded-md px-2 text-sm font-semibold text-white"
                    style={{
                      backgroundColor:
                        countBackgroundColor ||
                        tab.color ||
                        activeIndicatorColor,
                    }}
                  >
                    {tab.count}
                  </span>
                )}
              </span>
              {isActive && (
                <span
                  className="absolute z-10 -bottom-[2px] left-0 right-0 h-[6px] rounded-t-full"
                  style={{ backgroundColor: activeIndicatorColor }}
                />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default Tabs
