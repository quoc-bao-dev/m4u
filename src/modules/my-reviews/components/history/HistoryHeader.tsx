'use client'

import { DateRangePicker } from '@/core/components/ui/date-range-picker/DateRangePicker'
import { MagnifyingGlass, XCircle } from '@phosphor-icons/react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { useTableFilter } from '../../stores/useTableFilter'
import { useDebouncedCallback } from '@/core/hooks/useDebounce'

const HistoryHeader = () => {
  const t = useTranslations()
  // Gọi hook table status và đồng bộ với bộ lọc search và date range
  const { searchQuery, setSearchQuery, dateRange, setDateRange } =
    useTableFilter()
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery)

  const handleSearchChange = (value: string) => {
    setLocalSearchQuery(value)
  }

  const debouncedSetSearchQuery = useDebouncedCallback((value: string) => {
    setSearchQuery(value)
  }, 400)

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

  console.log(dateRangeValue)

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <h2 className="text-[18px] xl:text-[24px] leading-7 font-bold text-greyscale-900">
        {t('myReviews.history.header.title')}
      </h2>

      <div className="flex flex-col lg:flex-row items-center gap-2 ">
        {/* Search placeholder */}
        <div className=" w-full md:w-[340px] flex-1  relative">
          <MagnifyingGlass
            size={18}
            weight="bold"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-greyscale-200"
          />
          <input
            type="text"
            placeholder={t('myReviews.history.header.searchPlaceholder')}
            value={localSearchQuery}
            onChange={(e) => {
              const v = e.target.value
              handleSearchChange(v)
              debouncedSetSearchQuery(v)
            }}
            className="w-full pl-9 pr-9 h-10 border-b border-greyscale-200 placeholder:italic focus:outline-none focus:border-b-[2px] focus:border-greyscale-300"
          />
          {localSearchQuery && localSearchQuery.length > 0 && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => {
                handleSearchChange('')
                debouncedSetSearchQuery('')
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-greyscale-300 hover:text-greyscale-500"
            >
              <XCircle size={16} weight="bold" />
            </button>
          )}
        </div>

        {/* Date picker */}
        <div className="w-full lg:w-auto items-center gap-2 px-1">
          <DateRangePicker />
        </div>
      </div>
    </div>
  )
}

export default HistoryHeader
