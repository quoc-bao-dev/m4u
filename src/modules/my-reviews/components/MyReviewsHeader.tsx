'use client'

import { DatePicker } from '@/core/components'
import { MagnifyingGlass, SlidersHorizontal } from '@phosphor-icons/react'
import React from 'react'

const MyReviewsHeader = () => {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <h2 className="text-[24px] leading-7 font-bold text-greyscale-900">
        Trial registration history
      </h2>

      <div className="flex items-center gap-2 w-full md:w-auto">
        {/* Search placeholder */}
        <div className="flex-1 md:w-[360px] relative">
          <MagnifyingGlass
            size={18}
            weight="bold"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-greyscale-400"
          />
          <input
            type="text"
            placeholder="Search product, review, date, etc"
            className="w-full pl-9 pr-3 h-10 border-b border-greyscale-200 "
          />
        </div>

        {/* Date picker placeholder */}
        <div className="hidden md:flex items-center gap-2">
          <DatePicker />
          <span className="text-greyscale-400">–</span>
          <DatePicker />
        </div>
      </div>
    </div>
  )
}

export default MyReviewsHeader
