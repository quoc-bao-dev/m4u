'use client'

import React from 'react'
import RewardCard from './RewardCard'

const RewardSection = () => {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null)

  return (
    <div className="py-[96px]">
      <h1 className="text-[32px] md:text-[64px] text-gray-700 font-bold text-center">
        ✨ Khám phá những ưu đãi đặc biệt
      </h1>
      <p className="text-[18px] md:text-[24px] text-gray-700 text-center">
        Trải nghiệm các sản phẩm hot nhất mà không tốn một xu.
      </p>

      <div className="mt-10 flex flex-col md:flex-row items-stretch justify-center gap-6 md:gap-8">
        <RewardCard
          icon={<span>🏷️</span>}
          label="Giảm giá sản phẩm"
          title="50%"
          bgColor="bg-emerald-50"
          iconColor="text-emerald-500"
          isActive={activeIndex === 0}
          isDimmed={activeIndex !== null && activeIndex !== 0}
          onMouseEnter={() => setActiveIndex(0)}
          onMouseLeave={() => setActiveIndex(null)}
        />

        <RewardCard
          icon={<span>🎫</span>}
          label="Voucher mua hàng"
          title="9,000+"
          bgColor="bg-amber-50"
          iconColor="text-amber-500"
          isActive={activeIndex === 1}
          isDimmed={activeIndex !== null && activeIndex !== 1}
          onMouseEnter={() => setActiveIndex(1)}
          onMouseLeave={() => setActiveIndex(null)}
        />

        <RewardCard
          icon={<span>🤝</span>}
          label="Chiết khấu lên đến"
          title="20%"
          bgColor="bg-sky-50"
          iconColor="text-sky-500"
          isActive={activeIndex === 2}
          isDimmed={activeIndex !== null && activeIndex !== 2}
          onMouseEnter={() => setActiveIndex(2)}
          onMouseLeave={() => setActiveIndex(null)}
        />
      </div>
    </div>
  )
}

export default RewardSection
