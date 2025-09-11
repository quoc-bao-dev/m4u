'use client'
import Rating from '@/core/components/common/Rating'
import { IMAGES } from '@/core/constants/IMAGES'
import { useInView } from '@/core/hooks/useInView'
import { useDevice } from '@/core/hooks'
import { PlayIcon, PauseIcon, StarIcon } from '@phosphor-icons/react'
import Image from 'next/image'
import { Ref, useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Loading } from '@/core/components/common/loading'

interface Kol {
  name: string
  image: string
  rating: number
  reviews: number
}

interface TopReviewerCardProps {
  productName?: string
  brandName?: string
  rating?: number
  reviewCount?: number
  productImage?: string
  kols?: Kol[]
  className?: string
  topReview?: number
  isRightColumn?: boolean
}

const TopReviewerCard = ({
  productName = 'Panthetoin Deep Moisture Mask',
  brandName = 'MANYO',
  rating = 4.0,
  reviewCount = 69,
  productImage = IMAGES.topProduct,
  kols = [],
  className = '',
  topReview = 1,
  isRightColumn = false,
}: TopReviewerCardProps) => {
  const { isMobile, isTablet } = useDevice()
  // Left column should start earlier; right column should start a bit later
  const { ref: cardRef, isInView } = useInView<HTMLDivElement>({
    threshold: 0.3,
    rootMargin: isRightColumn ? '-10% 0px -40% 0px' : '-20% 0px -30% 0px',
  })
  const scrollContainerRef = useRef<HTMLDivElement | null>(null)
  const isDraggingRef = useRef<boolean>(false)
  const dragStartXRef = useRef<number>(0)
  const scrollStartLeftRef = useRef<number>(0)
  const [isDraggingState, setIsDraggingState] = useState<boolean>(false)
  const videoRefs = useRef<HTMLVideoElement[]>([])
  const [playingIndex, setPlayingIndex] = useState<number | null>(null)

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollContainerRef.current) return
    isDraggingRef.current = true
    setIsDraggingState(true)
    dragStartXRef.current = e.clientX
    scrollStartLeftRef.current = scrollContainerRef.current.scrollLeft
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || !scrollContainerRef.current) return
    const dx = e.clientX - dragStartXRef.current
    scrollContainerRef.current.scrollLeft = scrollStartLeftRef.current - dx
  }, [])

  const endDrag = useCallback(() => {
    if (!isDraggingRef.current) return
    isDraggingRef.current = false
    setIsDraggingState(false)
  }, [])

  // Video controls (similar to TopReviewer)
  const handlePlayVideo = useCallback(
    (index: number) => {
      const target = videoRefs.current[index]
      if (!target) return

      // Toggle pause if clicking the currently playing video
      if (!target.paused && playingIndex === index) {
        try {
          target.pause()
          setPlayingIndex(null)
        } catch {}
        return
      }

      // Pause others
      videoRefs.current.forEach((video, i) => {
        if (video && i !== index) {
          try {
            video.pause()
          } catch {}
        }
      })

      try {
        target.play()
        setPlayingIndex(index)
      } catch {}
    },
    [playingIndex]
  )

  // Hover play/pause per video tile
  const handleHoverStart = useCallback((index: number) => {
    if (isDraggingRef.current) return
    const target = videoRefs.current[index]
    if (!target) return
    // Pause others
    videoRefs.current.forEach((video, i) => {
      if (video && i !== index) {
        try {
          video.pause()
        } catch {}
      }
    })
    try {
      target.play()
      setPlayingIndex(index)
    } catch {}
  }, [])

  const handleHoverEnd = useCallback((index: number) => {
    const target = videoRefs.current[index]
    if (!target) return
    try {
      target.pause()
    } catch {}
    setPlayingIndex((curr) => (curr === index ? null : curr))
  }, [])

  // Autoplay/pause based on viewport visibility
  useEffect(() => {
    if (!kols || kols.length === 0) return
    const firstVideoIndex = 0
    const first = videoRefs.current[firstVideoIndex]
    if (!first) return

    if (isInView) {
      // Pause others just in case
      videoRefs.current.forEach((video, i) => {
        if (video && i !== firstVideoIndex) {
          try {
            video.pause()
          } catch {}
        }
      })
      try {
        first.play()
        setPlayingIndex(firstVideoIndex)
      } catch {}
    } else {
      // Pause all when out of view
      videoRefs.current.forEach((video) => {
        if (video) {
          try {
            video.pause()
          } catch {}
        }
      })
      setPlayingIndex(null)
    }
  }, [kols, isInView])
  const [isLoading, setIsLoading] = useState(true)

  setTimeout(() => {
    setIsLoading(false)
  }, 3000)

  return (
    <Link
      ref={cardRef as Ref<HTMLAnchorElement>}
      href="/vi/review-hub/detail"
      className={`p-0 py-0 border border-greyscale-200 rounded-3xl relative flex gap-3 xl:gap-6 w-full  border-b overflow-hidden  ${className} group cursor-pointer transition-all duration-300 will-change-transform hover:shadow-[0px_8px_24px_0px_#00000014] hover:border-greyscale-300`}
    >
      {isLoading ? (
        <Loading className="flex-shrink-0 hidden xl:block lg:size-[160px] xl:size-[250px] 2xl:size-[300px] object-cover rounded-3xl" />
      ) : (
        <Image
          src={productImage}
          alt="top-reviewer"
          width={1000}
          height={1000}
          className="hidden xl:block lg:size-[160px] xl:size-[250px] 2xl:size-[300px] object-cover rounded-3xl"
        />
      )}
      <div className="py-2 px-2 xl:px-0 flex flex-col justify-center gap-3 2xl:gap-5 w-full min-w-0 z-10">
        <div className="flex gap-3 lg:gap-2 justify-between items-end">
          <div className="flex flex-col xl:flex-row gap-2">
            {topReview && topReview > 0 && topReview <= 3 ? (
              <span className="text-[40px]/[100%] xl:text-[48px]/[110%] 2xl:text-[64px]/[110%] font-semibold">
                {topReview === 1 && '🥇'}
                {topReview === 2 && '🥈'}
                {topReview === 3 && '🥉'}
              </span>
            ) : (
              <span className="rounded-full size-8 lg:size-12 flex-shrink-0 aspect-square flex items-center justify-center p-2.5 bg-pink-100 text-base lg:text-[32px] font-semibold text-greyscale-900">
                {' '}
                {topReview}{' '}
              </span>
            )}
            <div className="flex flex-col gap-2 2xl:gap-3">
              <h3 className="text-[10px] lg:text-sm 2xl:text-base font-bold text-greyscale-900 transition-colors duration-300 group-hover:text-yellow-600">
                {brandName}
              </h3>
              <p className="text-sm lg:text-base xl:text-xl 2xl:text-2xl leading-[100%] text-greyscale-900 transition-colors duration-300 group-hover:text-yellow-600">
                {productName}
              </p>
              <div className="flex items-center gap-3 pt-0 xl:pt-1 2xl:pt-2">
                <Rating
                  value={Number(rating)}
                  readOnly
                  maxWidth={isMobile ? 96 : isTablet ? 116 : 136}
                />
                <p className="text-sm lg:text-base xl:text-lg 2xl:text-xl xl:leading-[80%] text-greyscale-500">
                  <span className="text-greyscale-900 font-medium">
                    {rating}{' '}
                  </span>
                  ({reviewCount} reviews)
                </p>
              </div>
            </div>
          </div>
          <Image
            src={productImage}
            alt="top-reviewer"
            width={1000}
            height={1000}
            className="xl:hidden size-[120px] lg:size-[160px] object-cover rounded-xl"
          />
        </div>

        <div className="relative">
          <div className="absolute z-[2] top-0 right-0 w-10 h-full bg-gradient-to-l from-white to-transparent"></div>
          <div
            ref={scrollContainerRef}
            className={`flex gap-2 2xl:gap-3 overflow-x-scroll scroll-hidden flex-1 min-w-0 ${
              isDraggingState ? 'cursor-grabbing' : 'cursor-grab'
            }`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={endDrag}
            onMouseLeave={endDrag}
          >
            {kols.map((kol, index) => (
              <div
                className="group relative cursor-pointer"
                key={index}
                onClick={() => handlePlayVideo(index)}
                onMouseEnter={() => handleHoverStart(index)}
                // onMouseLeave={() => handleHoverEnd(index)}
              >
                <div className="absolute top-1 right-1 flex items-center gap-0.5 bg-white rounded-full py-0.5 px-1">
                  <StarIcon
                    weight="fill"
                    className="2xl:size-4 size-3 text-yellow-600"
                  />
                  <span className="text-[10px] lg:text-xs 2xl:text-sm leading-[100%] font-medium text-greyscale-900">
                    {kol.rating}
                  </span>
                </div>
                <div className="opacity-0 hover:opacity-100 transition-all duration-300 absolute inset-0 flex items-center justify-center bg-black/20 rounded-xl">
                  {playingIndex === index ? (
                    <PauseIcon
                      weight="fill"
                      className="size-8 2xl:size-10 text-white"
                    />
                  ) : (
                    <PlayIcon
                      weight="fill"
                      className="size-8 2xl:size-10 text-white"
                    />
                  )}
                </div>
                <video
                  ref={(el) => {
                    if (el) videoRefs.current[index] = el
                  }}
                  src={kol.image}
                  autoPlay={false}
                  muted
                  loop
                  playsInline
                  width={1000}
                  height={1000}
                  className="size-[100px] 2xl:size-[140px] min-w-[100px] 2xl:min-w-[140px] object-cover rounded-xl flex-shrink-0 bg-[#DCE5E5]"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default TopReviewerCard
