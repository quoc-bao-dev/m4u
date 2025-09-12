'use client'

import * as React from 'react'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

interface DatePickerProps {
  label?: string
  required?: boolean
  error?: string
  helperText?: string
  value?: string
  onChange?: (value: string) => void
  className?: string
  placeholder?: string
}

const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      label,
      required,
      error,
      helperText,
      value,
      onChange,
      className,
      placeholder = 'Chọn ngày',
    },
    ref
  ) => {
    const [date, setDate] = React.useState<Date | undefined>(
      value ? new Date(value) : undefined
    )

    React.useEffect(() => {
      if (value) {
        setDate(new Date(value))
      } else {
        setDate(undefined)
      }
    }, [value])

    const handleDateSelect = (selectedDate: Date | undefined) => {
      setDate(selectedDate)
      if (onChange) {
        onChange(selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '')
      }
    }

    return (
      <div className="w-full" ref={ref}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                'w-full justify-start text-left font-normal px-3 py-5.5! border border-gray-100 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-colors',
                !date && 'text-gray-300',
                error &&
                  'border-red-500 focus:ring-red-500 focus:border-red-500',
                className
              )}
            >
              <div className="flex justify-between items-center w-full">
                {date ? (
                  format(date, 'dd/MM/yyyy')
                ) : (
                  <span className="text-gray-300">{placeholder}</span>
                )}
                <CalendarIcon className="mr-2 h-4 w-4" />
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              initialFocus
              className="rounded-md border"
            />
          </PopoverContent>
        </Popover>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    )
  }
)

DatePicker.displayName = 'DatePicker'

export default DatePicker
