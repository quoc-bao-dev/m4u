'use client'

import React from 'react'
import Review from './Review'
import { Container } from '@/core/components'
import Reviewer from './Reviewer'
import { useTranslation } from '@/locale'

const ReviewSection = () => {
  const { t } = useTranslation()

  // Sample data based on the image
  const reviewData = {
    overallRating: 4.8,
    totalReviews: 69,
    starDistribution: [
      { stars: 5, count: 912, percentage: 98 },
      { stars: 4, count: 187, percentage: 20.5 },
      { stars: 3, count: 33, percentage: 3.6 },
      { stars: 2, count: 8, percentage: 0.9 },
      { stars: 1, count: 6, percentage: 0.7 },
    ],
    featureRatings: [
      { name: 'Absorbability', rating: 4.7 },
      { name: 'Moisturization', rating: 4.7 },
      { name: 'Skin brightening', rating: 4.7 },
    ],
  }

  return (
    <section className="pb-[40px] md:pb-[96px]">
      <Container>
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-title-sect font-bold">
            <span className="text-greyscale-900">
              {t('product.honestReviews')}
            </span>{' '}
            <span className="text-greyscale-400">
              {t('product.fromRealUsers')}
            </span>
          </h2>
        </div>
        <Review {...reviewData} />
        <Reviewer />
      </Container>
    </section>
  )
}

export default ReviewSection
