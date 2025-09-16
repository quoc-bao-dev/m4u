'use client'

import { useState } from 'react'

type DetailTabsProps = {
  tabs: string[]
  defaultActive?: string
  onChange?: (active: string) => void
  className?: string
}

const DetailTabs = ({
  tabs,
  defaultActive,
  onChange,
  className,
}: DetailTabsProps) => {
  const [active, setActive] = useState<string>(defaultActive ?? tabs[0] ?? '')

  const handleClick = (tab: string) => {
    setActive(tab)
    onChange?.(tab)
  }

  return (
    <div className={`w-full border-b border-gray-300 ${className ?? ''}`}>
      <div className="flex items-center gap-6 relative pt-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={
              'relative pb-3 text-[18px] transition-colors ' +
              (active === tab
                ? 'text-gray-900 font-semibold'
                : 'text-gray-400 hover:text-gray-600')
            }
            onClick={() => handleClick(tab)}
          >
            {tab}
            {active === tab && (
              <span className="absolute -bottom-[2px] left-0 right-0 h-[3px] rounded-t-full bg-pink-600" />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

export default DetailTabs
