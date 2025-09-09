'use client'
import React, { useEffect, useMemo, useRef, useState } from 'react'
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
  // Infinite loop setup
  const loopCount = 3
  const baseBlockIndex = 1 // middle block
  const extendedItems = useMemo(
    () => Array.from({ length: loopCount }).flatMap(() => items),
    [items]
  )
  const [activeIndex, setActiveIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement | null>(null)

  const blockSize = items.length
  const getMiddleIndexForLogical = (logicalIndex: number) =>
    blockSize * baseBlockIndex + (logicalIndex % blockSize)

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

  const scrollToIndex = (
    index: number,
    behavior: ScrollBehavior = 'smooth'
  ) => {
    const el = scrollRef.current
    if (!el) return
    const clamped = Math.max(0, Math.min(extendedItems.length - 1, index))
    el.scrollTo({ left: getScrollLeftForIndex(clamped), behavior })
    setActiveIndex(clamped)
  }

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    // Initialize to the middle block for seamless looping
    const startIndex = items.length * baseBlockIndex
    setActiveIndex(startIndex)
    el.scrollLeft = getScrollLeftForIndex(startIndex)
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

      // Seamless loop repositioning to keep the scroll within the middle block
      const blockSize = items.length
      if (closestIndex < blockSize) {
        const target = closestIndex + blockSize
        scrollToIndex(target, 'auto')
      } else if (closestIndex >= blockSize * 2) {
        const target = closestIndex - blockSize
        scrollToIndex(target, 'auto')
      }
    }

    el.addEventListener('scroll', handleScroll)
    return () => el.removeEventListener('scroll', handleScroll)
  }, [activeIndex])

  return (
    <div className="relative w-full">
      <div
        ref={scrollRef}
        className="flex items-center justify-start cursor-default select-none gap-4 md:gap-6 scroll-smooth md:h-[600px] h-[550px] overflow-x-auto px-4"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {extendedItems.map((item, idx) => (
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
              onClick={() =>
                scrollToIndex(getMiddleIndexForLogical(idx % blockSize))
              }
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ReviewCTACarousel
