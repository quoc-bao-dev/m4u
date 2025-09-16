'use client'

import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { format, parse, isValid } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import * as React from 'react'

interface DatePickerProps {
  label?: string
  required?: boolean
  error?: string
  helperText?: string
  value?: string
  onChange?: (value: string) => void
  className?: string
  placeholder?: string
  allowManualInput?: boolean
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
      allowManualInput = true,
    },
    ref
  ) => {
    const [date, setDate] = React.useState<Date | undefined>(
      value ? new Date(value) : undefined
    )
    const [textValue, setTextValue] = React.useState<string>(
      value ? format(new Date(value), 'dd/MM/yyyy') : ''
    )

    React.useEffect(() => {
      if (value) {
        setDate(new Date(value))
        setTextValue(format(new Date(value), 'dd/MM/yyyy'))
      } else {
        setDate(undefined)
        setTextValue('')
      }
    }, [value])

    const handleDateSelect = (selectedDate: Date | undefined) => {
      setDate(selectedDate)
      if (onChange) {
        onChange(selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '')
      }
    }

    const commitTextToDate = (raw: string) => {
      const trimmed = raw.trim()
      if (!trimmed) {
        handleDateSelect(undefined)
        return
      }
      // Try dd/MM/yyyy, dd-MM-yyyy, then yyyy-MM-dd
      const tryFormats = ['dd/MM/yyyy', 'dd-MM-yyyy', 'yyyy-MM-dd'] as const
      let parsed: Date | undefined
      for (const fmt of tryFormats) {
        const d = parse(trimmed, fmt, new Date())
        if (isValid(d)) {
          parsed = d
          break
        }
      }
      if (parsed && isValid(parsed)) {
        setTextValue(format(parsed, 'dd/MM/yyyy'))
        handleDateSelect(parsed)
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
            <div className={cn('relative', className)}>
              <input
                type="text"
                inputMode="numeric"
                placeholder={placeholder}
                value={allowManualInput ? textValue : date ? format(date, 'dd/MM/yyyy') : ''}
                readOnly={!allowManualInput}
                onChange={(e) => {
                  if (!allowManualInput) return
                  setTextValue(e.target.value)
                }}
                onBlur={() => allowManualInput && commitTextToDate(textValue)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && allowManualInput) {
                    e.preventDefault()
                    commitTextToDate(textValue)
                  }
                }}
                className={cn(
                  'w-full bg-white px-3 py-2.5! pr-9 border border-gray-100 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-colors',
                  (!date && !textValue) && 'placeholder:text-gray-300',
                  error && 'border-red-500 focus:ring-red-500 focus:border-red-500'
                )}
              />
              <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
            </div>
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
