'use client'

import React, { forwardRef, useEffect, useRef, useState } from 'react'
import { cn } from '@/core/utils'
import { XCircle } from '@phosphor-icons/react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  required?: boolean
  error?: string
  helperText?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { label, required, error, helperText, className, onChange, ...props },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement | null>(null)
    const isControlled = props.value !== undefined

    const [hasValue, setHasValue] = useState<boolean>(() => {
      if (props.value !== undefined && props.value !== null) {
        return String(props.value).length > 0
      }
      if (props.defaultValue !== undefined && props.defaultValue !== null) {
        return String(props.defaultValue).length > 0
      }
      return false
    })

    const setRefs = (el: HTMLInputElement | null) => {
      inputRef.current = el
      if (typeof ref === 'function') ref(el)
      else if (ref)
        (ref as React.MutableRefObject<HTMLInputElement | null>).current = el
    }

    useEffect(() => {
      if (isControlled) {
        setHasValue(String(props.value ?? '').length > 0)
      }
    }, [isControlled, props.value])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(e.target.value.length > 0)
      onChange?.(e)
    }

    const handleClear = () => {
      const el = inputRef.current
      if (!el) return

      if (isControlled) {
        // Báo cho parent set value="" (cách an toàn nhất cho controlled)
        const evt = {
          ...new Event('input', { bubbles: true }),
          target: Object.assign(el, { value: '' }),
          currentTarget: Object.assign(el, { value: '' }),
        } as unknown as React.ChangeEvent<HTMLInputElement>

        setHasValue(false)
        onChange?.(evt)
      } else {
        // Uncontrolled: xoá trực tiếp trên DOM và phát 'input'
        el.value = ''
        setHasValue(false)
        el.dispatchEvent(new Event('input', { bubbles: true }))
      }
    }

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
            ref={setRefs}
            className={cn(
              'w-full px-3 py-2.5 bg-white border border-gray-100 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-colors placeholder:text-gray-300 pr-10',
              error && 'border-red-500 focus:ring-red-500 focus:border-red-500',
              className
            )}
            onChange={handleChange}
            {...props}
          />
          {hasValue && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-gray-600"
              aria-label="Clear input"
            >
              <XCircle weight="bold" className="size-5" />
            </button>
          )}
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
export default Input
