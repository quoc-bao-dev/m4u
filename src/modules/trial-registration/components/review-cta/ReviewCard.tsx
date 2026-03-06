'use client'

import { Lightning } from '@/icons'
import { ArrowRightIcon } from '@phosphor-icons/react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'

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
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

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

  return (
    <div
      onClick={onClick}
      className={`shadow-[0px_4px_24px_0px_#0000000F] flex flex-col rounded-3xl w-[260px] md:w-[280px] xl:w-[410px] ${className}`}
    >
      {/* Hình ảnh reviewer */}
      <motion.div
        className="w-full overflow-hidden rounded-t-3xl"
        animate={{
          height: isMobile ? (isActive ? 280 : 250) : isActive ? 400 : 342,
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
            preload="metadata"
            // poster={reviewerImage}
          />
        ) : (
          <Image
            src={reviewerImage}
            alt={reviewerAlt}
            width={500}
            height={500}
            className="w-full h-full object-cover"
          />
        )}
      </motion.div>

      {/* Nội dung card */}
      <div className="p-3 md:p-2 xl:p-3 rounded-b-3xl bg-orange-100 flex gap-3 md:gap-2 xl:gap-3 w-full">
        {/* Hình ảnh sản phẩm */}
        <div className="w-14 md:w-12 xl:w-16 aspect-[80/100] flex-shrink-0">
          <Image
            src={productImage}
            alt={productAlt}
            width={500}
            height={500}
            className="w-full object-cover rounded-lg"
          />
        </div>

        {/* Thông tin chi tiết */}
        <div className="flex flex-col gap-1 w-full flex-1 min-w-0">
          {/* Header với brand và thời gian */}
          <div className="flex items-center gap-1 xl:gap-2 justify-between">
            <h3 className="text-xs md:text-[8px] xl:text-xs font-bold text-greyscale-900 truncate">
              {brandName}
            </h3>
            <p className="text-xs md:text-[8px] xl:text-xs text-greyscale-600 truncate">
              {timeInfo}
            </p>
          </div>

          {/* Tên sản phẩm */}
          <h3 className="text-greyscale-900 text-sm md:text-xs xl:text-sm font-normal truncate">
            {productName}
          </h3>

          {/* Progress bar */}
          <div className="py-1 md:py-0.5 xl:py-1">
            <div className="relative w-full h-1.5 md:h-1 xl:h-1.5">
              <div
                className="relative"
                style={{ width: `${progressPercentage}%` }}
              >
                <div className="h-1.5 md:h-1 xl:h-1.5 w-full rounded-full bg-gradient-to-r from-[#FF9800] via-[#EF6C00] to-[#FF8500]"></div>
                <Lightning className="size-5 md:size-4 xl:size-6 absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2" />
              </div>

              <div className="opacity-20 absolute top-0 left-0 h-1.5 md:h-1 xl:h-1.5 w-full rounded-full bg-gradient-to-r from-[#FF9800] via-[#EF6C00] to-[#FF8500]"></div>
            </div>
          </div>

          {/* Text participation */}
          <p className="text-xs md:text-[10px] xl:text-xs text-greyscale-700 truncate">
            {participationText}
          </p>

          {/* Button đăng ký */}
          <button
            className="flex items-center justify-between gap-2 md:gap-1 xl:gap-2 pt-3 md:pt-2 xl:pt-3 text-pink-600 hover:text-pink-500 transition-all duration-300 text-sm md:text-xs xl:text-sm font-semibold cursor-pointer"
            onClick={onButtonClick}
          >
            <span className="truncate">{buttonText}</span>
            <ArrowRightIcon
              weight="bold"
              className="size-4 md:size-3 xl:size-4 text-pink-600 flex-shrink-0"
            />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ReviewCard
