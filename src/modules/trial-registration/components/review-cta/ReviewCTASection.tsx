'use client'
import { Container } from '@/core/components'
import { IMAGES } from '@/core/constants/IMAGES'
import React, { useMemo } from 'react'
import ReviewCTACarousel from './ReviewCTACarousel'

const ReviewCTASection = () => {
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
        participationText: '70/100 participation',
        buttonText: 'Đăng ký dùng thử',
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
        participationText: '45/100 participation',
        buttonText: 'Đăng ký dùng thử',
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
        participationText: '82/120 participation',
        buttonText: 'Đăng ký dùng thử',
      },
    ],
    []
  )

  // carousel logic moved into child component

  return (
    <>
      <div className="md:pt-30"></div>

      <section className="py-[96px] bg-[#FBF7F0]">
        <Container className="pr-0!">
          <div className="flex gap-6 items-center relative">
            <div className="w-[40%] flex justify-center">
              <h2 className="text-center text-[44px] leading-[120%] md:text-[56px] lg:text-[64px] font-bold text-gray-400">
                Còn chần chờ gì nữa mà không{' '}
                <span className="text-gray-900">trở thành</span>
                <br />
                <span className="text-gray-900">reviewer ngay?</span>
              </h2>
            </div>

            <div className="w-[60%] relative">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full">
                <ReviewCTACarousel items={items} />
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
