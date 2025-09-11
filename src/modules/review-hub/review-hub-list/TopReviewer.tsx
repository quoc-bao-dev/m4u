'use client'
import { Loading } from '@/core/components/common/loading'
import Rating from '@/core/components/common/Rating'
import { IMAGES } from '@/core/constants/IMAGES'
import { useDevice } from '@/core/hooks'
import { MedalIcon, PlayIcon, PauseIcon, StarIcon } from '@phosphor-icons/react'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'

const kols = [
  {
    name: 'MANYO',
    image:
      'https://cdn2.videowise.com/converted/videos/1747066892278_wid_NjgyMjIwMGMzZjJiOTAwMDU4OGMxZTNm_h264cmobile.mp4',
    rating: 4.9,
    reviews: 69,
  },
  {
    name: 'MANYO',
    image:
      'https://cdn2.videowise.com/custom-videos/videos/1747066892926_wid_NjgyMjIwMGMzZjJiOTAwMDU4OGMxZWE4.mp4',
    rating: 4.9,
    reviews: 69,
  },
  {
    name: 'MANYO',
    image:
      'https://cdn2.videowise.com/custom-videos/videos/1747066889667_wid_NjgyMjIwMDkzZjJiOTAwMDU4OGMxYzJi.mp4',
    rating: 4.9,
    reviews: 69,
  },
  {
    name: 'MANYO',
    image:
      'https://cdn2.videowise.com/custom-videos/videos/1747067655414_wid_NjgyMjIzMDczZjJiOTAwMDU4OGQ5ODRk.mp4',
    rating: 4.9,
    reviews: 69,
  },
  {
    name: 'MANYO',
    image:
      'https://cdn2.videowise.com/custom-videos/videos/1747067655414_wid_NjgyMjIzMDczZjJiOTAwMDU4OGQ5ODRk.mp4',
    rating: 4.9,
    reviews: 69,
  },
  {
    name: 'MANYO',
    image:
      'https://cdn2.videowise.com/converted/videos/1747066892278_wid_NjgyMjIwMGMzZjJiOTAwMDU4OGMxZTNm_h264cmobile.mp4',
    rating: 4.9,
    reviews: 69,
  },
]

const TopReviewer = () => {
  const { isMobile } = useDevice()
  const videoRefs = useRef<HTMLVideoElement[]>([])
  const [playingIndex, setPlayingIndex] = useState<number | null>(null)
  const scrollContainerRef = useRef<HTMLDivElement | null>(null)
  const isDraggingRef = useRef<boolean>(false)
  const dragStartXRef = useRef<number>(0)
  const scrollStartLeftRef = useRef<number>(0)
  const [isDraggingState, setIsDraggingState] = useState<boolean>(false)

  const handlePlayVideo = useCallback(
    (index: number) => {
      const target = videoRefs.current[index]
      if (!target) return

      // If clicking the currently playing video, pause (toggle off)
      if (!target.paused && playingIndex === index) {
        try {
          target.pause()
          setPlayingIndex(null)
        } catch {}
        return
      }

      // Pause all other videos
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

  // Auto play the first video on mount
  useEffect(() => {
    const first = videoRefs.current[0]
    if (!first) return
    // Pause others just in case
    videoRefs.current.forEach((video, i) => {
      if (video && i !== 0) {
        try {
          video.pause()
        } catch {}
      }
    })
    try {
      first.play()
      setPlayingIndex(0)
    } catch {}
  }, [])

  // Horizontal drag-to-scroll handlers
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

  // No vertical wheel scrolling — only drag-to-scroll horizontally as requested
  const [isLoading, setIsLoading] = useState(true)

  setTimeout(() => {
    setIsLoading(false)
  }, 3000)

  return (
    <div className="relative px-3 p-6 lg:p-8 2xl:p-12 flex flex-col lg:flex-row gap-4 lg:gap-8 lg:rounded-3xl bg-yellow-100 w-full overflow-hidden">
      <MedalIcon
        weight="fill"
        className="hidden lg:block size-[350px] z-1 absolute top-0 right-0 translate-x-[40%] -translate-y-1/3 text-yellow-300"
      />
      <h2 className="lg:hidden text-center text-gradient-blue-black font-semibold text-lg leading-[100%] tracking-tight">
        Endorsed by top reviewers
      </h2>
      <Link href="/vi/review-hub/detail" className="flex-shrink-0">
        {isLoading ? (
          <Loading className="size-full lg:size-[380px] 2xl:size-[480px] object-cover rounded-3xl" />
        ) : (
          <Image
            src={IMAGES.topProduct}
            alt="top-reviewer"
            width={1000}
            height={1000}
            className="size-full lg:size-[380px] 2xl:size-[480px] object-cover rounded-3xl"
          />
        )}
      </Link>
      <div className="flex flex-col justify-end gap-4 2xl:gap-8 w-full min-w-0 z-10">
        <Link
          href="/vi/review-hub/detail"
          className="flex flex-col gap-4 2xl:gap-8 group cursor-pointer"
        >
          <h2 className="hidden lg:block text-black group-hover:text-yellow-600 transition-colors duration-300 font-semibold xl:text-4xl 2xl:text-[40px] leading-[100%] tracking-tight">
            Endorsed by top reviewers
          </h2>
          <div className="flex gap-3">
            <span className="text-5xl lg:text-7xl xl:text-[96px]/[110%] font-semibold">
              🥇
            </span>
            <div className="flex flex-col gap-2 2xl:gap-3">
              <h3 className="text-xs md:text-xl font-bold text-greyscale-900">
                MANYO
              </h3>
              <p className="group-hover:text-yellow-600 transition-colors duration-300 text-sm lg:text-3xl 2xl:text-[32px] lg:leading-[100%] text-greyscale-900">
                Panthetoin Deep Moisture Mask
              </p>
              <div className="flex items-center gap-3 xl:pt-2 2xl:pt-4">
                <Rating
                  value={Number(4.0)}
                  readOnly
                  maxWidth={isMobile ? 116 : 136}
                />
                <p className="text-sm lg:text-2xl 2xl:text-[28px] leading-[80%] text-greyscale-500">
                  <span className="text-greyscale-900 font-medium">4.0 </span>
                  (69 reviews)
                </p>
              </div>
            </div>
          </div>
        </Link>

        <div className="relative">
          <div className="absolute z-[2] top-0 right-0 w-20 h-full bg-gradient-to-l from-yellow-100 to-transparent"></div>
          <div
            ref={scrollContainerRef}
            className={`flex gap-3 lg:gap-4 overflow-x-scroll scroll-hidden flex-1 min-w-0 ${
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
              >
                <div className="absolute top-1 right-1 lg:top-3 lg:right-3 flex items-center gap-1 bg-white rounded-full py-0.5 px-1.5 text-xs xl:text-base 2xl:text-lg font-medium text-greyscale-900">
                  <StarIcon
                    weight="fill"
                    className="size-3 xl:size-5 text-yellow-600"
                  />
                  4.9
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg lg:rounded-3xl">
                  {playingIndex === index ? (
                    <PauseIcon weight="fill" className="size-10 text-white" />
                  ) : (
                    <PlayIcon weight="fill" className="size-10 text-white" />
                  )}
                </div>
                {isLoading ? (
                  <Loading className="size-[100px] lg:size-[160px] xl:size-[200px] 2xl:size-[250px] min-w-[100px] lg:min-w-[160px] xl:min-w-[200px] 2xl:min-w-[250px] object-cover rounded-lg lg:rounded-3xl flex-shrink-0 bg-[#DCE5E5]" />
                ) : (
                  <video
                    ref={(el) => {
                      if (el) videoRefs.current[index] = el
                    }}
                    src={kol.image}
                    autoPlay={index === 0}
                    muted
                    loop
                    playsInline
                    width={1000}
                    height={1000}
                    className="size-[100px] lg:size-[160px] xl:size-[200px] 2xl:size-[250px] min-w-[100px] lg:min-w-[160px] xl:min-w-[200px] 2xl:min-w-[250px] object-cover rounded-lg lg:rounded-3xl flex-shrink-0 bg-[#DCE5E5]"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopReviewer
