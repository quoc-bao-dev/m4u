'use client'

import { DateRangePicker } from '@/core/components'
import { useTableFilter } from '../../stores/useTableFilter'
import { MagnifyingGlass } from '@phosphor-icons/react'
import { useState } from 'react'

const HistoryHeader = () => {
  // Gọi hook table status và đồng bộ với bộ lọc search và date range
  const { searchQuery, setSearchQuery, dateRange, setDateRange } =
    useTableFilter()
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery)

  const handleSearchChange = (value: string) => {
    setLocalSearchQuery(value)
    setSearchQuery(value)
  }

  const handleDateRangeChange = (value: { from?: string; to?: string }) => {
    const from = value.from ? new Date(value.from) : undefined
    const to = value.to ? new Date(value.to) : undefined
    setDateRange(from, to)
  }

  // Convert date range to string format for DateRangePicker
  const dateRangeValue = {
    from: dateRange.from?.toISOString().split('T')[0],
    to: dateRange.to?.toISOString().split('T')[0],
  }

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <h2 className="text-[18px] xl:text-[24px] leading-7 font-bold text-greyscale-900">
        Trial registration history
      </h2>

      <div className="flex flex-col lg:flex-row items-center gap-2 w-full md:w-auto">
        {/* Search placeholder */}
        <div className=" w-full lg:w-auto  flex-1 md:w-[360px] relative">
          <MagnifyingGlass
            size={18}
            weight="bold"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-greyscale-400"
          />
          <input
            type="text"
            placeholder="Search product, review, date, etc"
            value={localSearchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-9 pr-3 h-10 border-b border-greyscale-200 placeholder:italic focus:outline-none focus:border-b-2 focus:border-greyscale-400"
          />
        </div>

        {/* Date picker */}
        <div className="w-full lg:w-auto items-center gap-2 px-1">
          <DateRangePicker
            value={dateRangeValue}
            onChange={handleDateRangeChange}
          />
        </div>
      </div>
    </div>
  )
}

export default HistoryHeader
