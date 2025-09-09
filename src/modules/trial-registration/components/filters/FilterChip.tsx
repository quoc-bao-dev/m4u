'use client'

interface FilterChipProps {
  label: string
  onClick?: () => void
  isActive?: boolean
  hasDropdown?: boolean
  className?: string
}

const FilterChip = ({
  label,
  onClick,
  isActive = false,
  hasDropdown = false,
  className = '',
}: FilterChipProps) => {
  const baseClasses =
    'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-200'

  const activeClasses = isActive
    ? 'bg-pink-100 dark:bg-pink-900 text-pink-700 dark:text-pink-300'
    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'

  const flexClasses = hasDropdown ? 'flex items-center gap-1' : ''

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${activeClasses} ${flexClasses} ${className} border border-gray-200`}
    >
      {label}
      {hasDropdown && (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      )}
    </button>
  )
}

export default FilterChip
