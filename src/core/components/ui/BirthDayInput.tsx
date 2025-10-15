'use client'

import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { format, isValid } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import * as React from 'react'

interface BirthDayInputProps {
  label?: string
  required?: boolean
  error?: string
  helperText?: string
  value?: string
  onChange?: (value: string) => void
  className?: string
  placeholder?: string
  defaultDate?: string
  readonly?: boolean
}

const BirthDayInput = React.forwardRef<HTMLDivElement, BirthDayInputProps>(
  (
    {
      label,
      required,
      error,
      helperText,
      value,
      onChange,
      className,
      placeholder,
      defaultDate,
      readonly = false,
    },
    ref
  ) => {
    const t = useTranslations()
    const [date, setDate] = React.useState<Date | undefined>(() => {
      if (value) {
        const newDate = new Date(value)
        return isValid(newDate) ? newDate : undefined
      }
      if (defaultDate) {
        const newDate = new Date(defaultDate)
        return isValid(newDate) ? newDate : undefined
      }
      // Default to January 1, 2000
      return new Date(2000, 0, 1)
    })
    const [selectedYear, setSelectedYear] = React.useState<number>(
      date ? date.getFullYear() : 2000
    )
    const [selectedMonth, setSelectedMonth] = React.useState<number>(
      date ? date.getMonth() : 0
    )

    // Generate year options (from 1900 to current year)
    const currentYear = new Date().getFullYear()
    const years = Array.from(
      { length: currentYear - 1900 + 1 },
      (_, i) => currentYear - i
    )

    // Month options
    const months = [
      { value: 0, label: t('common.birthdayInput.months.1') },
      { value: 1, label: t('common.birthdayInput.months.2') },
      { value: 2, label: t('common.birthdayInput.months.3') },
      { value: 3, label: t('common.birthdayInput.months.4') },
      { value: 4, label: t('common.birthdayInput.months.5') },
      { value: 5, label: t('common.birthdayInput.months.6') },
      { value: 6, label: t('common.birthdayInput.months.7') },
      { value: 7, label: t('common.birthdayInput.months.8') },
      { value: 8, label: t('common.birthdayInput.months.9') },
      { value: 9, label: t('common.birthdayInput.months.10') },
      { value: 10, label: t('common.birthdayInput.months.11') },
      { value: 11, label: t('common.birthdayInput.months.12') },
    ]

    React.useEffect(() => {
      if (value) {
        const newDate = new Date(value)
        if (isValid(newDate)) {
          setDate(newDate)
          setSelectedYear(newDate.getFullYear())
          setSelectedMonth(newDate.getMonth())
        } else {
          setDate(undefined)
        }
      } else if (defaultDate) {
        const newDate = new Date(defaultDate)
        if (isValid(newDate)) {
          setDate(newDate)
          setSelectedYear(newDate.getFullYear())
          setSelectedMonth(newDate.getMonth())
        } else {
          setDate(undefined)
        }
      } else {
        setDate(undefined)
      }
    }, [value, defaultDate])

    const handleDateSelect = (selectedDate: Date | undefined) => {
      setDate(selectedDate)
      if (selectedDate) {
        setSelectedYear(selectedDate.getFullYear())
        setSelectedMonth(selectedDate.getMonth())
      }
      if (onChange) {
        onChange(selectedDate ? safeFormatDate(selectedDate, 'yyyy-MM-dd') : '')
      }
    }

    const handleYearChange = (year: string) => {
      const newYear = parseInt(year)
      setSelectedYear(newYear)

      // Update calendar month if date exists
      if (date) {
        const newDate = new Date(newYear, selectedMonth, date.getDate())
        // Check if the day exists in the new month/year combination
        if (newDate.getDate() === date.getDate()) {
          handleDateSelect(newDate)
        } else {
          // If day doesn't exist (e.g., Feb 30), set to last day of month
          const lastDay = new Date(newYear, selectedMonth + 1, 0).getDate()
          const adjustedDate = new Date(
            newYear,
            selectedMonth,
            Math.min(date.getDate(), lastDay)
          )
          handleDateSelect(adjustedDate)
        }
      }
    }

    const handleMonthChange = (month: string) => {
      const newMonth = parseInt(month)
      setSelectedMonth(newMonth)

      // Update calendar month if date exists
      if (date) {
        const newDate = new Date(selectedYear, newMonth, date.getDate())
        // Check if the day exists in the new month/year combination
        if (newDate.getDate() === date.getDate()) {
          handleDateSelect(newDate)
        } else {
          // If day doesn't exist (e.g., Feb 30), set to last day of month
          const lastDay = new Date(selectedYear, newMonth + 1, 0).getDate()
          const adjustedDate = new Date(
            selectedYear,
            newMonth,
            Math.min(date.getDate(), lastDay)
          )
          handleDateSelect(adjustedDate)
        }
      }
    }

    // Helper function to safely format date
    const safeFormatDate = (
      date: Date | undefined,
      formatString: string
    ): string => {
      if (!date || !isValid(date)) return ''
      try {
        return format(date, formatString)
      } catch {
        return ''
      }
    }

    // Calculate the month to display in calendar
    const calendarMonth = new Date(selectedYear, selectedMonth, 1)

    return (
      <div className="w-full" ref={ref}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-3">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        {/* Date Picker */}
        <Popover>
          <PopoverTrigger asChild disabled={readonly}>
            <div className={cn('relative', className)}>
              <input
                type="text"
                placeholder={
                  placeholder || t('common.birthdayInput.selectDate')
                }
                value={safeFormatDate(date, 'dd/MM/yyyy')}
                readOnly
                className={cn(
                  'w-full bg-white px-3 py-2.5 pr-9 border border-gray-100 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-colors cursor-pointer',
                  !date && 'placeholder:text-gray-300',
                  error &&
                    'border-red-500 focus:ring-red-500 focus:border-red-500',
                  readonly &&
                    'bg-gray-50 text-gray-500 cursor-not-allowed focus:ring-0 focus:border-gray-100'
                )}
              />
              <CalendarIcon
                className={cn(
                  'absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none',
                  readonly ? 'text-gray-400' : 'text-gray-500'
                )}
              />
            </div>
          </PopoverTrigger>
          {!readonly && (
            <PopoverContent className=" p-0" align="start">
              <div className="p-3 border-b border-gray-100">
                {/* Year and Month Selectors */}
                <div className="grid grid-cols-2 gap-3">
                  {/* Year Selector */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      {t('common.birthdayInput.year')}
                    </label>
                    <Select
                      value={selectedYear.toString()}
                      onValueChange={handleYearChange}
                      disabled={readonly}
                    >
                      <SelectTrigger className="w-full h-8 text-sm">
                        <SelectValue
                          placeholder={t('common.birthdayInput.selectYear')}
                        />
                      </SelectTrigger>
                      <SelectContent className="max-h-48 overflow-y-auto">
                        {years.map((year) => (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Month Selector */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      {t('common.birthdayInput.month')}
                    </label>
                    <Select
                      value={selectedMonth.toString()}
                      onValueChange={handleMonthChange}
                      disabled={readonly}
                    >
                      <SelectTrigger className="w-full h-8 text-sm">
                        <SelectValue
                          placeholder={t('common.birthdayInput.selectMonth')}
                        />
                      </SelectTrigger>
                      <SelectContent className="max-h-48 overflow-y-auto">
                        {months.map((month) => (
                          <SelectItem
                            key={month.value}
                            value={month.value.toString()}
                          >
                            {month.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateSelect}
                initialFocus
                month={calendarMonth}
                onMonthChange={(newMonth) => {
                  setSelectedYear(newMonth.getFullYear())
                  setSelectedMonth(newMonth.getMonth())
                }}
                className="rounded-md border-0 w-full"
              />
            </PopoverContent>
          )}
        </Popover>

        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    )
  }
)

BirthDayInput.displayName = 'BirthDayInput'

export default BirthDayInput
