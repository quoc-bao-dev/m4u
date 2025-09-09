'use client'
import React, { useEffect, useRef, useState } from 'react'
import ReviewCard from './ReviewCard'

type ReviewItem = {
  reviewerImage: string
  reviewerAlt?: string
  reviewerVideo?: string
  productImage: string
  productAlt?: string
  brandName: string
  productName: string
  timeInfo: string
  progressPercentage: number
  participationText: string
  buttonText: string
}

interface ReviewCTACarouselProps {
  items: ReviewItem[]
}

const ReviewCTACarousel: React.FC<ReviewCTACarouselProps> = ({ items }) => {
  // Set middle card as active by default
  const [activeIndex, setActiveIndex] = useState(Math.floor(items.length / 2))
  const scrollRef = useRef<HTMLDivElement | null>(null)

  const getScrollLeftForIndex = (index: number) => {
    const el = scrollRef.current
    if (!el) return 0
    const children = Array.from(el.children) as HTMLElement[]
    const target = children[index]
    if (!target) return el.scrollLeft

    const containerCenter = el.clientWidth / 2
    const targetCenter = target.offsetLeft + target.clientWidth / 2
    const scrollLeft = targetCenter - containerCenter

    return scrollLeft
  }

  const scrollToIndex = (index: number) => {
    const el = scrollRef.current
    if (!el) return
    const clamped = Math.max(0, Math.min(items.length - 1, index))

    // Smooth scroll with easing
    el.scrollTo({
      left: getScrollLeftForIndex(clamped),
      behavior: 'smooth',
    })
    setActiveIndex(clamped)
  }

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    // Initialize with middle card active
    const middleIndex = Math.floor(items.length / 2)
    el.scrollLeft = getScrollLeftForIndex(middleIndex)
  }, [items.length])

  // Update active index based on scroll position
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const handleScroll = () => {
      const children = Array.from(el.children) as HTMLElement[]
      const containerCenter = el.clientWidth / 2
      const scrollLeft = el.scrollLeft

      let closestIndex = 0
      let minDistance = Infinity

      children.forEach((child, index) => {
        const childCenter = child.offsetLeft + child.clientWidth / 2
        const distance = Math.abs(childCenter - (scrollLeft + containerCenter))

        if (distance < minDistance) {
          minDistance = distance
          closestIndex = index
        }
      })

      if (closestIndex !== activeIndex) {
        setActiveIndex(closestIndex)
      }
    }

    el.addEventListener('scroll', handleScroll)
    return () => el.removeEventListener('scroll', handleScroll)
  }, [activeIndex])

  return (
    <div className="relative w-full overflow-hidden">
      <div
        ref={scrollRef}
        className="flex items-center justify-center cursor-default select-none gap-4 md:gap-6 scroll-smooth"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {items.map((item, idx) => (
          <div
            key={`cta-review-${idx}`}
            className={`flex-shrink-0 transition-all duration-500 ease-in-out ${
              activeIndex === idx
                ? 'transform scale-110 md:scale-105 z-10'
                : 'transform scale-90 md:scale-100'
            }`}
          >
            <ReviewCard
              reviewerImage={item.reviewerImage}
              reviewerVideo={item.reviewerVideo}
              reviewerAlt={item.reviewerAlt}
              productImage={item.productImage}
              productAlt={item.productAlt}
              brandName={item.brandName}
              productName={item.productName}
              timeInfo={item.timeInfo}
              progressPercentage={item.progressPercentage}
              participationText={item.participationText}
              buttonText={item.buttonText}
              isActive={activeIndex === idx}
              onButtonClick={() => {
                // eslint-disable-next-line no-console
                console.log('Đăng ký dùng thử clicked')
              }}
              className="cursor-pointer select-none"
              onClick={() => scrollToIndex(idx)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ReviewCTACarousel
