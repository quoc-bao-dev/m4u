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

// Custom CSS for seamless range connection
const rangePickerStyles = `
  .date-range-picker .rdp-day_button {
    position: relative;
  }
  
  /* Range start connection - extends background to the right */
  .date-range-picker .rdp-day_button.range-start-custom::after {
    content: '';
    position: absolute;
    top: 50%;
    right: 0;
    width: 50%;
    height: 100%;
    background-color: rgb(252 231 243); /* bg-pink-100 */
    z-index: -1;
    transform: translateY(-50%);
    border-radius: 0;
  }
  
  /* Range end connection - extends background to the left */
  .date-range-picker .rdp-day_button.range-end-custom::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    width: 50%;
    height: 100%;
    background-color: rgb(252 231 243); /* bg-pink-100 */
    z-index: -1;
    transform: translateY(-50%);
    border-radius: 0;
  }
  
  /* Left edge of week in range */
  .date-range-picker .rdp-day_button.range-left-edge-custom {
    border-top-left-radius: 0.5rem !important;
    border-bottom-left-radius: 0.5rem !important;
  }
  
  /* Right edge of week in range */
  .date-range-picker .rdp-day_button.range-right-edge-custom {
    border-top-right-radius: 0.5rem !important;
    border-bottom-right-radius: 0.5rem !important;
  }
  
  /* Ensure today styling doesn't interfere */
  .date-range-picker .rdp-day_button.rdp-day_today {
    font-weight: bold;
  }
  
  /* Range background should cover full cell */
  .date-range-picker .rdp-day_button.bg-pink-100 {
    background-color: rgb(252 231 243) !important;
  }
`

export function DateRangePicker({
  onChange,
}: {
  onChange?: (
    range: { from: string; to: string } | { from: ''; to: '' }
  ) => void
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
    // Clear dates và notify parent component
    onChange?.({
      from: '',
      to: '',
    })
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
      <style dangerouslySetInnerHTML={{ __html: rangePickerStyles }} />
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
          <div className="flex flex-col date-range-picker">
            <Calendar
              mode="single"
              onDayClick={handleSelect}
              onDayMouseEnter={handleMouseEnter}
              onDayMouseLeave={() => setHoverDay(null)}
              className="p-3"
              modifiers={{
                // Ngày nằm trong khoảng được chọn
                range: inRange,

                // Ngày bắt đầu khi chỉ chọn một ngày
                onlyStart: (day) =>
                  !!(
                    date.from &&
                    !date.to &&
                    day.getTime() === date.from.getTime()
                  ),

                // Ngày bắt đầu range (khi đã có cả from và to)
                rangeStart: (day) => {
                  if (!date.from || !date.to) return false
                  const startDate = date.from <= date.to ? date.from : date.to
                  return day.getTime() === startDate.getTime()
                },

                // Ngày kết thúc range
                rangeEnd: (day) => {
                  if (!date.from || !date.to) return false
                  const endDate = date.from <= date.to ? date.to : date.from
                  return day.getTime() === endDate.getTime()
                },

                // Ngày ở giữa range (không phải start/end)
                rangeMiddle: (day) => {
                  if (!date.from || !date.to) return false
                  const startDate = date.from <= date.to ? date.from : date.to
                  const endDate = date.from <= date.to ? date.to : date.from
                  return day > startDate && day < endDate
                },

                // Ngày ở cạnh trái tuần và nằm trong range
                rangeLeftEdge: (day) => {
                  if (!inRange(day)) return false
                  return day.getDay() === 0 // Sunday
                },

                // Ngày ở cạnh phải tuần và nằm trong range
                rangeRightEdge: (day) => {
                  if (!inRange(day)) return false
                  return day.getDay() === 6 // Saturday
                },
              }}
              modifiersClassNames={{
                // Base range styling - background hồng nhạt cho tất cả ngày trong range
                range: 'bg-pink-100 text-pink-700',

                // Ngày ở giữa range - giữ nguyên background hồng nhạt
                rangeMiddle: 'bg-pink-100 text-pink-700',

                // Ngày bắt đầu range - background hồng đậm, tròn, z-index cao + custom class
                rangeStart:
                  'bg-pink-500 text-white rounded-full relative z-10 range-start-custom',

                // Ngày kết thúc range - background hồng đậm, tròn, z-index cao + custom class
                rangeEnd:
                  'bg-pink-500 text-white rounded-full relative z-10 range-end-custom',

                // Khi chỉ chọn một ngày - background hồng đậm, tròn
                onlyStart: 'bg-pink-500 text-white rounded-full relative z-10',

                // Bo tròn góc trái cho ngày ở đầu tuần trong range
                rangeLeftEdge:
                  'bg-pink-100 text-pink-700 range-left-edge-custom',

                // Bo tròn góc phải cho ngày ở cuối tuần trong range
                rangeRightEdge:
                  'bg-pink-100 text-pink-700 range-right-edge-custom',
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
