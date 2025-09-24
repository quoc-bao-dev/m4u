'use client'

import { motion } from 'framer-motion'
import { useCallback, useEffect, useMemo, useState, memo } from 'react'
import ReviewerAvatar from './ReviewerAvatar'
import { useGetViewReviewer } from '@/services/home/queries'

// Local animation config for this component
// const LOCAL_ANIMATION = {
//   fadeDuration: 0.9,
//   opacity: 0.2,
//   translateX: -10,
//   intervalMs: 5000,
//   ease: 'linear' as const,
// }

const LOCAL_ANIMATION = {
  fadeDuration: 0.9,
  opacity: 0.8,
  translateX: 0,
  intervalMs: 5000,
  ease: 'easeInOut' as const,
} as const

type ReviewerCarouselProps = {
  fadeDuration?: number
  intervalMs?: number
  ease?: 'linear' | 'easeIn' | 'easeOut' | 'easeInOut'
  opacity?: number
  translateX?: number
  appearFromX?: number
}

// Memoized component for individual reviewer
const MemoizedReviewerAvatar = memo(
  ({
    reviewer,
    index,
    offset,
    isFading,
    isEntering,
    fadeDuration,
    ease,
    opacity,
    translateX,
    resolvedAppearFromX,
    className,
    imageClassName,
    labelPosition,
  }: {
    reviewer: any
    index: number
    offset: number
    isFading: boolean
    isEntering: boolean
    fadeDuration: number
    ease: 'linear' | 'easeIn' | 'easeOut' | 'easeInOut'
    opacity: number
    translateX: number
    resolvedAppearFromX: number
    className: string
    imageClassName: string
    labelPosition: 'top' | 'bottom'
  }) => {
    // Kiểm tra an toàn cho reviewer data
    const reviewerList = Array.isArray(reviewer) ? reviewer : []
    const reviewerLength = reviewerList.length || 0
    if (reviewerLength === 0) return null
    const displayReviewer = reviewerList[(index + offset) % reviewerLength]

    return (
      <motion.div
        initial={{ opacity: 1, x: 0 }}
        animate={
          isFading
            ? { opacity: [1, opacity], x: [0, translateX] }
            : isEntering
              ? { opacity: [opacity, 1], x: [resolvedAppearFromX, 0] }
              : { opacity: 1, x: 0 }
        }
        transition={
          isFading || isEntering
            ? { duration: fadeDuration, ease }
            : { opacity: { duration: 0 }, x: { duration: 0 } }
        }
        className={className}
      >
        <ReviewerAvatar
          className=""
          imageClassName={imageClassName}
          src={displayReviewer.avatar || displayReviewer.src}
          name={displayReviewer.fullname || displayReviewer.name}
          jobTitle={displayReviewer.count_review || displayReviewer.jobTitle || 0}
          labelPosition={labelPosition}
        />
      </motion.div>
    )
  }
)

MemoizedReviewerAvatar.displayName = 'MemoizedReviewerAvatar'

// Configuration for reviewer positions and styles
const REVIEWER_CONFIGS = [
  {
    className:
      'absolute left-[-5.4%] top-[7.87%] md:left-[3.1%] md:top-[10.87%] lg:left-[5%] lg:top-[12.87%] xl:left-[6%] xl:top-[14.87%] 2xl:left-[8%] 2xl:top-[14.87%]',
    imageClassName:
      'md:size-[80px] lg:size-[110px] size-[40px] xl:size-[120px] border xl:border-2',
    labelPosition: 'bottom' as const,
  },
  {
    className:
      'absolute left-[12.1%] top-[-6.87%] md:left-[16.7%] md:top-[18.87%] lg:left-[18.7%] lg:top-[18.87%] xl:left-[18.5%] xl:top-[18.87%] 2xl:left-[19.5%] 2xl:top-[26.87%]',
    imageClassName:
      'size-[45px] md:size-[95px] lg:size-[125px] xl:size-[165px] 2xl:size-[185px] border xl:border-4',
    labelPosition: 'top' as const,
  },
  {
    className:
      'absolute left-[28.9%] top-[1.05%] md:left-[30.9%] md:top-[6.05%] lg:left-[32.7%] lg:top-[8.05%] xl:left-[32.8%] xl:top-[9.05%] 2xl:left-[33%] 2xl:top-[9.05%]',
    imageClassName:
      'size-[38px] md:size-[75px] lg:size-[100px] xl:size-[120px] 2xl:size-[147px] border xl:border-2',
    labelPosition: 'bottom' as const,
  },
  {
    className:
      'absolute top-[-16%] left-[44%] md:left-[44.2%] md:top-[2.94%] lg:left-[45%] lg:top-[4.94%] xl:left-[44.9%] xl:top-[6.94%] 2xl:left-[45%] 2xl:top-[11.94%]',
    imageClassName:
      'md:size-[85px] lg:size-[110px] xl:size-[135px] size-[40px] 2xl:size-[165px] border xl:border-2',
    labelPosition: 'top' as const,
  },
  {
    className:
      'absolute left-[61.4%] top-[3.0%] md:left-[59.5%] md:top-[8.0%] lg:left-[58.7%] lg:top-[9.0%] xl:left-[59.2%] xl:top-[11.0%] 2xl:left-[59%] 2xl:top-[12.10%]',
    imageClassName:
      'md:size-[90px] lg:size-[130px] xl:size-[140px] size-[40px] 2xl:size-[165px] border xl:border-2',
    labelPosition: 'bottom' as const,
  },
  {
    className:
      'absolute left-[76.8%] top-[11.08%] md:left-[73.5%] md:top-[34.08%] lg:left-[72.8%] lg:top-[31.08%] xl:left-[72.4%] xl:top-[33.08%] 2xl:left-[72.2%] 2xl:top-[38.08%]',
    imageClassName:
      'md:size-[75px] lg:size-[100px] size-[40px] 2xl:size-[140px] xl:size-[120px] border xl:border-4',
    labelPosition: 'top' as const,
  },
  {
    className:
      'absolute right-[-3.9%] md:right-auto top-[8.1%] md:left-[84.2%] md:top-[9.1%] lg:left-[83.5%] lg:top-[13.1%] xl:left-[83%] xl:top-[13.1%] 2xl:left-[82.5%] 2xl:top-[14.1%]',
    imageClassName:
      'size-[40px] md:size-[87px] lg:size-[113px] 2xl:size-[163px] xl:size-[133px] border xl:border-2',
    labelPosition: 'bottom' as const,
  },
] as const

const ReviewerCarousel = memo(
  ({
    fadeDuration = LOCAL_ANIMATION.fadeDuration,
    intervalMs = LOCAL_ANIMATION.intervalMs,
    ease = LOCAL_ANIMATION.ease,
    opacity = LOCAL_ANIMATION.opacity,
    translateX = LOCAL_ANIMATION.translateX,
    appearFromX,
  }: ReviewerCarouselProps) => {
    const [offset, setOffset] = useState(0)
    const [isFading, setIsFading] = useState(false)
    const [isEntering, setIsEntering] = useState(false)

    // Memoize resolved appear position
    const resolvedAppearFromX = useMemo(
      () => (typeof appearFromX === 'number' ? appearFromX : -translateX),
      [appearFromX, translateX]
    )

    // Optimized animation handler
    const handleAnimationCycle = useCallback(() => {
      setIsFading(true)

      setTimeout(() => {
        setOffset((prev) => prev + 1)
        setIsFading(false)
        setIsEntering(true)

        setTimeout(() => {
          setIsEntering(false)
        }, fadeDuration * 1000)
      }, fadeDuration * 1000)
    }, [fadeDuration])

    // Gọi API và xác định hasData ngay tại component scope
    const { data: viewReviewer, isLoading } = useGetViewReviewer({
      per_page: 10,
      current_page: 1,
    })
    const hasData = Array.isArray(viewReviewer) && viewReviewer.length > 0

    useEffect(() => {
      if (!hasData) return
      const intervalId = setInterval(handleAnimationCycle, intervalMs)
      return () => clearInterval(intervalId)
    }, [handleAnimationCycle, intervalMs, hasData])

    if(!isLoading && !hasData) return null

    return (
      <div
        className="py-3 relative"
        role="region"
        aria-label="Reviewer carousel"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/image/reviewer-carousel/carousel.gif"
          className="h-full w-auto object-cover absolute top-0 left-0"
          alt="Animated background showing reviewer testimonials"
          loading="lazy"
        />

        <div className="relative whitespace-nowrap mx-auto aspect-[16/4] bg-red-100/0 w-[300px] md:w-[700px] lg:w-[1000px] xl:w-[1200px] 2xl:w-[1500px] h-full flex items-center justify-center">
          {!hasData
            ? REVIEWER_CONFIGS.map((config, index) => (
                <div key={`sk-${index}`} className={config.className}>
                  <div className="flex flex-col items-center gap-2">
                    {config.labelPosition === 'top' && (
                      <div className="w-16 md:w-24 h-3 md:h-4 bg-greyscale-200 rounded animate-pulse" />
                    )}
                    <div className={`rounded-full bg-greyscale-200 animate-pulse ${config.imageClassName}`} />
                    {config.labelPosition === 'bottom' && (
                      <div className="w-20 md:w-28 h-3 md:h-4 bg-greyscale-200 rounded animate-pulse" />
                    )}
                  </div>
                </div>
              ))
            : REVIEWER_CONFIGS.map((config, index) => (
                <MemoizedReviewerAvatar
                  key={`reviewer-${index}`}
                  reviewer={viewReviewer}
                  index={index}
                  offset={offset}
                  isFading={isFading}
                  isEntering={isEntering}
                  fadeDuration={fadeDuration}
                  ease={ease}
                  opacity={opacity}
                  translateX={translateX}
                  resolvedAppearFromX={resolvedAppearFromX}
                  className={config.className}
                  imageClassName={config.imageClassName}
                  labelPosition={config.labelPosition}
                />
              ))}
        </div>
      </div>
    )
  }
)

ReviewerCarousel.displayName = 'ReviewerCarousel'

export default ReviewerCarousel
