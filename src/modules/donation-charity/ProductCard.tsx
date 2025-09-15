import { IMAGES } from '@/core/constants/IMAGES'
import { PolygonBg } from '@/icons'
import Image from 'next/image'
import { useLayoutEffect, useState } from 'react'

interface ProductCardProps {
  brand: string
  productName: string
  contributionPercentage: number
  imageSrc?: string
  className?: string
  scale?: number
  colorScheme?: 'yellow' | 'pink' | 'blue' | 'green'
  widthClass?: string
  variant?: 'main' | 'item'
  disableEnterAnimation?: boolean
}

const ProductCard = ({
  brand,
  productName,
  contributionPercentage,
  imageSrc = IMAGES.deal2,
  className = '',
  scale = 0.8,
  colorScheme = 'yellow',
  widthClass = 'w-[400px]',
  variant = 'item',
  disableEnterAnimation = false
}: ProductCardProps) => {
  const [isEnteringTop, setIsEnteringTop] = useState(false)

  useLayoutEffect(() => {
    if (disableEnterAnimation) {
      setIsEnteringTop(false)
      return
    }
    if (variant === 'main') {
      setIsEnteringTop(true)
      const id = requestAnimationFrame(() => {
        // Chuyển sang trạng thái cuối để chạy transition từ dưới lên
        setIsEnteringTop(false)
      })
      return () => cancelAnimationFrame(id)
    } else {
      setIsEnteringTop(false)
    }
  }, [variant, disableEnterAnimation])
  // Color schemes
  const colorSchemes = {
    yellow: {
      polygon: '#FCD34D',
      card: 'bg-yellow-300',
      bottom: 'bg-yellow-500'
    },
    pink: {
      polygon: '#F472B6',
      card: 'bg-pink-300',
      bottom: 'bg-pink-500'
    },
    blue: {
      polygon: '#60A5FA',
      card: 'bg-blue-300',
      bottom: 'bg-blue-500'
    },
    green: {
      polygon: '#34D399',
      card: 'bg-green-300',
      bottom: 'bg-green-500'
    }
  }

  const colors = colorSchemes[colorScheme]
  const darkenHexToRgba = (hex: string, darkenFactor = 0.2, alpha = 0.3) => {
    const sanitized = hex.replace('#', '')
    const r = parseInt(sanitized.substring(0, 2), 16)
    const g = parseInt(sanitized.substring(2, 4), 16)
    const b = parseInt(sanitized.substring(4, 6), 16)
    const rd = Math.round(r * darkenFactor)
    const gd = Math.round(g * darkenFactor)
    const bd = Math.round(b * darkenFactor)
    return `rgba(${rd}, ${gd}, ${bd}, ${alpha})`
  }
  const insetShadow = `inset 0px -5.58px 4.18px 0px ${darkenHexToRgba(colors.polygon, 0.5, 0.3)}`
  return (
    <div
      className={`flex flex-col h-full justify-end items-center ${widthClass} ${className} will-change-transform transform-gpu`}
      data-variant={variant}
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'bottom center'
      }}
    >
      {/* Ảnh trên: chỉ render khi main, không dùng opacity */}
      {variant === 'main' ? (
        <div className={`relative z-10 w-[90%] aspect-[265/298] will-change-transform transform-gpu transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isEnteringTop ? 'translate-y-32' : 'translate-y-20'}`}>
          <PolygonBg className={`absolute inset-0 pointer-events-none`} style={{ color: colors.polygon }} />
          <Image
            src={imageSrc}
            alt={productName}
            width={1000}
            height={1000}
            className='object-cover absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] aspect-[265/298]'
          />
        </div>
      ) : null}

      <div className={`w-full flex flex-col justify-center items-center rounded-t-lg rounded-b-[28px] ${colors.card} will-change-transform transform-gpu transition-transform duration-700`}>
        {variant === 'item' && (
          <div className='relative mt-6 w-[70%] aspect-[265/298] will-change-[transform,opacity] transform-gpu transition-all duration-500 ease-out'>
            <PolygonBg className={`absolute inset-0 pointer-events-none`} style={{ color: colors.polygon }} />
            <Image
              src={imageSrc}
              alt={productName}
              width={1000}
              height={1000}
              className='object-cover absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] aspect-[265/298] will-change-transform transform-gpu'
            />
          </div>
        )}
        <div className={`p-4 flex flex-col items-center justify-center ${variant === 'main' ? 'pt-36' : 'pt-4'}`}>
          <h3 className={`text-base font-bold text-greyscale-900`}>
            {brand}
          </h3>
          <p className={`h-16 text-2xl font-medium text-greyscale-700 text-center line-clamp-2`}>
            {productName}
          </p>
        </div>
        <div className={`p-4 pt-1.5 w-full ${colors.bottom} rounded-b-[8px]`} style={{ boxShadow: insetShadow }}>
          <p className={`text-xl text-greyscale-700 text-center`}>
            <span className='font-bold'>{contributionPercentage}% </span> contribution
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
