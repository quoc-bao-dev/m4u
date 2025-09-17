'use client'
import { Lightning } from '@/icons'
import { ArrowRightIcon } from '@phosphor-icons/react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import React, { useEffect, useRef } from 'react'
import { useDevice } from '@/core/hooks'

// Interface định nghĩa props cho ReviewCard
interface ReviewCardProps {
  // Hình ảnh reviewer
  reviewerImage: string
  reviewerAlt?: string
  // Video reviewer (ưu tiên hiển thị nếu có)
  reviewerVideo?: string

  // Thông tin sản phẩm
  productImage: string
  productAlt?: string
  brandName: string
  productName: string

  // Thông tin thời gian
  timeInfo: string

  // Thông tin progress bar
  progressPercentage: number // Từ 0-100
  participationText: string

  // Thông tin button
  buttonText: string
  onButtonClick?: () => void

  // Styling
  className?: string
  // trạng thái active khi card ở giữa vùng nhìn
  isActive?: boolean
  // click vào toàn bộ card
  onClick?: () => void
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  reviewerImage,
  reviewerAlt = 'reviewer',
  reviewerVideo,
  productImage,
  productAlt = 'product',
  brandName,
  productName,
  timeInfo,
  progressPercentage,
  participationText,
  buttonText,
  onButtonClick,
  className = '',
  isActive = false,
  onClick,
}) => {
  const { isMobile } = useDevice()
  const tCommon = useTranslations('common')
  const videoRef = useRef<HTMLVideoElement | null>(null)

  // Chỉ phát video khi card active; còn lại tạm dừng và reset
  useEffect(() => {
    const vid = videoRef.current
    if (!vid) return
    if (isActive) {
      vid.play().catch(() => {})
    } else {
      try {
        vid.pause()
      } catch {}
    }
  }, [isActive])

  // Hiển thị khung hình đầu tiên của chính video trên iOS/iPadOS
  useEffect(() => {
    const vid = videoRef.current
    if (!vid || !reviewerVideo) return

    const renderFirstFrame = async () => {
      try {
        vid.muted = true
        // đảm bảo inline trên iOS
        ;(vid as any).playsInline = true
        // buộc trình duyệt render frame đầu: play rồi pause ngay
        // await vid.play()
        vid.pause()
        try {
          vid.currentTime = 0.001
        } catch {}
      } catch {}
    }

    const onLoaded = () => {
      renderFirstFrame()
    }

    vid.addEventListener('loadeddata', onLoaded)
    vid.addEventListener('loadedmetadata', onLoaded)
    if (vid.readyState >= 2) {
      renderFirstFrame()
    }

    return () => {
      vid.removeEventListener('loadeddata', onLoaded)
      vid.removeEventListener('loadedmetadata', onLoaded)
    }
  }, [reviewerVideo])

  return (
    <div
      onClick={onClick}
      className={`h-fit shadow-[0px_4px_24px_0px_#0000000F] flex flex-col rounded-3xl ${className}`}
    >
      {/* Hình ảnh reviewer */}
      <motion.div
        className="w-[280px] xl:w-[410px] overflow-hidden rounded-t-3xl"
        animate={{
          height: isActive ? (isMobile ? 300 : 450) : isMobile ? 250 : 342,
        }}
        transition={{ type: 'spring', stiffness: 140, damping: 18 }}
      >
        {reviewerVideo ? (
          <video
            ref={videoRef}
            src={reviewerVideo}
            className="w-full h-full object-cover"
            muted
            loop
            playsInline
            autoPlay={isActive}
            preload="auto"
          />
        ) : (
          <Image
            src={reviewerImage}
            alt={reviewerAlt || tCommon('reviewer')}
            width={500}
            height={500}
            className="w-full h-full object-cover"
          />
        )}
      </motion.div>

      {/* Nội dung card */}
      <div className="p-3 xl:p-5 rounded-b-3xl bg-orange-100 flex gap-3 w-[280px] xl:w-[410px]">
        {/* Hình ảnh sản phẩm */}
        <div className="w-[60px] xl:w-20 aspect-[80/100] flex-shrink-0">
          <Image
            src={productImage}
            alt={productAlt || tCommon('product')}
            width={500}
            height={500}
            className="w-full object-cover rounded-lg"
          />
        </div>

        {/* Thông tin chi tiết */}
        <div className="flex flex-col gap-1 w-full flex-1 min-w-0">
          {/* Header với brand và thời gian */}
          <div className="flex items-center gap-2 justify-between">
            <h3 className="text-[10px] xl:text-sm font-bold text-greyscale-900">
              {brandName}
            </h3>
            <p className="text-[10px] xl:text-sm text-greyscale-600">
              {timeInfo}
            </p>
          </div>

          {/* Tên sản phẩm */}
          <h3 className="text-greyscale-900 text-sm xl:text-lg font-normal truncate">
            {productName}
          </h3>

          {/* Progress bar */}
          <div className="py-1">
            <div className="relative w-full h-1.5">
              <div
                className="relative"
                style={{ width: `${progressPercentage}%` }}
              >
                <div className="h-1.5 w-full rounded-full bg-gradient-to-r from-[#FF9800] via-[#EF6C00] to-[#FF8500]"></div>
                <Lightning className="size-6 absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2" />
              </div>

              <div className="opacity-20 absolute top-0 left-0 h-1.5 w-full rounded-full bg-gradient-to-r from-[#FF9800] via-[#EF6C00] to-[#FF8500]"></div>
            </div>
          </div>

          {/* Text participation */}
          <p className="text-xs xl:text-sm text-greyscale-700">
            {participationText}
          </p>

          {/* Button đăng ký */}
          <button
            className="flex items-center justify-between gap-2 pt-3 text-pink-600 hover:text-pink-500 transition-all duration-300 text-sm font-semibold cursor-pointer"
            onClick={onButtonClick}
          >
            {buttonText}
            <ArrowRightIcon weight="bold" className="size-4 text-pink-600" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ReviewCard
