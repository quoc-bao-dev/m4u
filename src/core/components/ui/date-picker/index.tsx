import React, { forwardRef } from 'react'
import { cn } from '@/core/utils'

interface DatePickerProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  required?: boolean
  error?: string
  helperText?: string
}

const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  ({ label, required, error, helperText, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            type="date"
            className={cn(
              'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-colors',
              error && 'border-red-500 focus:ring-red-500 focus:border-red-500',
              className
            )}
            {...props}
          />
          {/* <CalendarBlankIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" /> */}
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    )
  }
)

DatePicker.displayName = 'DatePicker'

const CalendarBlankIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M19.5 3.32233H17.25V2.57233C17.25 2.37341 17.171 2.18265 17.0303 2.042C16.8897 1.90134 16.6989 1.82233 16.5 1.82233C16.3011 1.82233 16.1103 1.90134 15.9697 2.042C15.829 2.18265 15.75 2.37341 15.75 2.57233V3.32233H8.25V2.57233C8.25 2.37341 8.17098 2.18265 8.03033 2.042C7.88968 1.90134 7.69891 1.82233 7.5 1.82233C7.30109 1.82233 7.11032 1.90134 6.96967 2.042C6.82902 2.18265 6.75 2.37341 6.75 2.57233V3.32233H4.5C4.10218 3.32233 3.72064 3.48036 3.43934 3.76167C3.15804 4.04297 3 4.4245 3 4.82233V19.8223C3 20.2202 3.15804 20.6017 3.43934 20.883C3.72064 21.1643 4.10218 21.3223 4.5 21.3223H19.5C19.8978 21.3223 20.2794 21.1643 20.5607 20.883C20.842 20.6017 21 20.2202 21 19.8223V4.82233C21 4.4245 20.842 4.04297 20.5607 3.76167C20.2794 3.48036 19.8978 3.32233 19.5 3.32233ZM6.75 4.82233V5.57233C6.75 5.77124 6.82902 5.962 6.96967 6.10266C7.11032 6.24331 7.30109 6.32233 7.5 6.32233C7.69891 6.32233 7.88968 6.24331 8.03033 6.10266C8.17098 5.962 8.25 5.77124 8.25 5.57233V4.82233H15.75V5.57233C15.75 5.77124 15.829 5.962 15.9697 6.10266C16.1103 6.24331 16.3011 6.32233 16.5 6.32233C16.6989 6.32233 16.8897 6.24331 17.0303 6.10266C17.171 5.962 17.25 5.77124 17.25 5.57233V4.82233H19.5V7.82233H4.5V4.82233H6.75ZM19.5 19.8223H4.5V9.32233H19.5V19.8223Z"
        fill="#374151"
      />
    </svg>
  )
}

export default DatePicker
