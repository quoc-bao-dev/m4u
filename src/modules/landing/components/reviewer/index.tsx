'use client'
import { IMAGES } from '@/core/constants/IMAGES'
import { ArrowLeftIcon, ArrowRightIcon } from '@phosphor-icons/react'
import React from 'react'
import ReviewCard from './ReviewCard'
import Button from '@/core/components/ui/button'

const Reviewer = () => {
  return (
    <div className="py-24 bg-gray-100 flex flex-col items-center justify-center gap-10">
      <div className="flex justify-between items-center w-full px-24">
        <div className="flex flex-col gap-4">
          <h2 className="2xl:text-6xl text-5xl font-bold capitalize text-greyscale-700">
            Reviewer <span className="text-greyscale-400">nói gì?</span>
          </h2>
          <p className="2xl:text-2xl text-xl text-greyscale-700">
            Những video và hình ảnh đánh giá chân thật nhất từ cộng đồng người
            dùng đã trải nghiệm.
          </p>
        </div>
        <div className="flex gap-4 items-center">
          <button className="p-5 rounded-full bg-white border border-greyscale-200 hover:bg-greyscale-200 transition-all duration-300 cursor-pointer group">
            <ArrowLeftIcon
              weight="bold"
              className="text-greyscale-700 size-7 group-hover:scale-110 transition-all duration-300"
            />
          </button>
          <button className="p-5 rounded-full bg-white border border-greyscale-200 hover:bg-greyscale-200 transition-all duration-300 cursor-pointer group">
            <ArrowRightIcon
              weight="bold"
              className="text-greyscale-700 size-7 group-hover:scale-110 transition-all duration-300"
            />
          </button>
        </div>
      </div>
      <div className="flex gap-4 max-w-full overflow-x-auto">
        <ReviewCard
          reviewerImage={IMAGES.reviewer1}
          reviewerAlt="reviewer"
          productImage={IMAGES.product1}
          productAlt="product"
          brandName="MANYO"
          productName="Panthetoin Deep Moisture Mask"
          timeInfo="09h 16m 30s"
          progressPercentage={70}
          participationText="70/100 partcipation"
          buttonText="Đăng ký dùng thử"
          onButtonClick={() => {
            // Xử lý logic khi click button
            console.log('Đăng ký dùng thử clicked')
          }}
        />
        <ReviewCard
          reviewerImage={IMAGES.reviewer1}
          reviewerAlt="reviewer"
          productImage={IMAGES.product1}
          productAlt="product"
          brandName="MANYO"
          productName="Panthetoin Deep Moisture Mask"
          timeInfo="09h 16m 30s"
          progressPercentage={70}
          participationText="70/100 partcipation"
          buttonText="Đăng ký dùng thử"
          onButtonClick={() => {
            // Xử lý logic khi click button
            console.log('Đăng ký dùng thử clicked')
          }}
        />
        <ReviewCard
          reviewerImage={IMAGES.reviewer1}
          reviewerAlt="reviewer"
          productImage={IMAGES.product1}
          productAlt="product"
          brandName="MANYO"
          productName="Panthetoin Deep Moisture Mask"
          timeInfo="09h 16m 30s"
          progressPercentage={70}
          participationText="70/100 partcipation"
          buttonText="Đăng ký dùng thử"
          onButtonClick={() => {
            // Xử lý logic khi click button
            console.log('Đăng ký dùng thử clicked')
          }}
        />
        <ReviewCard
          reviewerImage={IMAGES.reviewer1}
          reviewerAlt="reviewer"
          productImage={IMAGES.product1}
          productAlt="product"
          brandName="MANYO"
          productName="Panthetoin Deep Moisture Mask"
          timeInfo="09h 16m 30s"
          progressPercentage={70}
          participationText="70/100 partcipation"
          buttonText="Đăng ký dùng thử"
          onButtonClick={() => {
            // Xử lý logic khi click button
            console.log('Đăng ký dùng thử clicked')
          }}
        />
        <ReviewCard
          reviewerImage={IMAGES.reviewer1}
          reviewerAlt="reviewer"
          productImage={IMAGES.product1}
          productAlt="product"
          brandName="MANYO"
          productName="Panthetoin Deep Moisture Mask"
          timeInfo="09h 16m 30s"
          progressPercentage={70}
          participationText="70/100 partcipation"
          buttonText="Đăng ký dùng thử"
          onButtonClick={() => {
            // Xử lý logic khi click button
            console.log('Đăng ký dùng thử clicked')
          }}
        />
      </div>
      <Button>Xem tất cả</Button>
    </div>
  )
}

export default Reviewer
