'use client'
import dynamic from 'next/dynamic'
import { useDevice, useToast } from '@/core/hooks'
import { useCountdown } from '@/core/hooks/useCountdown'
import { withAlpha } from '@/core/utils'
import { isDdHhMmSsZero } from '@/core/utils/time'
import { Lightning } from '@/icons'
import { Link, useTranslation } from '@/locale'
import { useAuth } from '@/modules/auth'
import InfoKolModal from '@/modules/review-hub/review-hub-detail/components/InfoKolModal'
import { useCartIconStore } from '@/modules/trial-registration/stores/useCartIconStore'
import { useCartStore } from '@/modules/trial-registration/stores/useCartStore'
import useModalRegistration from '@/modules/trial-registration/stores/useModalRegistration'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import React, { useState } from 'react'

const ReviewVideo = dynamic(() => import('./ReviewVideo'), {
  ssr: false,
})
interface ReviewCardProps {
  productAlt?: string
  className?: string
  isActive?: boolean
  data: any
  onClick?: () => void
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  productAlt = 'product',
  className = '',
  isActive = false,
  data,
  onClick,
}) => {
  const { isMobile } = useDevice()
  const { t } = useTranslation()
  const tProduct = useTranslations('product')
  const videoSrc = data?.video_review_render ?? data?.video_review
  const thumbnailSrc = data?.small_image_video_review ?? data?.image_product
  const shouldPlayVideo = Boolean(isActive && videoSrc)
  const { isAuthenticated } = useAuth()
  const { openCart } = useCartIconStore()
  const { showSuccess } = useToast()
  const { addItem, isItemInCart } = useCartStore()
  const { open: openModalRegistration } = useModalRegistration()

  const { formatted: formattedTime, isEnded } = useCountdown(
    data?.time_left_dd_hh_mm_ss
  )

  const [isOpen, setIsOpen] = useState(false)

  const handleRegistration = (e: any) => {
    if (e && typeof e.stopPropagation === 'function') {
      e.stopPropagation()
      e.preventDefault()
    }

    if (!isAuthenticated) {
      // Khi chưa đăng nhập: mở modal đăng ký
      openModalRegistration({
        productId: data?.id_product,
        productImage: data?.image_product,
        productName: data?.name,
        productBrand: data?.code,
        productColor: data?.background_color,
      })
    } else {
      if (!isItemInCart(data?.id_product)) {
        addItem(data?.id_product)
        showSuccess(t('cart.addedToCart'))
        // Mở CartIcon dropdown sau khi thêm sản phẩm
        openCart()
      } else {
        showSuccess(t('cart.alreadyInCart'))
      }
    }
  }

  return (
    <>
      <div
        onClick={onClick}
        className={`h-fit shadow-[0px_4px_24px_0px_#0000000F] flex flex-col rounded-3xl ${className}`}
      >
        {/* Hình ảnh reviewer */}
        <motion.div
          className="w-[280px] xl:w-[410px] overflow-hidden rounded-t-3xl relative"
          animate={{
            height: isActive ? (isMobile ? 300 : 450) : isMobile ? 250 : 342,
          }}
          transition={{ type: 'spring', stiffness: 140, damping: 18 }}
        >
          <div className="relative h-full w-full">
            {thumbnailSrc && (
              <Image
                src={thumbnailSrc}
                alt={productAlt || tProduct('participation')}
                fill
                className="object-cover"
                priority={false}
              />
            )}
            {shouldPlayVideo && videoSrc && (
              <ReviewVideo
                key={videoSrc}
                src={videoSrc}
                poster={thumbnailSrc}
                className="pointer-events-none"
              />
            )}
          </div>
        </motion.div>

        {/* Nội dung card */}
        <div className="p-3 xl:p-5 rounded-b-3xl bg-orange-100 flex gap-3 w-[280px] xl:w-[410px]">
          {/* Hình ảnh sản phẩm */}
          <Link
            href={`/review-hub/${data?.slug}`}
            className="w-[60px] xl:w-20 aspect-[80/100] flex-shrink-0"
          >
            <Image
              src={data?.image_product}
              alt={productAlt || tProduct('participation')}
              width={500}
              height={500}
              className="w-full object-cover rounded-lg"
            />
          </Link>

          {/* Thông tin chi tiết */}
          <div className="flex flex-col gap-1 w-full flex-1 min-w-0">
            {/* Header với brand và thời gian */}
            <div className="flex items-center gap-2 justify-between">
              <h3 className="text-[10px] xl:text-sm font-bold text-greyscale-900">
                {data?.code}
              </h3>
              {!isEnded && !isDdHhMmSsZero(data?.time_left_dd_hh_mm_ss) && (
                <p className="text-[10px] xl:text-sm text-greyscale-600">
                  {formattedTime}
                </p>
              )}
            </div>

            {/* Tên sản phẩm */}
            <Link
              href={`/review-hub/${data?.slug}`}
              className="text-greyscale-900 text-sm xl:text-lg font-normal truncate hover:text-pink-600 transition-all duration-300"
            >
              {data?.name}
            </Link>

            {/* Progress bar */}
            <div className="py-1">
              <div className="relative w-full h-1.5">
                <div
                  className="relative"
                  style={{
                    width: `${(data?.count_join / data?.limit_people) * 100}%`,
                    maxWidth: '100%',
                  }}
                >
                  <div className="h-1.5 w-full rounded-full bg-gradient-to-r from-[#FF9800] via-[#EF6C00] to-[#FF8500]"></div>
                  <Lightning className="size-6 absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2" />
                </div>

                <div className="opacity-20 absolute top-0 left-0 h-1.5 w-full rounded-full bg-gradient-to-r from-[#FF9800] via-[#EF6C00] to-[#FF8500]"></div>
              </div>
            </div>

            {/* Text participation */}
            <p className="text-xs xl:text-sm text-greyscale-700">
              {data?.count_join}/{data?.limit_people}{' '}
              {tProduct('participation')}
            </p>

            {
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setIsOpen(true)
                }}
                className="transform-gpu border-gradient-button-dynamic bg-white w-fit py-2 px-3 sm:py-4 sm:px-5 md:py-2 md:px-5 rounded-full cursor-pointer flex items-center gap-3"
                style={
                  {
                    color: data?.background_color,
                    transition: 'all 300ms ease',
                    boxShadow: `0px 2px 4px ${withAlpha(
                      data?.background_color,
                      0.26
                    )}, -2px -2px 8px ${withAlpha(
                      data?.background_color,
                      0.7
                    )} inset, 2px 2px 8px -5px ${withAlpha(
                      data?.background_color,
                      0.7
                    )} inset`,
                    '--accent-color': data?.background_color,
                  } as React.CSSProperties
                }
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = data?.background_color
                  e.currentTarget.style.color = '#fff'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff'
                  e.currentTarget.style.color = data?.background_color
                }}
              >
                <span className="truncate text-xs sm:text-base/[21px] ">
                  {tProduct('viewReview')}
                </span>
                {/* <PenIcon /> */}
              </button>
            }
          </div>
        </div>
      </div>
      <InfoKolModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        id={data?.id_review_detail}
      />
    </>
  )
}

export default ReviewCard
