'use client'

import React from 'react'

interface CheckboxProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
  className?: string
  disabled?: boolean
}

const Checkbox = ({
  checked,
  onChange,
  label,
  className = '',
  disabled = false,
}: CheckboxProps) => {
  return (
    <label
      className={`flex items-center gap-3 text-sm cursor-pointer select-none ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      } ${className}`}
    >
      <input
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
      />
      <span className="w-4 h-4 rounded border border-gray-300 bg-white grid place-items-center transition-colors peer-checked:bg-pink-600 peer-checked:border-pink-600 peer-checked:[&>svg]:opacity-100">
        <svg
          viewBox="0 0 12 10"
          className="w-3 h-3 opacity-0 transition-opacity"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 5L4 8L11 1"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      {label && <span className="flex-1 text-gray-700">{label}</span>}
    </label>
  )
}

export default Checkbox
