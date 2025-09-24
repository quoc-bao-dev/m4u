'use client'

import { DateRangePicker } from '@/core/components/ui/date-range-picker/DateRangePicker'
import { useTranslations } from 'next-intl'

const NotifyHeader = () => {
  const t = useTranslations()
  const handleDateRangeChange = () => {
    // Empty arrow function - no functionality
  }

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <h2 className="text-[18px] xl:text-[24px] leading-7 font-bold text-greyscale-900">
        {t('notification.title')}
      </h2>

      <div className="flex flex-col lg:flex-row items-center gap-2">
        <div className="w-full lg:w-[260px] items-center gap-2 px-1">
          <DateRangePicker onChange={handleDateRangeChange} />
        </div>
      </div>
    </div>
  )
}

export default NotifyHeader
