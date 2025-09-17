'use client'

import Image from 'next/image'
import React from 'react'

type ReviewItem = {
  id: string
  brand: string
  productName: string
  productImage: string
  rating: number
  reviewTitle: string
  reviewExcerpt: string
  reward: string
  date: string
  time: string
  status: 'reward_paid' | 'accepted' | 'rejected' | 'in_review'
}

const MOCK_REVIEWS: ReviewItem[] = [
  {
    id: '1',
    brand: 'MANYO',
    productName: 'Panthenoin Deep Moisture Mask',
    productImage: '/image/product/image-01.png',
    rating: 5,
    reviewTitle: 'Excellent',
    reviewExcerpt:
      'Such a pleasant surprise! I got to try premium products for free and even picked...',
    reward: '50% discount coupon',
    date: '16 Sep 2025',
    time: '04:20 PM',
    status: 'reward_paid',
  },
  {
    id: '2',
    brand: 'MANYO',
    productName: 'Panthenoin Deep Moisture Mask',
    productImage: '/image/event/image-02.png',
    rating: 5,
    reviewTitle: 'Excellent',
    reviewExcerpt:
      'Such a pleasant surprise! I got to try premium products for free and even picked...',
    reward: '69,000 đ',
    date: '16 Sep 2025',
    time: '04:20 PM',
    status: 'accepted',
  },
  {
    id: '3',
    brand: 'MANYO',
    productName: 'Panthenoin Deep Moisture Mask',
    productImage: '/image/event/image-01.png',
    rating: 5,
    reviewTitle: 'Excellent',
    reviewExcerpt:
      'Such a pleasant surprise! I got to try premium products for free and even picked...',
    reward: 'Buy 1 get 1 coupon',
    date: '16 Sep 2025',
    time: '04:20 PM',
    status: 'rejected',
  },
  {
    id: '4',
    brand: 'MANYO',
    productName: 'Panthenoin Deep Moisture Mask',
    productImage: '/image/event/image-03.png',
    rating: 5,
    reviewTitle: 'Excellent',
    reviewExcerpt:
      'Such a pleasant surprise! I got to try premium products for free and even picked...',
    reward: '50% discount coupon',
    date: '16 Sep 2025',
    time: '04:20 PM',
    status: 'in_review',
  },
]

const statusChip = (status: ReviewItem['status']) => {
  switch (status) {
    case 'reward_paid':
      return (
        <span className="inline-flex items-center gap-2 text-xs text-greyscale-600">
          <span className="size-1.5 rounded-full bg-green-500" /> Reward paid
        </span>
      )
    case 'accepted':
      return (
        <span className="inline-flex items-center gap-2 text-xs text-greyscale-600">
          <span className="size-1.5 rounded-full bg-blue-500" /> Accepted
        </span>
      )
    case 'rejected':
      return (
        <span className="inline-flex items-center gap-2 text-xs text-greyscale-600">
          <span className="size-1.5 rounded-full bg-red-500" /> Rejected
        </span>
      )
    case 'in_review':
      return (
        <span className="inline-flex items-center gap-2 text-xs text-greyscale-600">
          <span className="size-1.5 rounded-full bg-indigo-500" /> In review
        </span>
      )
  }
}

const MyReviewsTable = () => {
  return (
    <div className="mt-6  overflow-hidden ">
      {/* Table header */}
      <div className="hidden md:grid grid-cols-12 items-center bg-greyscale-50 ptext-xs font-medium text-greyscale-500">
        <div className="col-span-5">Product info</div>
        <div className="col-span-3">Review</div>
        <div className="col-span-2">Reward</div>
        <div className="col-span-1">Date time</div>
        <div className="col-span-1">Status</div>
      </div>

      {/* Rows placeholder - easy to swap later */}
      <div>
        {MOCK_REVIEWS.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-12 gap-4 px-6 py-5 border-t border-greyscale-100 first:border-t-0"
          >
            {/* Product info */}
            <div className="col-span-12 md:col-span-5 flex items-start gap-3">
              <div className="size-14 rounded-lg overflow-hidden bg-greyscale-100 border border-greyscale-200 flex-shrink-0">
                <Image
                  src={item.productImage}
                  alt={item.productName}
                  width={56}
                  height={56}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <div className="text-xs text-greyscale-500">{item.brand}</div>
                <div className="text-sm font-medium text-greyscale-900 truncate">
                  {item.productName}
                </div>
              </div>
            </div>

            {/* Review */}
            <div className="col-span-12 md:col-span-3">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <span
                    key={idx}
                    className={`inline-block size-3 rounded-full ${
                      idx < item.rating ? 'bg-yellow-400' : 'bg-greyscale-200'
                    }`}
                  />
                ))}
                <span className="ml-2 text-xs text-greyscale-600">
                  {item.reviewTitle}
                </span>
              </div>
              <div className="text-sm text-greyscale-600 mt-1 line-clamp-2">
                {item.reviewExcerpt}
              </div>
            </div>

            {/* Reward */}
            <div className="col-span-6 md:col-span-2 text-sm text-greyscale-900">
              {item.reward}
            </div>

            {/* Date */}
            <div className="col-span-3 md:col-span-1 text-sm text-greyscale-900">
              <div>{item.date}</div>
              <div className="text-[11px] text-greyscale-400">{item.time}</div>
            </div>

            {/* Status */}
            <div className="col-span-3 md:col-span-1 flex items-center">
              {statusChip(item.status)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyReviewsTable
