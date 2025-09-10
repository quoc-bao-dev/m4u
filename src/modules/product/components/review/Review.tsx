import { cn } from '@/core/utils/cn'
import React from 'react'
import RatingRing from './RatingRing'
import { Rating } from '@/core/components'

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
  maxCount,
}: {
  stars: number
  count: number
  percentage: number
  maxCount: number
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
        {rating.toFixed(1)} <span className="text-greyscale-400">/5</span>
      </span>{' '}
      <span className="text-sm text-left text-greyscale-400 truncate">
        {name}
      </span>
    </div>
  </div>
)

const Review: React.FC<ReviewSectionProps> = ({
  starDistribution,
  featureRatings,
  className,
}) => {
  const maxCount = Math.max(...starDistribution.map((item) => item.count))

  return (
    <div className={cn('rounded-2xl p-4 md:p-8 border', className)}>
      <div className="flex flex-col md:flex-row justify-between">
        <div className="md:w-[60%] flex gap-8 items-center">
          {/* Overall Rating */}
          <RatingRing value={4} label="Excellent" reviews={69} />

          {/* Star Distribution */}
          <div className="flex-1 h-fit">
            <div className="space-y-2 ">
              {starDistribution.map((item) => (
                <StarDistributionBar
                  key={item.stars}
                  stars={item.stars}
                  count={item.count}
                  percentage={item.percentage}
                  maxCount={maxCount}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Feature Ratings */}
        <div className="space-y-4 md:w-[38%] lg:w-[30%] flex items-center justify-end">
          <div className="space-y-1 w-full md:w-auto mt-2">
            {featureRatings.map((feature, index) => (
              <FeatureRatingItem key={index} {...feature} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Review
