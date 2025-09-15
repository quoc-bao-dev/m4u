'use client'

import { cn } from '@/core/utils'
import { CaretDown, CaretUp, Check } from '@phosphor-icons/react'
import React, { useEffect, useMemo, useRef, useState } from 'react'

export type SelectOption = {
  label: string
  value: string | number
}

type SelectProps = {
  options: SelectOption[]
  value?: string | number | null
  defaultValue?: string | number | null
  onChange?: (nextValue: string | number | null) => void
  placeholder?: string
  className?: string
  buttonClassName?: string
  menuClassName?: string
  itemClassName?: string
  disabled?: boolean
  clearable?: boolean
}

const Select: React.FC<SelectProps> = ({
  options,
  value,
  defaultValue = null,
  onChange,
  placeholder = 'Chọn...',
  className = '',
  buttonClassName = '',
  menuClassName = '',
  itemClassName = '',
  disabled = false,
  clearable = false,
}) => {
  const isControlled = value !== undefined
  const [internalValue, setInternalValue] = useState<string | number | null>(
    defaultValue
  )
  const selectedValue = isControlled ? value ?? null : internalValue

  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!rootRef.current) return
      if (!rootRef.current.contains(e.target as Node)) setOpen(false)
    }
    if (open) document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [open])

  const valueToLabel = useMemo(
    () => new Map(options.map((o) => [o.value, o.label])),
    [options]
  )

  const selectedLabel =
    selectedValue !== null && selectedValue !== undefined
      ? valueToLabel.get(selectedValue) ?? String(selectedValue)
      : ''

  const handleSelect = (v: string | number) => {
    const next = v
    if (!isControlled) setInternalValue(next)
    onChange?.(next)
    setOpen(false)
  }

  const handleClear = () => {
    if (!clearable) return
    if (!isControlled) setInternalValue(null)
    onChange?.(null)
  }

  return (
    <div ref={rootRef} className={cn('relative', className)}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          'w-full rounded-lg border border-gray-200 bg-white text-gray-700 px-4 py-2 text-sm flex items-center justify-between',
          'focus:outline-none focus:ring-2 focus:ring-pink-500',
          disabled && 'opacity-50 cursor-not-allowed',
          buttonClassName
        )}
      >
        <span
          className={cn('truncate pr-2', !selectedLabel && 'text-gray-500')}
        >
          {selectedLabel || placeholder}
        </span>
        <div className="flex items-center gap-2">
          {clearable && selectedLabel && (
            <span
              onClick={(e) => {
                e.stopPropagation()
                handleClear()
              }}
              className="text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              ×
            </span>
          )}
          {open ? (
            <CaretUp className="w-4 h-4 text-gray-400" />
          ) : (
            <CaretDown className="w-4 h-4 text-gray-400" />
          )}
        </div>
      </button>

      {open && (
        <div
          className={cn(
            'absolute left-0 right-0 mt-2 rounded-xl bg-white shadow-lg border border-gray-200 py-2 max-h-80 overflow-auto z-50',
            menuClassName
          )}
        >
          {options.map((opt) => {
            const isSelected = selectedValue === opt.value
            return (
              <button
                key={String(opt.value)}
                type="button"
                onClick={() => handleSelect(opt.value)}
                className={cn(
                  'w-full flex items-center justify-between px-4 py-2 text-sm hover:bg-gray-50',
                  itemClassName
                )}
              >
                <span className="text-gray-700">{opt.label}</span>
                {isSelected && (
                  <Check className="w-4 h-4 text-pink-600" weight="bold" />
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Select
