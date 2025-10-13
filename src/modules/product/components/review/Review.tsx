'use client'
import { Rating } from '@/core/components'
import { getRatingI18nKey } from '@/core/utils'
import { cn } from '@/core/utils/cn'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import React from 'react'
import RatingRing from './RatingRing'
import { useGetDataReviewHubDetailInfinite } from '@/services/review-hub/queries'

interface StarDistribution {
  stars: number
  count: number
  percentage: number
}

interface FeatureRating {
  name: string
  rating: number
}

interface ReviewSectionProps {
  overallRating: number
  totalReviews: number
  starDistribution: StarDistribution[]
  featureRatings: FeatureRating[]
  className?: string
}

const StarIcon = ({
  filled = true,
  className = '',
}: {
  filled?: boolean
  className?: string
}) => (
  <svg
    className={cn('w-4 h-4', className)}
    fill={filled ? '#FACA4A' : '#D1D5DB'}
    viewBox="0 0 20 20"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
)

const StarDistributionBar = ({
  stars,
  count,
  percentage,
}: {
  stars: number
  count: number
  percentage: number
}) => (
  <div className="flex items-center gap-3 ">
    <div className="flex items-center gap-1">
      <span className="text-sm text-gray-600 w-[10px]">{stars}</span>
      <StarIcon />
    </div>
    <div className="flex-1 bg-gray-200 rounded-full h-2 relative">
      <div
        className="bg-pink-600 h-2 rounded-full transition-all duration-300 ease-in-out"
        style={{ width: `${percentage}%` }}
      />
    </div>
    <span className="text-sm text-gray-600 w-12 text-right">{count}</span>
  </div>
)

const FeatureRatingItem = ({ name, rating }: FeatureRating) => (
  <div className="flex items-center gap-2 justify-between md:mt-0 w-full">
    <Rating rate={rating} className="w-[100px] md:w-[120px]" />

    <div className="flex-1 flex gap-4">
      <span className="text-sm font-semibold text-gray-900 truncate">
        {rating?.toFixed(1)} <span className="text-greyscale-400">/5</span>
      </span>{' '}
      <span className="text-sm text-left text-greyscale-400 truncate">
        {name}
      </span>
    </div>
  </div>
)

const Review: React.FC<ReviewSectionProps> = ({ className }) => {
  const { slug } = useParams()
  const t = useTranslations()

  const { data: productDetail } = useGetDataReviewHubDetailInfinite(
    slug as string
  )

  // Tạo mảng đầy đủ từ 1-5 sao, những sao không có đánh giá sẽ có giá trị 0
  const createFullStarDistribution = (countStarData: any[]) => {
    const fullDistribution = []
    const maxCount = Math.max(...countStarData.map((item) => item.total), 1) // Đảm bảo không chia cho 0

    for (let star = 5; star >= 1; star--) {
      const existingData = countStarData.find((item) => item.star === star)
      fullDistribution.push({
        star,
        total: existingData ? existingData.total : 0,
        percentage: existingData ? (existingData.total / maxCount) * 100 : 0,
      })
    }
    return fullDistribution
  }

  // Tạo mảng mặc định với giá trị 0 cho tất cả sao khi chưa có dữ liệu
  const defaultStarDistribution = [
    { star: 5, total: 0, percentage: 0 },
    { star: 4, total: 0, percentage: 0 },
    { star: 3, total: 0, percentage: 0 },
    { star: 2, total: 0, percentage: 0 },
    { star: 1, total: 0, percentage: 0 },
  ]

  const fullStarDistribution = productDetail?.pages?.[0]?.countStar
    ? createFullStarDistribution(productDetail.pages[0].countStar)
    : defaultStarDistribution

  return (
    <div className={cn('rounded-2xl p-4 md:p-8 border', className)}>
      <div className="flex flex-col md:flex-row justify-between">
        <div className="md:w-[60%] flex gap-8 items-center">
          {/* Overall Rating */}
          <RatingRing
            value={productDetail?.pages?.[0]?.average_star || 0}
            label={t(
              getRatingI18nKey(productDetail?.pages?.[0]?.average_star || 0)
            )}
            reviews={productDetail?.pages?.[0]?.quantity_reviews || 0}
          />

          {/* Star Distribution */}
          <div className="flex-1 h-fit">
            <div className="space-y-2 ">
              {fullStarDistribution.map((item: any) => (
                <StarDistributionBar
                  key={item.star}
                  stars={item.star}
                  count={item.total}
                  percentage={item.percentage}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Feature Ratings */}
        <div className="space-y-4 md:w-[38%] lg:w-[30%] flex items-center justify-end">
          <div className="space-y-1 w-full md:w-auto mt-2">
            {productDetail?.pages?.[0]?.type_evaluate?.map(
              (feature: any, index: any) => (
                <FeatureRatingItem
                  key={index}
                  name={feature.name}
                  rating={Number(feature.star)}
                />
              )
            ) || (
              // Hiển thị skeleton khi chưa có dữ liệu
              <div className="space-y-2">
                {[1, 2, 3, 4].map((index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 justify-between w-full"
                  >
                    <div className="w-[100px] md:w-[120px] h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="flex-1 flex gap-4">
                      <div className="w-8 h-4 bg-gray-200 rounded animate-pulse"></div>
                      <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Review
