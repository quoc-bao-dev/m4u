'use client'

import { cn } from '@/core/utils'
import { CaretDown, CaretUp, Check } from '@phosphor-icons/react'
import React, { useEffect, useMemo, useRef, useState } from 'react'

export type MultiSelectOption = {
  label: string
  value: string | number
}

type MultiSelectProps = {
  options: MultiSelectOption[]
  value?: Array<string | number>
  defaultValue?: Array<string | number>
  onChange?: (nextValues: Array<string | number>) => void
  placeholder?: string
  className?: string
  buttonClassName?: string
  menuClassName?: string
  itemClassName?: string
  disabled?: boolean
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  value,
  defaultValue,
  onChange,
  placeholder = 'Chọn...',
  className = '',
  buttonClassName = '',
  menuClassName = '',
  itemClassName = '',
  disabled = false,
}) => {
  const isControlled = value !== undefined
  const [internalValues, setInternalValues] = useState<Array<string | number>>(
    defaultValue ?? []
  )
  const selectedValues = isControlled
    ? (value as Array<string | number>)
    : internalValues

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

  const selectedLabels = useMemo(() => {
    if (!selectedValues?.length) return ''
    const map = new Map(options.map((o) => [o.value, o.label]))
    return selectedValues.map((v) => map.get(v) ?? String(v)).join(', ')
  }, [options, selectedValues])

  const toggle = (v: string | number) => {
    const set = new Set(selectedValues)
    if (set.has(v)) set.delete(v)
    else set.add(v)
    const next = Array.from(set)
    if (!isControlled) setInternalValues(next)
    onChange?.(next)
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
          className={cn('truncate pr-2', !selectedLabels && 'text-gray-500')}
        >
          {selectedLabels || placeholder}
        </span>
        {open ? (
          <CaretUp className="w-4 h-4 text-gray-400" />
        ) : (
          <CaretDown className="w-4 h-4 text-gray-400" />
        )}
      </button>

      {open && (
        <div
          className={cn(
            'absolute left-0 right-0 mt-2 rounded-xl bg-white shadow-lg border border-gray-200 py-2 max-h-80 overflow-auto z-50',
            menuClassName
          )}
        >
          {options.map((opt) => {
            const isSelected = selectedValues.includes(opt.value)
            return (
              <button
                key={String(opt.value)}
                type="button"
                onClick={() => toggle(opt.value)}
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

export default MultiSelect
