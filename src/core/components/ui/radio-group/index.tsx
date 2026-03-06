import React from 'react'
import { cn } from '@/core/utils'

interface RadioOption {
  value: string
  label: string
}

interface RadioGroupProps {
  label?: string
  required?: boolean
  options: RadioOption[]
  value: string
  onChange: (value: string) => void
  name: string
  error?: string
  className?: string
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  required,
  options,
  value,
  onChange,
  name,
  error,
  className,
}) => {
  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="flex gap-3">
        {options.map((option) => (
          <label key={option.value} className="flex items-center">
            <div className="relative">
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={value === option.value}
                onChange={(e) => onChange(e.target.value)}
                className="sr-only"
              />
              <div
                className={cn(
                  'w-4 h-4 rounded-full border flex items-center justify-center transition-all duration-200',
                  value === option.value
                    ? 'bg-blue-500 border-blue-500'
                    : 'border-gray-300 bg-white hover:border-gray-400',
                  error && 'border-red-500'
                )}
              >
                {value === option.value && (
                  <svg
                    className="w-2.5 h-2.5 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
            </div>
            <span className="ml-2 text-sm text-gray-700">{option.label}</span>
          </label>
        ))}
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  )
}

export default RadioGroup
