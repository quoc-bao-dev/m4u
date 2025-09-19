import { HistoryHeader, HistoryTable, HistoryTabs } from '@/modules/my-reviews'
import React from 'react'

const Page = () => {
  return (
    <>
      <HistoryHeader />
      <HistoryTabs
        // onChange={(key) => setActiveTab(key)}
        className="mt-4"
      />
      <div className="mt-2 z-10 relative">
        <HistoryTable />
      </div>
    </>
  )
}

export default Page
