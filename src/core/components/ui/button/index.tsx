import { ArrowRightIcon } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import React, { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode // Button text or content
  size?: 'xs' | 'sm' | 'md' // Button size
  variant?:
    | 'primary'
    | 'outline'
    | 'outlineSecondary'
    | 'destructive'
    | 'warning' // Button variant
  startIcon?: ReactNode // Icon before the text
  endIcon?: ReactNode // Icon after the text
  onClick?: () => void // Click handler
  disabled?: boolean // Disabled state
  className?: string // Disabled state
  type?: 'button' | 'submit' | 'reset' // Button type
}

const Button: React.FC<ButtonProps> = ({
  children,
  size = 'md',
  variant = 'primary',
  // startIcon: _startIcon,
  // endIcon: _endIcon,
  onClick,
  className = '',
  disabled = false,
  type = 'button',
}) => {
  // Size Classes
  //   const sizeClasses = {
  //     xs: "px-3 py-2 text-responsive-sm",
  //     sm: "px-4 py-3 text-responsive-sm",
  //     md: "px-5 py-3.5 text-responsive-sm",
  //   };
  const sizeClasses = {
    xs: 'text-responsive-sm',
    sm: 'text-responsive-sm',
    md: 'text-sm xl:text-base',
  }
  const sizePaddingClasses = {
    xs: 'py-2 xl:py-3 px-5',
    sm: 'py-3 xl:py-4 px-5',
    md: 'py-3 xl:py-5.5 px-5',
  }

  // Variant Classes
  const variantClasses = {
    primary:
      'bg-pink-100 text-pink-600 shadow-theme-xs hover:bg-pink-600/20 disabled:bg-pink-500',
    outline:
      'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300',
    outlineSecondary:
      'bg-white text-brand-600 border border-brand-300 hover:bg-brand-50 dark:bg-gray-800 dark:text-brand-400 dark:border-brand-600 dark:hover:bg-brand-900/20',
    destructive:
      'bg-red-600 text-white shadow-theme-xs hover:bg-red-700 disabled:bg-red-300',
    warning:
      'bg-yellow-500 text-white shadow-theme-xs hover:bg-yellow-600 disabled:bg-yellow-300',
  }

  return (
    <motion.button
      className={`inline-flex w-fit items-center justify-center font-semibold gap-3 rounded-full transition-all duration-300 p-1 pr-3 cursor-pointer ${className} ${
        sizeClasses[size]
      } ${variantClasses[variant]} ${
        disabled ? 'cursor-not-allowed opacity-50' : ''
      }`}
      onClick={onClick}
      disabled={disabled}
      type={type}
      whileHover="hover" // Kích hoạt animation khi hover vào button
      initial="initial" // Trạng thái ban đầu
    >
      {/* {startIcon && <span className="flex items-center">{startIcon}</span>} */}
      <span
        className={`rounded-full w-full ${sizePaddingClasses[size]} bg-pink-600 text-white`}
      >
        {children}
      </span>
      {/* {endIcon && <span className="flex items-center">{endIcon}</span>} */}
      <motion.div
        variants={{
          initial: { x: 0 }, // Vị trí ban đầu
          hover: { x: 6 }, // Di chuyển sang phải 8px khi hover
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 17,
        }} // Hiệu ứng spring mượt mà
      >
        <ArrowRightIcon weight="bold" className="size-7" />
      </motion.div>
    </motion.button>
  )
}

export default Button
