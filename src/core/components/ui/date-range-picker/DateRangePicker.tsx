'use client'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { CalendarBlank } from '@phosphor-icons/react'
import moment from 'moment'
import { useTranslations } from 'next-intl'
import * as React from 'react'

export function DateRangePicker({
  onChange,
}: {
  onChange?: (range: { from: string; to: string }) => void
}) {
  const t = useTranslations()
  const [date, setDate] = React.useState<{ from?: Date; to?: Date }>({})
  const [hoverDay, setHoverDay] = React.useState<Date | null>(null)
  const [open, setOpen] = React.useState(false)

  const handleSelect = (day: Date) => {
    if (!date.from || (date.from && date.to)) {
      setDate({ from: day, to: undefined }) // reset chọn lại
      setHoverDay(null)
    } else if (day < date.from) {
      setDate({ from: day, to: date.from })
      setHoverDay(null)
    } else {
      setDate({ ...date, to: day })
      setHoverDay(null)
    }
  }

  const handleCancel = () => {
    setDate({})
    setHoverDay(null)
    setOpen(false)
  }

  const handleApply = () => {
    if (date.from && date.to) {
      // Ensure from is always before to
      const startDate = date.from <= date.to ? date.from : date.to
      const endDate = date.from <= date.to ? date.to : date.from

      onChange?.({
        from: moment(startDate).format('YYYY-MM-DD'),
        to: moment(endDate).format('YYYY-MM-DD'),
      })
    }
    setOpen(false)
  }

  const inRange = React.useCallback(
    (day: Date) => {
      if (date.from && !date.to && hoverDay) {
        const start = date.from <= hoverDay ? date.from : hoverDay
        const end = date.from <= hoverDay ? hoverDay : date.from
        return day >= start && day <= end
      }
      if (date.from && date.to) {
        return day >= date.from && day <= date.to
      }
      return false
    },
    [date.from, date.to, hoverDay]
  )

  const handleMouseEnter = (day: Date) => {
    if (!hoverDay || hoverDay.getTime() !== day.getTime()) {
      setHoverDay(day)
    }
  }

  return (
    <div className="w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button className="flex w-full items-center justify-between border rounded-lg px-3 py-2 text-sm text-gray-700">
            <span className="w-full flex items-center justify-between pr-4">
              <div>
                {' '}
                {date.from
                  ? moment(date.from).format('DD/MM/YYYY')
                  : t('dateRangePicker.from')}
              </div>{' '}
              →{' '}
              <div className="">
                {date.to
                  ? moment(date.to).format('DD/MM/YYYY')
                  : t('dateRangePicker.to')}
              </div>
            </span>
            <CalendarBlank size={24} className="text-greyscale-500" />
          </button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0">
          <div className="flex flex-col">
            <Calendar
              mode="single"
              onDayClick={handleSelect}
              onDayMouseEnter={handleMouseEnter}
              onDayMouseLeave={() => setHoverDay(null)}
              className="p-3"
              modifiers={{
                range: inRange,
                start: (day) =>
                  !!(date.from && day.getTime() === date.from.getTime()),
                end: (day) =>
                  !!(date.to && day.getTime() === date.to.getTime()),
                onlyStart: (day) =>
                  !!(
                    date.from &&
                    !date.to &&
                    day.getTime() === date.from.getTime()
                  ),
              }}
              modifiersClassNames={{
                // dải liền mạch cho mọi ngày nằm trong khoảng
                range: 'bg-pink-100 text-pink-700',

                // ngày bắt đầu: tròn full, overlay hồng đậm
                start: 'bg-pink-500 text-white rounded-full',

                // ngày kết thúc: tròn full, overlay hồng đậm
                end: 'bg-pink-500 text-white rounded-full',

                // chỉ chọn from: tròn full
                onlyStart: 'bg-pink-500 text-white rounded-full',
              }}
            />

            <div className="flex justify-end gap-2 border-t px-4 py-2">
              <Button
                variant="ghost"
                onClick={handleCancel}
                className="rounded-full"
              >
                {t('dateRangePicker.cancel')}
              </Button>
              <Button
                className="bg-pink-500 hover:bg-pink-600 text-white rounded-full"
                onClick={handleApply}
                disabled={!date.from || !date.to}
              >
                {t('dateRangePicker.apply')}
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
