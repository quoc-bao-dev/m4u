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
  // True infinite scroll setup: dynamically grow head/tail blocks
  const baseBlockIndex = 1 // start centered
  const [headBlocks, setHeadBlocks] = useState(1)
  const [tailBlocks, setTailBlocks] = useState(1)
  const extendedItems = useMemo(() => {
    const totalBlocks = headBlocks + 1 + tailBlocks
    return Array.from({ length: totalBlocks }).flatMap(() => items)
  }, [items, headBlocks, tailBlocks])
  const [activeIndex, setActiveIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const scrollEndTimerRef = useRef<NodeJS.Timeout | null>(null)
  const blockWidthRef = useRef<number>(0)
  const pendingPrependAdjustRef = useRef<number | null>(null)
  const hasMeasuredRef = useRef<boolean>(false)
  const [isReady, setIsReady] = useState(false)

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

  // Prepare initial active index; actual scrolling waits until measurement is ready
  useEffect(() => {
    const startIndex = items.length * headBlocks
    setActiveIndex(startIndex)
  }, [items.length, headBlocks])

  // Measure block width after layout
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const children = Array.from(el.children) as HTMLElement[]
    if (children.length === 0) return
    const start = headBlocks * blockSize
    const end = start + blockSize - 1
    const first = children[start] as HTMLElement | undefined
    const last = children[end] as HTMLElement | undefined
    if (first && last) {
      const width = last.offsetLeft + last.clientWidth - first.offsetLeft
      blockWidthRef.current = width
      if (!hasMeasuredRef.current && width > 0) {
        hasMeasuredRef.current = true
        // After first stable measure, position to the middle without smooth behavior
        const startIndex = items.length * headBlocks
        el.scrollTo({
          left: getScrollLeftForIndex(startIndex),
          behavior: 'auto',
        })
        // Allow interactions and snapping after next frame to avoid thrash with image layout
        requestAnimationFrame(() => setIsReady(true))
      }
    }
  }, [extendedItems.length, headBlocks, blockSize])

  // Update active index based on scroll position
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const handleScroll = () => {
      if (!isReady) return
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

      // Infinite grow: append/prepend blocks near edges
      const blockSize = items.length
      const blockWidth = blockWidthRef.current
      const totalScrollable = el.scrollWidth - el.clientWidth
      const nearEnd = scrollLeft > totalScrollable - blockWidth * 0.75
      const nearStart = scrollLeft < blockWidth * 0.75

      if (nearEnd) {
        setTailBlocks((v) => v + 1)
      } else if (nearStart) {
        // We will prepend and then adjust scrollLeft by +blockWidth on next frame
        pendingPrependAdjustRef.current = el.scrollLeft + blockWidth
        setHeadBlocks((v) => v + 1)
      }

      // Snap to nearest after user stops scrolling (debounced)
      if (scrollEndTimerRef.current) clearTimeout(scrollEndTimerRef.current)
      scrollEndTimerRef.current = setTimeout(() => {
        scrollToIndex(closestIndex, 'smooth')
      }, 90)
    }

    el.addEventListener('scroll', handleScroll)
    return () => el.removeEventListener('scroll', handleScroll)
  }, [activeIndex, items.length, isReady])

  // After prepending, compensate scrollLeft so position is preserved
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    if (pendingPrependAdjustRef.current != null) {
      el.scrollTo({ left: pendingPrependAdjustRef.current, behavior: 'auto' })
      pendingPrependAdjustRef.current = null
    }
  }, [headBlocks])

  return (
    <div className="relative w-full">
      <div
        ref={scrollRef}
        className="flex items-center justify-start cursor-default select-none gap-4 md:gap-6 md:h-[600px] h-[550px] overflow-x-auto px-4"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          scrollBehavior: 'auto',
          WebkitOverflowScrolling: 'touch',
        }}
        role="listbox"
        aria-label="Review carousel"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') {
            e.preventDefault()
            if (isReady) scrollToIndex(activeIndex + 1)
          } else if (e.key === 'ArrowLeft') {
            e.preventDefault()
            if (isReady) scrollToIndex(activeIndex - 1)
          }
        }}
      >
        {extendedItems.map((item, idx) => (
          <div
            key={`cta-review-${idx}`}
            className={`flex-shrink-0 transition-all duration-500 ease-in-out ${
              activeIndex === idx
                ? 'transform scale-110 md:scale-110 z-10 opacity-100'
                : 'transform scale-90 md:scale-95 opacity-80'
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
                isReady &&
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
