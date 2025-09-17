'use client'

import React, { useMemo, useState } from 'react'

export type ReviewTab = {
  key: string
  label: string
  count?: number
  color?: 'pink' | 'violet' | 'sky' | 'emerald' | 'orange'
}

const MyReviewsTabs = ({
  tabs,
  onChange,
  className,
  defaultActiveKey,
}: {
  tabs: ReviewTab[]
  onChange?: (key: string) => void
  className?: string
  defaultActiveKey?: string
}) => {
  const initial = useMemo(
    () => defaultActiveKey || (tabs.length ? tabs[0].key : ''),
    [defaultActiveKey, tabs]
  )
  const [activeKey, setActiveKey] = useState<string>(initial)

  const handleClick = (key: string) => {
    setActiveKey(key)
    onChange?.(key)
  }

  return (
    <div className={`w-full border-b border-gray-300 ${className ?? ''}`}>
      <div className="flex items-center gap-6 relative pt-4">
        {tabs.map((tab) => {
          const isActive = activeKey === tab.key
          const colorClass = (() => {
            switch (tab.color) {
              case 'violet':
                return 'bg-violet-50 text-violet-600'
              case 'sky':
                return 'bg-sky-50 text-sky-600'
              case 'emerald':
                return 'bg-emerald-50 text-emerald-600'
              case 'orange':
                return 'bg-orange-50 text-orange-600'
              case 'pink':
              default:
                return 'bg-pink-50 text-pink-600'
            }
          })()
          return (
            <button
              key={tab.key}
              className={
                'relative pb-3 text-[18px] transition-colors ' +
                (isActive
                  ? 'text-gray-900 font-semibold'
                  : 'text-gray-400 hover:text-gray-600')
              }
              onClick={() => handleClick(tab.key)}
            >
              <span className="inline-flex items-center gap-2">
                <span>{tab.label}</span>
                {typeof tab.count === 'number' && (
                  <span
                    className={
                      'inline-flex py-1 min-w-5 items-center justify-center rounded-md px-2 text-sm font-semibold ' +
                      colorClass
                    }
                  >
                    {tab.count}
                  </span>
                )}
              </span>
              {isActive && (
                <span className="absolute -bottom-[2px] left-0 right-0 h-[3px] rounded-t-full bg-pink-600" />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default MyReviewsTabs
