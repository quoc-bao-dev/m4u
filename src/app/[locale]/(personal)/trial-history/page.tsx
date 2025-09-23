import {
  HistoryHeader,
  HistoryTable,
  HistoryTabs,
} from '@/modules/trial-history'

const Page = () => {
  return (
    <>
      <HistoryHeader />
      <HistoryTabs className="mt-4" />
      <div className="mt-8 z-10 relative">
        <HistoryTable />
      </div>
    </>
  )
}

export default Page
