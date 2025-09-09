'use client'
import Rating from '@/components/Rating'
import { IMAGES } from '@/core/constants/IMAGES'
import { useDevice } from '@/core/hooks'
import { StarIcon } from '@phosphor-icons/react'
import Image from 'next/image'

interface Kol {
  name: string
  image: string
  rating: number
  reviews: number
}

interface TopReviewerCardProps {
  productName?: string
  brandName?: string
  rating?: number
  reviewCount?: number
  productImage?: string
  kols?: Kol[]
  className?: string
  topReview?: number
}

const TopReviewerCard = ({
  productName = 'Panthetoin Deep Moisture Mask',
  brandName = 'MANYO',
  rating = 4.0,
  reviewCount = 69,
  productImage = IMAGES.topProduct,
  kols = [],
  className = '',
  topReview = 1,
}: TopReviewerCardProps) => {
  const { isMobile, isTablet } = useDevice()
  return (
    <div
      className={`relative flex gap-3 xl:gap-6 w-full py-3 lg:py-0 border-b border-greyscale-200 lg:border-none ${className}`}
    >
      <Image
        src={productImage}
        alt="top-reviewer"
        width={1000}
        height={1000}
        className="hidden xl:block lg:size-[160px] xl:size-[250px] 2xl:size-[300px] object-cover rounded-3xl"
      />
      <div className="flex flex-col justify-end gap-3 2xl:gap-5 w-full min-w-0 z-10">
        <div className="flex gap-3 justify-between items-end">
          <div className="flex flex-col xl:flex-row gap-2">
            {topReview && topReview > 0 && topReview <= 3 ? (
              <span className="text-[40px]/[100%] xl:text-[48px]/[110%] 2xl:text-[64px]/[110%] font-semibold">
                {topReview === 1 && '🥇'}
                {topReview === 2 && '🥈'}
                {topReview === 3 && '🥉'}
              </span>
            ) : (
              <span className="rounded-full size-8 lg:size-12 flex-shrink-0 aspect-square flex items-center justify-center p-2.5 bg-pink-100 text-base lg:text-[32px] font-semibold text-greyscale-900">
                {' '}
                {topReview}{' '}
              </span>
            )}
            <div className="flex flex-col gap-2 2xl:gap-3">
              <h3 className="text-[10px] lg:text-sm 2xl:text-base font-bold text-greyscale-900">
                {brandName}
              </h3>
              <p className="text-sm lg:text-base xl:text-xl 2xl:text-2xl leading-[100%] text-greyscale-900">
                {productName}
              </p>
              <div className="flex items-center gap-3 pt-0 xl:pt-1 2xl:pt-2">
                <Rating
                  value={Number(rating)}
                  readOnly
                  maxWidth={isMobile ? 96 : isTablet ? 116 : 136}
                />
                <p className="text-sm lg:text-base xl:text-lg 2xl:text-xl xl:leading-[80%] text-greyscale-500">
                  <span className="text-greyscale-900 font-medium">
                    {rating}{' '}
                  </span>
                  ({reviewCount} reviews)
                </p>
              </div>
            </div>
          </div>
          <Image
            src={productImage}
            alt="top-reviewer"
            width={1000}
            height={1000}
            className="xl:hidden size-[120px] lg:size-[160px] object-cover rounded-xl"
          />
        </div>

        <div className="relative">
          <div className="absolute z-[2] top-0 right-0 w-10 h-full bg-gradient-to-l from-white to-transparent"></div>
          <div className="flex gap-2 2xl:gap-3 overflow-x-scroll scroll-hidden flex-1 min-w-0">
            {kols.map((kol, index) => (
              <div className="relative" key={index}>
                <div className="absolute top-1 right-1 flex items-center gap-0.5 bg-white rounded-full py-0.5 px-1">
                  <StarIcon
                    weight="fill"
                    className="2xl:size-4 size-3 text-yellow-600"
                  />
                  <span className="text-[10px] lg:text-xs 2xl:text-sm leading-[100%] font-medium text-greyscale-900">
                    {kol.rating}
                  </span>
                </div>
                <Image
                  src={kol.image}
                  alt="kol"
                  width={1000}
                  height={1000}
                  className="size-[100px] 2xl:size-[140px] min-w-[100px] 2xl:min-w-[140px] object-cover rounded-xl flex-shrink-0 bg-[#DCE5E5]"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopReviewerCard
