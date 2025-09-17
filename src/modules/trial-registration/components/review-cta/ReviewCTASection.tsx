'use client'
import { Container } from '@/core/components'
import { IMAGES } from '@/core/constants/IMAGES'
import { useTranslations } from 'next-intl'
import React, { useMemo } from 'react'
import ReviewCTACarousel from './ReviewCTACarousel'

const ReviewCTASection = () => {
  const t = useTranslations('reviewCTA')

  const items = useMemo(
    () => [
      {
        reviewerImage: IMAGES.reviewer1,
        reviewerAlt: 'reviewer',
        reviewerVideo:
          'https://cdn2.videowise.com/converted/videos/1747066892278_wid_NjgyMjIwMGMzZjJiOTAwMDU4OGMxZTNm_h264cmobile.mp4',
        productImage: IMAGES.product1,
        productAlt: 'product',
        brandName: 'MANYO',
        productName: 'Panthetoin Deep Moisture Mask',
        timeInfo: '09h 16m 30s',
        progressPercentage: 70,
        participationText: `70/100 ${t('participation')}`,
        buttonText: t('registerTrial'),
      },
      {
        reviewerImage: IMAGES.reviewer1,
        reviewerAlt: 'reviewer',
        reviewerVideo:
          'https://cdn2.videowise.com/custom-videos/videos/1747066892926_wid_NjgyMjIwMGMzZjJiOTAwMDU4OGMxZWE4.mp4',
        productImage: IMAGES.product1,
        productAlt: 'product',
        brandName: 'COSRX',
        productName: 'Advance Snail 96 Mucin Power Essence',
        timeInfo: '02h 45m 10s',
        progressPercentage: 45,
        participationText: `45/100 ${t('participation')}`,
        buttonText: t('registerTrial'),
      },
      {
        reviewerImage: IMAGES.reviewer1,
        reviewerAlt: 'reviewer',
        reviewerVideo:
          'https://cdn2.videowise.com/custom-videos/videos/1747066889667_wid_NjgyMjIwMDkzZjJiOTAwMDU4OGMxYzJi.mp4',
        productImage: IMAGES.product1,
        productAlt: 'product',
        brandName: 'INNISFREE',
        productName: 'Green Tea Seed Serum',
        timeInfo: '15h 02m 00s',
        progressPercentage: 82,
        participationText: `82/120 ${t('participation')}`,
        buttonText: t('registerTrial'),
      },
    ],
    [t]
  )

  // carousel logic moved into child component

  return (
    <>
      <div className="md:pt-30"></div>

      <section className="py-[96px] bg-[#FBF7F0]">
        <Container className="px-0 md:pr-0!">
          <div className="flex flex-col md:flex-row gap-6 items-center relative">
            <div className="md:w-[40%] flex justify-center">
              <h2 className="text-center text-title-sect leading-[120%] md:text-[56px] lg:text-[64px] font-bold text-gray-400">
                {t('title')}{' '}
                <span className="text-gray-900">{t('become')}</span>
                <br />
                <span className="text-gray-900">{t('reviewerNow')}</span>
              </h2>
            </div>

            {/* Mobile: Center carousel, Desktop: Keep original layout */}
            <div className="w-full md:w-[60%] relative">
              {/* Mobile: Center the carousel */}
              <div className="overflow-hidden  md:absolute md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 w-full flex justify-center px-8 md:px-0">
                <div className="overflow-hidden -ml-[300px] -mr-[300px] md:ml-0 md:mr-0">
                  <ReviewCTACarousel items={items} />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
      <div className="md:pt-30"></div>
    </>
  )
}

export default ReviewCTASection
