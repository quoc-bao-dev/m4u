import React from 'react'
import Image from 'next/image'
import Logo from './Logo'
import { Link } from '@/locale'

interface LogoLoadingProps {
  size?: 'sm' | 'md' | 'lg'
  href?: string
  className?: string
  isLoading?: boolean
}

const LogoLoading: React.FC<LogoLoadingProps> = ({ 
  size = 'md', 
  href = '/vi',
  className = '',
  isLoading = false 
}) => {
  const sizeClasses = {
    sm: 'size-[40px]',
    md: 'size-[40px] md:size-[60px]',
    lg: 'size-[60px] md:size-[80px]'
  }

  const sizePx = { sm: 40, md: 60, lg: 80 } as const

  const logoContent = (
    <div className={`${sizeClasses[size]} ${className}`}>
      {isLoading ? (
        <Image
          src="/image/M4U.gif"
          alt="Đang tải"
          width={sizePx[size]}
          height={sizePx[size]}
          className="object-cover size-full"
          unoptimized
        />
      ) : (
        <Logo className={sizeClasses[size]}/>
      )}
    </div>
  )

  if (href) {
    return (
      <Link href={href}>
        {logoContent}
      </Link>
    )
  }

  return logoContent
}

export default LogoLoading
