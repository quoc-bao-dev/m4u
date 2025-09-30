'use client'

import { BottomSection, TopSection } from '@/modules/help-centre'

const Page = () => {
  return (
    <div className="pt-[64px] md:pt-[120px] pb-[48px] md:pb-[96px] overflow-x-hidden">
      <div className="w-full absolute top-0 -z-10">
        <img
          src="/image/event/image-blur-01.png"
          alt=""
          className="w-full object-cover"
        />
      </div>

      {/* Top info section */}
      <TopSection />

      {/* Bottom section */}
      <BottomSection />
    </div>
  )
}

export default Page
