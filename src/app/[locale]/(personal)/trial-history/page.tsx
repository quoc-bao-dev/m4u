import { HistoryHeader, HistoryTable, HistoryTabs } from '@/modules/my-reviews'

const Page = () => {
  return (
    <>
      <HistoryHeader />
      <HistoryTabs className="mt-4" />
      <div className="mt-2 z-10 relative">
        <HistoryTable />
      </div>
    </>
  )
}

export default Page
