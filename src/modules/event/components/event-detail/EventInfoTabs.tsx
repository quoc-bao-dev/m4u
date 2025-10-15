'use client'

import { useState, useEffect } from 'react'
import DetailTabs from './DetailTabs'
import EventContentRenderer from './EventContentRenderer'

type EventInfo = {
  title: string
  content: string
  keyIndex: number
  language: string
}

type EventInfoTabsProps = {
  infoEvent: EventInfo[]
}

const EventInfoTabs = ({ infoEvent }: EventInfoTabsProps) => {
  const [activeTab, setActiveTab] = useState<string>('')

  // Lọc ra các tab có nội dung (content không rỗng)
  const validInfoEvent = infoEvent.filter(
    (info) => info.content && info.content.trim() !== ''
  )

  // Tạo tabs từ infoEvent đã lọc
  const tabs = validInfoEvent.map((info) => info.title)

  // Tìm nội dung của tab đang active
  const activeContent =
    validInfoEvent.find((info) => info.title === activeTab)?.content || ''

  // Set default active tab khi component mount
  useEffect(() => {
    if (tabs.length > 0 && !activeTab) {
      setActiveTab(tabs[0])
    }
  }, [tabs, activeTab])

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  // Nếu không có tab nào có nội dung thì ẩn toàn bộ component
  if (validInfoEvent.length === 0) {
    return null
  }

  return (
    <div className="w-full">
      {/* Tabs */}
      <DetailTabs
        tabs={tabs}
        defaultActive={tabs[0]}
        onChange={handleTabChange}
      />

      {/* Content với custom renderer */}
      <EventContentRenderer htmlContent={activeContent} />
    </div>
  )
}

export default EventInfoTabs
