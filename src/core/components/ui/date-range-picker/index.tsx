'use client'
// dsds
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
import { DateRange } from 'react-day-picker'

interface DateRangePickerProps {
  label?: string
  required?: boolean
  error?: string
  helperText?: string
  value?: { from?: string; to?: string }
  onChange?: (value: { from?: string; to?: string }) => void
  className?: string
  placeholder?: string
  allowManualInput?: boolean
  disabled?: boolean
}

const DateRangePicker = React.forwardRef<HTMLDivElement, DateRangePickerProps>(
  (
    {
      label,
      required,
      error,
      helperText,
      value,
      onChange,
      className,
      placeholder = 'From → To',
      allowManualInput = true,
      disabled = false,
    },
    ref
  ) => {
    const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
      from: value?.from ? new Date(value.from) : undefined,
      to: value?.to ? new Date(value.to) : undefined,
    })
    const [textValue, setTextValue] = React.useState<string>(
      value?.from && value?.to
        ? `${format(new Date(value.from), 'dd/MM/yyyy')} → ${format(
            new Date(value.to),
            'dd/MM/yyyy'
          )}`
        : value?.from
        ? `${format(new Date(value.from), 'dd/MM/yyyy')} → To`
        : 'From → To'
    )

    React.useEffect(() => {
      if (value?.from && value?.to) {
        setDateRange({
          from: new Date(value.from),
          to: new Date(value.to),
        })
        setTextValue(
          `${format(new Date(value.from), 'dd/MM/yyyy')} → ${format(
            new Date(value.to),
            'dd/MM/yyyy'
          )}`
        )
      } else if (value?.from) {
        setDateRange({
          from: new Date(value.from),
          to: undefined,
        })
        setTextValue(`${format(new Date(value.from), 'dd/MM/yyyy')} → To`)
      } else {
        setDateRange(undefined)
        setTextValue('From → To')
      }
    }, [value])

    const handleDateRangeSelect = (selectedRange: DateRange | undefined) => {
      setDateRange(selectedRange)
      if (onChange) {
        onChange({
          from: selectedRange?.from
            ? format(selectedRange.from, 'yyyy-MM-dd')
            : undefined,
          to: selectedRange?.to
            ? format(selectedRange.to, 'yyyy-MM-dd')
            : undefined,
        })
      }
    }

    const commitTextToDateRange = (raw: string) => {
      const trimmed = raw.trim()
      if (!trimmed || trimmed === 'From → To') {
        handleDateRangeSelect(undefined)
        return
      }

      // Parse "dd/MM/yyyy → dd/MM/yyyy" format
      const arrowIndex = trimmed.indexOf('→')
      if (arrowIndex === -1) {
        // Try to parse as single date
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
          setTextValue(`${format(parsed, 'dd/MM/yyyy')} → To`)
          handleDateRangeSelect({ from: parsed, to: undefined })
        }
        return
      }

      const fromStr = trimmed.substring(0, arrowIndex).trim()
      const toStr = trimmed.substring(arrowIndex + 1).trim()

      const tryFormats = ['dd/MM/yyyy', 'dd-MM-yyyy', 'yyyy-MM-dd'] as const
      let fromDate: Date | undefined
      let toDate: Date | undefined

      // Parse from date
      if (fromStr && fromStr !== 'From') {
        for (const fmt of tryFormats) {
          const d = parse(fromStr, fmt, new Date())
          if (isValid(d)) {
            fromDate = d
            break
          }
        }
      }

      // Parse to date
      if (toStr && toStr !== 'To') {
        for (const fmt of tryFormats) {
          const d = parse(toStr, fmt, new Date())
          if (isValid(d)) {
            toDate = d
            break
          }
        }
      }

      if (fromDate && isValid(fromDate)) {
        if (toDate && isValid(toDate)) {
          setTextValue(
            `${format(fromDate, 'dd/MM/yyyy')} → ${format(
              toDate,
              'dd/MM/yyyy'
            )}`
          )
          handleDateRangeSelect({ from: fromDate, to: toDate })
        } else {
          setTextValue(`${format(fromDate, 'dd/MM/yyyy')} → To`)
          handleDateRangeSelect({ from: fromDate, to: undefined })
        }
      }
    }

    const displayValue = allowManualInput
      ? textValue
      : dateRange?.from && dateRange?.to
      ? `${format(dateRange.from, 'dd/MM/yyyy')} → ${format(
          dateRange.to,
          'dd/MM/yyyy'
        )}`
      : dateRange?.from
      ? `${format(dateRange.from, 'dd/MM/yyyy')} → To`
      : 'From → To'

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
                value={displayValue}
                readOnly={!allowManualInput || disabled}
                disabled={disabled}
                onChange={(e) => {
                  if (!allowManualInput || disabled) return
                  setTextValue(e.target.value)
                }}
                onBlur={() =>
                  allowManualInput &&
                  !disabled &&
                  commitTextToDateRange(textValue)
                }
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && allowManualInput && !disabled) {
                    e.preventDefault()
                    commitTextToDateRange(textValue)
                  }
                }}
                className={cn(
                  'w-full bg-white px-3 py-2.5! pr-9 border border-gray-100 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-colors',
                  !dateRange && !textValue && 'placeholder:text-gray-300',
                  error &&
                    'border-red-500 focus:ring-red-500 focus:border-red-500',
                  disabled && 'bg-gray-50 cursor-not-allowed opacity-50'
                )}
              />
              <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="range"
              selected={dateRange}
              onSelect={handleDateRangeSelect}
              initialFocus
              className="rounded-md border"
              disabled={disabled}
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

DateRangePicker.displayName = 'DateRangePicker'

export default DateRangePicker
