'use client'

import { Timer } from '@/core/components'
import { cn } from '@/core/utils'
import { Lightning } from '@/icons'
import { useTranslation } from '@/locale'
import { PenIcon, Star as StarIcon } from '@phosphor-icons/react'
import Image from 'next/image'
import React from 'react'
import useModalRegistration from '../../stores/useModalRegistration'
import { useCartStore } from '../../stores/useCartStore'
import { useCartIconStore } from '../../stores/useCartIconStore'
import { useAuth } from '@/modules/auth'
import { useToast } from '@/core/hooks'

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
}) => {
  const { isAuthenticated } = useAuth()
  const { showSuccess, showError } = useToast()

  const safeRate = clampRate(rate)
  const progressPercent = Math.max(
    0,
    Math.min(100, Math.round((participation / limitPeople) * 100))
  )
  const accentHex = hex || '#FF8500'
  const contentBg = bgColor || backgroundColor

  const { t } = useTranslation()

  const { open: openModalRegistration } = useModalRegistration()
  const { addItem, isItemInCart } = useCartStore()
  const { openCart } = useCartIconStore()

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
        addItem({
          id,
          productName,
          productBrand: brand,
          productImage: image,
          productColor: contentBg,
        })
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
          className="p-4 sm:p-5 flex flex-col gap-1 rounded-b-3xl w-full"
          style={{ backgroundColor: withAlpha(contentBg, "90") }}
        >
          <h3 className="text-xs sm:text-sm font-bold text-greyscale-900">
            {brand}
          </h3>
          <h3 className="text-greyscale-900 text-base sm:text-lg truncate">
            {productName}
          </h3>
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
          <button
            onClick={handleRegistration}
            className="bg-white w-fit mt-4 py-3 px-4 sm:py-4 sm:px-5 md:py-2 md:px-5 rounded-full cursor-pointer text-sm sm:text-base/[21px]"
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
          {/* <button
            onClick={handleRegistration}
            className="transform-gpu border-gradient-button-dynamic bg-white w-fit mt-4 py-3 px-4 sm:py-4 sm:px-5 md:py-2 md:px-5 rounded-full cursor-pointer text-sm sm:text-base/[21px] flex items-center gap-3"
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
          </button> */}
        </div>
      </div>
    </div>
  )
}

export default ProductCard
