'use client'

import { Container } from '@/core/components'
import { IMAGES } from '@/core/constants/IMAGES'
import HistoryHeader from './HistoryHeader'
import HistorySidebar from './HistorySidebar'
import HistoryTable from './HistoryTable'
import HistoryTabs from './HistoryTabs'

const HistoryReviewSection = () => {
  return (
    <div className="py-[96px] relative  overflow-hidden min-h-screen">
      <img
        src={IMAGES.topGradient2}
        alt="top-gradient"
        className="hidden lg:block absolute -z-10 top-0  w-full object-cover pointer-events-none -translate-y-1/2 scale-x-[-1.3] opacity-60"
      />
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 lg:h-[calc(100vh-162px)] items-stretch min-h-0">
          <section className="lg:col-span-8 xl:col-span-9 h-full min-h-0 order-1 md:order-1 lg:order-2">
            <div className="lg:p-5 lg:bg-white lg:rounded-2xl lg:shadow-[0px_4px_24px_0px_#0000000F] h-full flex flex-col min-h-0 relative overflow-hidden">
              <HistoryHeader />
              <HistoryTabs
                // onChange={(key) => setActiveTab(key)}
                className="mt-4"
              />
              <div className="mt-2 flex-1 min-h-0 z-10 relative">
                <HistoryTable />
              </div>

              <div className="hidden lg:block absolute -bottom-6 w-full z-8 translate-y-3/4 scale-x-[-1.8]">
                <img src={IMAGES.topGradient2} alt="bg-table" />
              </div>
            </div>
          </section>
          <aside className="hidden lg:block lg:col-span-4 xl:col-span-3 h-full min-h-0 order-2 md:order-2 lg:order-1">
            <HistorySidebar />
          </aside>
        </div>
      </Container>
    </div>
  )
}

export default HistoryReviewSection
