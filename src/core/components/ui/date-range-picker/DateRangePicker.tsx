'use client'

import * as React from 'react'
import moment from 'moment'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'

export function DateRangePicker({
  onChange,
}: {
  onChange?: (range: { from: string; to: string }) => void
}) {
  const [date, setDate] = React.useState<{ from?: Date; to?: Date }>({})
  const [hoverDay, setHoverDay] = React.useState<Date | null>(null)
  const [open, setOpen] = React.useState(false)

  const handleSelect = (day: Date) => {
    if (!date.from || (date.from && date.to)) {
      setDate({ from: day, to: undefined }) // reset chọn lại
      setHoverDay(null)
    } else if (day < date.from) {
      setDate({ from: day, to: date.from }) // nếu chọn trước from
      setHoverDay(null)
    } else {
      setDate({ ...date, to: day }) // chọn ngày kết thúc
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
      onChange?.({
        from: moment(date.from).format('DD/MM/YYYY'),
        to: moment(date.to).format('DD/MM/YYYY'),
      })
    }
    setOpen(false)
  }

  // ✅ dùng useCallback để tránh re-render không cần thiết
  const inRange = React.useCallback(
    (day: Date) => {
      if (date.from && !date.to && hoverDay) {
        return day >= date.from && day <= hoverDay
      }
      if (date.from && date.to) {
        return day >= date.from && day <= date.to
      }
      return false
    },
    [date.from, date.to, hoverDay]
  )

  // ✅ chỉ update hoverDay khi giá trị thay đổi
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
            <span>
              {date.from ? moment(date.from).format('DD/MM/YYYY') : 'From'} →{' '}
              {date.to ? moment(date.to).format('DD/MM/YYYY') : 'To'}
            </span>
            <svg
              className="h-4 w-4 text-gray-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M8 7V3m8 4V3m-9 8h10m-12 8h14a2 2 0 002-2V7a2 2 0 00-2-2h-2V3m-10 2H5a2 2 0 00-2 2v12a2 2 0 002 2h2" />
            </svg>
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
                  date.from && day.getTime() === date.from.getTime(),
                end: (day) => date.to && day.getTime() === date.to.getTime(),
              }}
              modifiersClassNames={{
                range: 'bg-pink-100 text-pink-700',
                start: 'bg-pink-500 text-white rounded-l-full',
                end: 'bg-pink-500 text-white rounded-r-full',
              }}
            />

            <div className="flex justify-end gap-2 border-t px-4 py-2">
              <Button variant="ghost" onClick={handleCancel}>
                Cancel
              </Button>
              <Button
                className="bg-pink-500 hover:bg-pink-600 text-white"
                onClick={handleApply}
                disabled={!date.from || !date.to}
              >
                Apply
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
