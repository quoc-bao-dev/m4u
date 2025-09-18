'use client'

import { Timer } from '@/core/components'
import Rating from '@/core/components/common/Rating'
import { useToast } from '@/core/hooks'
import { cn, getRatingI18nKey } from '@/core/utils'
import { Lightning } from '@/icons'
import { useRouter, useTranslation } from '@/locale'
import { useAuth } from '@/modules/auth'
import { PauseIcon, PenIcon, PlayIcon, StarIcon } from '@phosphor-icons/react'
import Image from 'next/image'
import React from 'react'
import { useCartIconStore } from '../../stores/useCartIconStore'
import { useCartStore } from '../../stores/useCartStore'
import useModalRegistration from '../../stores/useModalRegistration'

interface ProductCardProps {
  id: number
  image: string
  imageAlt?: string
  rate: number // 0-5
  backgroundColor?: string
  bgColor?: string
  hex?: string
  brand: string
  productName: string
  participation: number // 0-100
  limitPeople: number
  time?: string // HH:MM:SS
  className?: string
  classNameImage?: string
  isSig?: number
  video_review?: string
  evaluate?: number
  id_review?: number
}

const clampRate = (value: number) => {
  if (Number.isNaN(value)) return 0
  if (value < 0) return 0
  if (value > 5) return 5
  return Math.round(value * 10) / 10
}

// Append alpha hex to #RRGGBB → #RRGGBBAA
const withAlpha = (hexColor: string, alphaHex: string) => {
  if (/^#([0-9a-fA-F]{6})$/.test(hexColor)) return `${hexColor}${alphaHex}`
  return hexColor
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  image,
  imageAlt = 'product',
  rate,
  backgroundColor = '#FFF7ED',
  bgColor,
  hex,
  brand,
  productName,
  participation,
  limitPeople,
  time,
  className = '',
  classNameImage = '',
  isSig,
  video_review,
  evaluate,
  id_review
}) => {
  const router = useRouter()
  const { t } = useTranslation()

  const { isAuthenticated } = useAuth()
  const { openCart } = useCartIconStore()
  const { showSuccess, showError } = useToast()
  const { addItem, isItemInCart } = useCartStore()
  const { open: openModalRegistration } = useModalRegistration()

  const safeRate = clampRate(rate)
  const progressPercent = Math.max(
    0,
    Math.min(100, Math.round((participation / limitPeople) * 100))
  )
  const accentHex = hex || '#FF8500'
  const contentBg = bgColor || backgroundColor

  // Video controls
  const videoRef = React.useRef<HTMLVideoElement | null>(null)
  const [isPlaying, setIsPlaying] = React.useState(false)
  const togglePlay = (e: any) => {
    if (e && typeof e.stopPropagation === 'function') {
      e.stopPropagation()
      e.preventDefault()
    }
    const el = videoRef.current
    if (!el) return
    if (isPlaying) {
      el.pause()
      setIsPlaying(false)
    } else {
      el.play()
      setIsPlaying(true)
    }
  }

  const handleRegistration = (e: any) => {
    if (e && typeof e.stopPropagation === 'function') {
      e.stopPropagation()
      e.preventDefault()
    }

    if (!isAuthenticated) {
      // Khi chưa đăng nhập: mở modal đăng ký
      openModalRegistration({
        productId: id,
        productImage: image,
        productName,
        productBrand: brand,
        productColor: contentBg,
      })
    } else {
      if (!isItemInCart(id)) {
        addItem(id)
        showSuccess(t('cart.addedToCart'))
        // Mở CartIcon dropdown sau khi thêm sản phẩm
        openCart()
      } else {
        showError(t('cart.alreadyInCart'))
      }
    }
  }

  return (
    <div className="bg-gray-50- rounded-3xl">
      <div
        className={`relative shadow-[0px_4px_24px_0px_#0000000F] rounded-3xl h-fit select-none w-full ${className}`}
      >
        <div className="rounded-t-3xl relative overflow-hidden w-full aspect-square">
          <div
            className="absolute inset-0 -z-10 w-full h-full"
            style={{
              background: `radial-gradient(circle, white 0%, ${withAlpha(
                accentHex,
                '26'
              )} )`,
            }}
          />
          <div className="absolute top-4 left-4 flex items-center gap-1 bg-white rounded-full py-0.5 px-1.5 text-base font-medium text-greyscale-900">
            <StarIcon weight="fill" className="size-5 text-yellow-600" />
            {safeRate.toFixed(1)}
          </div>
          <Image
            src={image}
            alt={imageAlt}
            width={820}
            height={820}
            className={cn(
              'bg-red-500- w-full h-[400px] md:h-[320px] lg:h-[370px] xl:h-[400px] max-h-full object-contain rounded-t-3xl',
              classNameImage
            )}
          />

          <div className="absolute bottom-0 right-0">
            {time && <Timer initTime={time} />}
          </div>
        </div>
        <div
          className="p-2 xl:p-3 flex flex-col gap-1 rounded-b-3xl w-full"
          style={{ backgroundColor: withAlpha(contentBg, "90") }}
        >
          <h3 className="text-xs sm:text-sm font-bold text-greyscale-900">
            {brand}
          </h3>
          <h3 className="text-greyscale-900 text-base sm:text-lg truncate">
            {productName}
          </h3>

          {isSig !== 1 && (
            <>
              <div className="py-1">
                <div className="relative w-full h-1 sm:h-1.5">
                  <div
                    className="relative"
                    style={{ width: `${progressPercent}%` }}
                  >
                    <div className="h-1 sm:h-1.5 w-full rounded-full bg-gradient-to-r from-[#FF9800] via-[#EF6C00] to-[#FF8500]" />
                    <Lightning className="size-5 sm:size-6 absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2" />
                  </div>
                  <div className="opacity-20 absolute top-0 left-0 h-1 sm:h-1.5 w-full rounded-full bg-gradient-to-r from-[#FF9800] via-[#EF6C00] to-[#FF8500]" />
                </div>
              </div>
              <p className="text-xs sm:text-sm text-greyscale-700">{`${progressPercent}/${limitPeople} ${t(
                'product.participation'
              )}`}</p>
            </>
          )}
          
          {/* isSig === 0 nhảy qua đánh giá  */}
          {isSig === 0 ?
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                router.push(`/submit-review/${id_review}`)
              }}
              className="transform-gpu border-gradient-button-dynamic bg-white w-fit mt-2 py-3 px-4 sm:py-4 sm:px-5 md:py-2 md:px-5 rounded-full cursor-pointer text-sm sm:text-base/[21px] flex items-center gap-3"
              style={{
                color: accentHex,
                transition: 'all 300ms ease',
                boxShadow: `0px 2px 4px ${withAlpha(accentHex, '26')}, -2px -2px 8px ${withAlpha(accentHex, '7A')} inset, 2px 2px 8px -5px ${withAlpha(accentHex, '7A')} inset`,
                '--accent-color': accentHex,
              } as React.CSSProperties}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = accentHex
                e.currentTarget.style.color = '#fff'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#ffffff'
                e.currentTarget.style.color = accentHex
              }}
            >
              <span className="truncate">{t('product.writeYourReview')}</span>
              <PenIcon />
            </button>
            :
            isSig === null ? 
              <button
                onClick={handleRegistration}
                className="bg-white w-fit mt-2 py-3 px-4 sm:py-4 sm:px-5 md:py-2 md:px-5 rounded-full cursor-pointer text-sm sm:text-base/[21px]"
                style={{
                  border: `1px solid ${accentHex}`,
                  color: accentHex,
                  transition: 'all 300ms ease',
                  boxShadow: `0px 2px 2px ${withAlpha(accentHex, '26')}, -2px -2px 6px ${withAlpha(accentHex, '7A')} inset, 2px 2px 8px -5px ${withAlpha(accentHex, '7A')} inset`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = accentHex
                  e.currentTarget.style.color = '#fff'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff'
                  e.currentTarget.style.color = accentHex
                }}
              >
                <span className="truncate">{t('product.register')}</span>
              </button>
              :
              <div className='pt-2 flex gap-3 items-center'>
                {video_review && (
                  <div className='relative cursor-pointer group' onClick={togglePlay}>
                    <div className={`absolute size-7 2xl:size-9 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center bg-black/50 rounded-full transition-opacity duration-200 pointer-events-none ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
                      {isPlaying ? (
                        <PauseIcon weight="fill" className="size-5 text-white" />
                      ) : (
                        <PlayIcon weight="fill" className="size-5 text-white" />
                      )}
                    </div>
                    <video ref={videoRef} muted loop playsInline src={video_review || ""} className='w-16 aspect-[65/83] rounded-lg object-cover' />
                  </div>
                )}
                <div className='flex flex-col gap-1'>
                  <Rating value={evaluate || 0} maxWidth={96} readOnly />
                  <p className='text-xs font-semibold text-[#4E5969]'>{t(getRatingI18nKey(evaluate))}</p>
                </div>
              </div>
          }
        </div>
      </div>
    </div>
  )
}

export default ProductCard
