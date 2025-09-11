'use client'
import React, {
  useState,
  useRef,
  useEffect,
  KeyboardEvent,
  ClipboardEvent,
} from 'react'
import { cn } from '@/core/utils/cn'

interface PINInputProps {
  length?: number
  value?: string
  onChange?: (value: string) => void
  onComplete?: (value: string) => void
  className?: string
  inputClassName?: string
  disabled?: boolean
  placeholder?: string
  autoFocus?: boolean
}

export const PINInput: React.FC<PINInputProps> = ({
  length = 6,
  value = '',
  onChange,
  onComplete,
  className,
  inputClassName,
  disabled = false,
  placeholder = '0',
  autoFocus = true,
}) => {
  const [pin, setPin] = useState<string[]>(
    value
      .split('')
      .slice(0, length)
      .concat(Array(length - value.length).fill(''))
  )
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Helper function to check if all digits are filled
  const isAllDigitsFilled = (pinArray: string[]) => {
    return pinArray.length === length && pinArray.every((d) => d !== '')
  }

  // Update internal state when value prop changes
  useEffect(() => {
    const newPin = value
      .split('')
      .slice(0, length)
      .concat(Array(length - value.length).fill(''))
    setPin(newPin)
  }, [value, length])

  // Focus first empty input on mount
  useEffect(() => {
    if (autoFocus && !disabled) {
      const firstEmptyIndex = pin.findIndex((digit) => digit === '')
      const focusIndex = firstEmptyIndex === -1 ? length - 1 : firstEmptyIndex
      inputRefs.current[focusIndex]?.focus()
    }
  }, [autoFocus, disabled, length])

  const handleInputChange = (index: number, inputValue: string) => {
    if (disabled) return

    // Only allow single digit
    const digit = inputValue.slice(-1)
    if (digit && !/^\d$/.test(digit)) return

    const newPin = [...pin]
    newPin[index] = digit
    setPin(newPin)

    const pinValue = newPin.join('')
    onChange?.(pinValue)

    // Check if all digits are filled
    if (isAllDigitsFilled(newPin)) {
      onComplete?.(pinValue)
      // Keep focus on the last input when all digits are filled
      inputRefs.current[length - 1]?.focus()
      return
    }

    // Auto focus next input only if not all digits are filled
    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return

    const { key } = e

    if (key === 'Backspace') {
      if (pin[index] !== '') {
        // Clear current input
        const newPin = [...pin]
        newPin[index] = ''
        setPin(newPin)
        const pinValue = newPin.join('')
        onChange?.(pinValue)
      } else if (index > 0) {
        // Move to previous input and clear it
        inputRefs.current[index - 1]?.focus()
        const newPin = [...pin]
        newPin[index - 1] = ''
        setPin(newPin)
        const pinValue = newPin.join('')
        onChange?.(pinValue)
      }
    } else if (key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus()
    } else if (key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    } else if (key === 'Delete') {
      const newPin = [...pin]
      newPin[index] = ''
      setPin(newPin)
      const pinValue = newPin.join('')
      onChange?.(pinValue)
    } else if (/^\d$/.test(key)) {
      // Check if all digits are already filled
      if (isAllDigitsFilled(pin)) {
        // If all digits are filled, don't allow new input
        e.preventDefault()
        return
      }

      // Prevent default to avoid double input
      e.preventDefault()
      // Handle digit input
      handleInputChange(index, key)
    }
  }

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    if (disabled) return

    e.preventDefault()
    const pastedData = e.clipboardData.getData('text')
    const digits = pastedData.replace(/\D/g, '').slice(0, length)

    if (digits.length > 0) {
      const newPin = Array(length).fill('')
      digits.split('').forEach((digit, index) => {
        if (index < length) {
          newPin[index] = digit
        }
      })
      setPin(newPin)

      const pinValue = newPin.join('')
      onChange?.(pinValue)

      // Check if all digits are filled
      if (isAllDigitsFilled(newPin)) {
        onComplete?.(pinValue)
        // Focus the last input when all digits are filled
        inputRefs.current[length - 1]?.focus()
      } else {
        // Focus the next empty input
        const nextEmptyIndex = newPin.findIndex((digit) => digit === '')
        const focusIndex = nextEmptyIndex === -1 ? length - 1 : nextEmptyIndex
        inputRefs.current[focusIndex]?.focus()
      }
    }
  }

  const handleFocus = (index: number) => {
    if (disabled) return
    inputRefs.current[index]?.select()
  }

  return (
    <div className={cn('flex gap-2', className)}>
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          // @ts-ignore
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={pin[index]}
          onChange={(e) => handleInputChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          onFocus={() => handleFocus(index)}
          disabled={disabled}
          placeholder={placeholder}
          className={cn(
            'w-16 h-16 text-center text-4xl font-bold bg-transparent border-0 outline-none transition-all duration-200 focus:outline-none',
            pin[index] !== '' ? 'text-[#3B82F6]' : 'text-gray-300',
            disabled && 'opacity-50 cursor-not-allowed',
            inputClassName
          )}
          style={{
            borderBottom:
              pin[index] !== '' ? '2px solid #3B82F6' : '2px solid #D1D5DB',
            borderRadius: '0',
          }}
        />
      ))}
    </div>
  )
}
