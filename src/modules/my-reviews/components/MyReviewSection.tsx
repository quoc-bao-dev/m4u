'use client'

import { Container } from '@/core/components'
import { useMemo } from 'react'
import MyReviewSidebar from './MyReviewSidebar'
import MyReviewsHeader from './MyReviewsHeader'
import MyReviewsTable from './MyReviewsTable'
import MyReviewsTabs, { type ReviewTab } from './MyReviewsTabs'
import { IMAGES } from '@/core/constants/IMAGES'

const MyReviewSection = () => {
  //   const [activeTab, setActiveTab] = useState<string>('all')
  const tabs: ReviewTab[] = useMemo(
    () => [
      { key: 'all', label: 'All', count: 132, color: 'pink' },
      { key: 'in_review', label: 'In review', count: 32, color: 'violet' },
      { key: 'accepted', label: 'Accepted', count: 48, color: 'sky' },
      { key: 'reward_paid', label: 'Reward paid', count: 23, color: 'emerald' },
      { key: 'rejected', label: 'Rejected', count: 12, color: 'orange' },
    ],
    []
  )
  return (
    <div className="py-[96px] relative  overflow-hidden ">
      <img
        src={IMAGES.topGradient2}
        alt="top-gradient"
        className="absolute -z-10 top-0  w-full object-cover pointer-events-none -translate-y-1/2 scale-x-[-1.3] opacity-60"
      />
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
          <aside className="lg:col-span-3">
            <MyReviewSidebar />
          </aside>
          <section className="lg:col-span-9">
            <div className="p-5 bg-white rounded-2xl shadow-[0px_4px_24px_0px_#0000000F]">
              <MyReviewsHeader />
              <MyReviewsTabs
                tabs={tabs}
                // onChange={(key) => setActiveTab(key)}
                className="mt-4"
              />
              <MyReviewsTable />
            </div>
          </section>
        </div>
      </Container>
    </div>
  )
}

export default MyReviewSection
