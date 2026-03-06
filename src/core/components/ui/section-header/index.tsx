'use client'

interface SectionHeaderProps {
  /** Title text */
  title: string
  /** Tag line color */
  tagColor?: string
  /** Custom class name */
  className?: string
  /** Title text size */
  titleSize?: 'sm' | 'md' | 'lg' | 'xl'
  /** Tag line width */
  tagWidth?: string
  /** Tag line height */
  tagHeight?: string
}

const SectionHeader = ({
  title,
  tagColor = 'bg-pink-500',
  className = '',
  titleSize = 'xl',
  tagWidth = 'w-[12px]',
  tagHeight = 'h-[32px]',
}: SectionHeaderProps) => {
  const titleSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  }

  return (
    <div className={`flex items-center gap-3 mb-6 ${className}`}>
      <div className={`${tagWidth} ${tagHeight} ${tagColor} rounded`}></div>
      <h2
        className={`${titleSizeClasses[titleSize]} text-gray-900 font-semibold`}
      >
        {title}
      </h2>
    </div>
  )
}

export default SectionHeader
