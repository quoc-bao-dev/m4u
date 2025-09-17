'use client'

import { MagnifyingGlass, SlidersHorizontal } from '@phosphor-icons/react'
import React from 'react'

const MyReviewsHeader = () => {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <h2 className="text-[24px] leading-7 font-bold text-greyscale-900">
        My reviews
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
            className="w-full pl-9 pr-3 h-10 rounded-lg border border-greyscale-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-100"
          />
        </div>

        {/* Filter placeholder */}
        <button
          type="button"
          className="inline-flex items-center gap-2 h-10 px-3 rounded-lg border border-greyscale-200 text-sm text-greyscale-700 bg-white hover:bg-gray-50"
        >
          <SlidersHorizontal size={16} />
          <span>Filter</span>
        </button>

        {/* Date picker placeholder */}
        <div className="hidden md:flex items-center gap-2">
          <input
            type="date"
            className="h-10 rounded-lg border border-greyscale-200 text-sm px-3 bg-white"
          />
          <span className="text-greyscale-400">–</span>
          <input
            type="date"
            className="h-10 rounded-lg border border-greyscale-200 text-sm px-3 bg-white"
          />
        </div>
      </div>
    </div>
  )
}

export default MyReviewsHeader
