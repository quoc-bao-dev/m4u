'use client'
import { Skeleton } from '@/components/ui/skeleton'
import Rating from '@/core/components/common/Rating'
import { IMAGES } from '@/core/constants/IMAGES'
import { useDevice } from '@/core/hooks'
import { withAlpha } from '@/core/utils'
import { Link } from '@/locale'
import { MedalIcon, PauseIcon, PlayIcon, StarIcon } from '@phosphor-icons/react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import apiReviewHub from '@/services/review-hub/api'
import { useForMobileApp } from '@/core/hooks/useForMobileApp'

interface TopReviewerProps {
  isLoading: boolean
  data: any
}

const TopReviewer = ({ isLoading, data }: TopReviewerProps) => {
  const { isMobile } = useDevice()
  const videoRefs = useRef<HTMLVideoElement[]>([])
  const preloadVideoRefs = useRef<HTMLVideoElement[]>([])
  const pendingPlayIndexRef = useRef<number | null>(null)
  const [playingIndex, setPlayingIndex] = useState<number | null>(null)
  const [loadedVideos, setLoadedVideos] = useState<Set<number>>(new Set())
  const [preloadedVideos, setPreloadedVideos] = useState<Set<number>>(new Set())
  const [pendingPlayIndex, setPendingPlayIndex] = useState<number | null>(null)
  const scrollContainerRef = useRef<HTMLDivElement | null>(null)
  const isDraggingRef = useRef<boolean>(false)
  const dragStartXRef = useRef<number>(0)
  const scrollStartLeftRef = useRef<number>(0)
  const [isDraggingState, setIsDraggingState] = useState<boolean>(false)
  const [reviews, setReviews] = useState<any[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [lastPage, setLastPage] = useState<number>(1)
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false)

  const forMobileApp = useForMobileApp()

  // Detect iPhone to disable autoplay
  const isIPhone = useCallback(() => {
    // return true
    return /iPhone|iPod|iPad/.test(navigator.userAgent)
  }, [])

  // Helper to set pending play index (sync state and ref)
  const setPendingPlayIndexSync = useCallback((index: number | null) => {
    pendingPlayIndexRef.current = index
    setPendingPlayIndex(index)
  }, [])

  const handleHoverVideo = useCallback(
    (index: number) => {
      // Preload video on hover (but don't display video element, keep showing thumbnail)
      if (!preloadedVideos.has(index) && !loadedVideos.has(index)) {
        setPreloadedVideos((prev) => new Set(prev).add(index))
      }
    },
    [preloadedVideos, loadedVideos]
  )

  const handlePlayVideo = useCallback(
    (index: number) => {
      // If clicking the currently playing video, pause (toggle off)
      if (playingIndex === index) {
        const target = videoRefs.current[index]
        if (target && !target.paused) {
          try {
            target.pause()
            setPlayingIndex(null)
            setPendingPlayIndexSync(null)
          } catch {}
          return
        }
      }

      // Mark video as loaded immediately when user clicks play
      // This will trigger re-render to show video element
      const wasLoaded = loadedVideos.has(index)
      if (!wasLoaded) {
        setLoadedVideos((prev) => new Set(prev).add(index))
        // Mark this video as pending play - will auto-play when mounted
        setPendingPlayIndexSync(index)
      } else {
        // Video already loaded, play immediately
        const target = videoRefs.current[index]
        if (target) {
          // Pause all other videos (both displayed and preloaded)
          videoRefs.current.forEach((video, i) => {
            if (video && i !== index) {
              try {
                video.pause()
              } catch {}
            }
          })
          preloadVideoRefs.current.forEach((video, i) => {
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
        }
      }

      // Pause all other videos (both displayed and preloaded)
      videoRefs.current.forEach((video, i) => {
        if (video && i !== index) {
          try {
            video.pause()
          } catch {}
        }
      })
      preloadVideoRefs.current.forEach((video, i) => {
        if (video && i !== index) {
          try {
            video.pause()
          } catch {}
        }
      })
    },
    [playingIndex, loadedVideos]
  )

  // Auto-play pending video when it's loaded
  useEffect(() => {
    if (pendingPlayIndex === null) return
    if (!loadedVideos.has(pendingPlayIndex)) return
    if (isIPhone()) return

    // Wait for video element to be rendered, then play
    requestAnimationFrame(() => {
      setTimeout(() => {
        const target = videoRefs.current[pendingPlayIndex]
        if (target) {
          // Pause all other videos (both displayed and preloaded)
          videoRefs.current.forEach((video, i) => {
            if (video && i !== pendingPlayIndex) {
              try {
                video.pause()
              } catch {}
            }
          })
          preloadVideoRefs.current.forEach((video, i) => {
            if (video && i !== pendingPlayIndex) {
              try {
                video.pause()
              } catch {}
            }
          })
          try {
            target.play()
            setPlayingIndex(pendingPlayIndex)
            setPendingPlayIndexSync(null)
          } catch {}
        }
      }, 50)
    })
  }, [pendingPlayIndex, loadedVideos, isIPhone, setPendingPlayIndexSync])

  // Auto play the first video on mount
  useEffect(() => {
    if (!reviews || reviews.length === 0) return

    // Disable autoplay on iPhone
    if (isIPhone()) return

    // Wait for video element to be rendered, then play
    // Use requestAnimationFrame to ensure DOM is updated
    requestAnimationFrame(() => {
      setTimeout(() => {
        const first = videoRefs.current[0]
        if (!first) return

        // Pause others just in case (both displayed and preloaded)
        videoRefs.current.forEach((video, i) => {
          if (video && i !== 0) {
            try {
              video.pause()
            } catch {}
          }
        })
        preloadVideoRefs.current.forEach((video, i) => {
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
      }, 50)
    })
  }, [reviews.length, isIPhone, loadedVideos])

  // Init reviews and pagination from props data
  useEffect(() => {
    if (data?.review?.data) {
      setReviews(data.review.data)
      setCurrentPage(Number(data.review.current_page || 1))
      setLastPage(Number(data.review.last_page || 1))
    } else {
      setReviews([])
      setCurrentPage(1)
      setLastPage(1)
    }
    // Reset loaded videos when reviews change
    setLoadedVideos(new Set())
    setPreloadedVideos(new Set())
    setPlayingIndex(null)
    setPendingPlayIndexSync(null)
  }, [data, setPendingPlayIndexSync])

  // Load first video immediately when reviews are available
  useEffect(() => {
    if (reviews && reviews.length > 0) {
      // Load first video immediately
      setLoadedVideos((prev) => new Set(prev).add(0))
    }
  }, [reviews.length])

  const loadMore = useCallback(async () => {
    if (!data?.id) return
    if (isLoadingMore) return
    if (currentPage >= lastPage) return
    setIsLoadingMore(true)
    try {
      const nextPage = currentPage + 1
      const response = await apiReviewHub.dataReviewHubProduct(data.id, {
        per_page: 9,
        current_page: nextPage,
      })
      const payload = response?.data?.data
      const nextReviews = payload?.review?.data || payload?.data || []
      const nextLastPage = Number(
        payload?.review?.last_page || payload?.last_page || lastPage
      )
      setReviews((prev) => [...prev, ...nextReviews])
      setCurrentPage(nextPage)
      setLastPage(nextLastPage)
    } catch {
      // noop
    } finally {
      setIsLoadingMore(false)
    }
  }, [data?.id, currentPage, lastPage, isLoadingMore])

  const handleScroll = useCallback(() => {
    const el = scrollContainerRef.current
    if (!el) return
    const nearEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 24
    if (nearEnd) {
      loadMore()
    }
  }, [loadMore])

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

  const t = useTranslations('reviewHub')
  const tProduct = useTranslations('product')

  return (
    <div className="bg-white lg:rounded-3xl w-full">
      <div
        className="relative px-3 p-6 lg:p-8 2xl:p-12 flex flex-col lg:flex-row gap-4 lg:gap-8 lg:rounded-3xl w-full overflow-hidden"
        style={{
          backgroundColor: withAlpha(data?.background_color || '#fff', 0.2),
        }}
      >
        <MedalIcon
          weight="fill"
          className="hidden lg:block size-[350px] z-10 absolute top-0 right-0 translate-x-[40%] -translate-y-1/3"
          style={{
            color: withAlpha(data?.background_color || '#fff', 0.4),
          }}
        />
        <h2 className="lg:hidden text-center text-gradient-blue-black font-semibold text-lg leading-[110%] tracking-tight">
          {t('endorsedByTopReviewers')}
        </h2>
        <Link
          href={`/review-hub${forMobileApp ? '/for-mobile-app' : ''}/${
            data?.slug
          }`}
          className="flex-shrink-0"
        >
          {isLoading ? (
            <Skeleton className="size-full aspect-square lg:size-[380px] 2xl:size-[480px] object-cover rounded-3xl" />
          ) : (
            <div
              className="size-full aspect-square lg:size-[380px] 2xl:size-[480px] rounded-3xl flex items-center justify-center bg-white/90 hover:bg-[var(--hover-bg-color)] transition-colors duration-300"
              style={
                {
                  '--hover-bg-color': withAlpha(
                    data?.background_color || '#F59E0B',
                    0.2
                  ),
                } as React.CSSProperties
              }
            >
              <Image
                src={data?.image || IMAGES.topProduct}
                alt="top-reviewer"
                width={1000}
                height={1000}
                className="p-2 lg:p-6 object-contain size-full rounded-3xl"
              />
            </div>
          )}
        </Link>
        <div className="flex flex-col justify-end gap-4 2xl:gap-8 w-full min-w-0 z-10">
          <Link
            href={`/review-hub${forMobileApp ? '/for-mobile-app' : ''}/${
              data?.slug
            }`}
            className="flex flex-col gap-4 2xl:gap-8 group cursor-pointer"
            style={
              {
                ['--topreview-color' as any]: withAlpha(
                  data?.background_color || '#F59E0B',
                  1
                ),
              } as React.CSSProperties
            }
          >
            <h2 className="hidden lg:block text-gradient-blue-black transition-colors duration-300 font-semibold xl:text-4xl 2xl:text-[40px] leading-[110%] tracking-tight">
              {t('endorsedByTopReviewers')}
            </h2>
            <div className="flex gap-3">
              <span className="text-5xl lg:text-7xl xl:text-[96px]/[110%] font-semibold">
                🥇
              </span>
              <div className="flex flex-col gap-2 2xl:gap-3 w-full">
                {isLoading ? (
                  <Skeleton className="w-[20%] h-6 md:h-7" />
                ) : (
                  <h3 className="text-xs md:text-xl font-bold text-greyscale-900">
                    {data?.code || 'MANYO'}
                  </h3>
                )}
                {isLoading ? (
                  <Skeleton className="w-[60%] h-6 md:h-7" />
                ) : (
                  <p className="text-greyscale-900 group-hover:[color:var(--topreview-color)] transition-colors duration-300 text-sm lg:text-3xl 2xl:text-[32px] lg:leading-[100%]">
                    {data?.name || 'Panthetoin Deep Moisture Mask'}
                  </p>
                )}
                <div className="flex items-center gap-3 xl:pt-2 2xl:pt-4">
                  <Rating
                    value={Number(data?.average_star || 5.0)}
                    readOnly
                    maxWidth={isMobile ? 116 : 136}
                  />
                  <p className="text-sm lg:text-2xl 2xl:text-[28px] leading-[80%] text-greyscale-500">
                    <span className="text-greyscale-900 font-medium">
                      {data?.average_star}{' '}
                    </span>
                    ({data?.quantity_reviews} {tProduct('reviews')})
                  </p>
                </div>
              </div>
            </div>
          </Link>

          <div className="relative">
            {reviews?.length > 4 && (
              <>
                <div className="absolute z-[1] top-0 right-0 w-20 h-full bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
                <div
                  className="absolute z-[2] top-0 right-0 w-20 h-full pointer-events-none"
                  style={{
                    background: `linear-gradient(to left, ${withAlpha(
                      data?.background_color || '#FEF3C7',
                      0.2
                    )}, transparent)`,
                  }}
                ></div>
              </>
            )}
            <div
              ref={scrollContainerRef}
              className={`flex gap-3 lg:gap-4 overflow-x-scroll scroll-hidden flex-1 min-w-0 ${
                isDraggingState ? 'cursor-grabbing' : 'cursor-grab'
              }`}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={endDrag}
              onMouseLeave={endDrag}
              onScroll={handleScroll}
            >
              {isLoading ? (
                <>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Skeleton
                      key={index}
                      className="size-[100px] lg:size-[160px] xl:size-[200px] 2xl:size-[250px] min-w-[100px] lg:min-w-[160px] xl:min-w-[200px] 2xl:min-w-[250px] object-cover rounded-lg lg:rounded-3xl flex-shrink-0 bg-[#DCE5E5]"
                    />
                  ))}
                </>
              ) : (
                <>
                  {reviews?.map((kol: any, index: number) => (
                    <div
                      className="group relative cursor-pointer"
                      key={index}
                      onClick={() => handlePlayVideo(index)}
                      onMouseEnter={() => handleHoverVideo(index)}
                    >
                      <div className="absolute top-1 right-1 lg:top-3 lg:right-3 flex items-center gap-1 bg-white rounded-full py-0.5 px-1.5 text-xs xl:text-base 2xl:text-lg font-medium text-greyscale-900">
                        <StarIcon
                          weight="fill"
                          className="size-3 xl:size-5 text-yellow-600"
                        />
                        {kol.evaluate.toFixed(1)}
                      </div>
                      <div
                        className={`${
                          isIPhone()
                            ? playingIndex === index
                              ? 'opacity-0'
                              : 'opacity-100'
                            : 'opacity-0 group-hover:opacity-100'
                        } transition-all duration-300 absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg lg:rounded-3xl z-10`}
                      >
                        {playingIndex === index ? (
                          <PauseIcon
                            weight="fill"
                            className="size-8 xl:size-10 text-white"
                          />
                        ) : (
                          <PlayIcon
                            weight="fill"
                            className="size-8 xl:size-10 text-white"
                          />
                        )}
                      </div>
                      {/* Hidden video element for preloading on hover */}
                      {preloadedVideos.has(index) &&
                        !loadedVideos.has(index) && (
                          <video
                            ref={(el) => {
                              if (el) {
                                preloadVideoRefs.current[index] = el
                                try {
                                  el.setAttribute('playsinline', 'true')
                                  ;(el as any).playsInline = true
                                  el.setAttribute('preload', 'auto')
                                  el.setAttribute('muted', 'true')
                                } catch {}
                              }
                            }}
                            src={kol.video_review_render ?? kol.video_review}
                            preload="auto"
                            muted
                            className="hidden"
                            style={{ display: 'none' }}
                          />
                        )}
                      {loadedVideos.has(index) ? (
                        <video
                          ref={(el) => {
                            if (el) {
                              videoRefs.current[index] = el
                              // Force inline playback across legacy browsers
                              try {
                                el.setAttribute('playsinline', 'true')
                                ;(el as any).playsInline = true
                                el.setAttribute('webkit-playsinline', 'true')
                                el.setAttribute('x5-playsinline', 'true')
                                el.setAttribute('x5-video-player-type', 'h5')
                                el.setAttribute('x-webkit-airplay', 'allow')
                                // Restrict fullscreen and remote playback via attributes as a best-effort
                                el.setAttribute(
                                  'controlslist',
                                  'nofullscreen noremoteplayback nodownload noplaybackrate'
                                )
                                el.setAttribute(
                                  'disablepictureinpicture',
                                  'true'
                                )
                                // If video was preloaded, use metadata to speed up play
                                el.setAttribute(
                                  'preload',
                                  preloadedVideos.has(index)
                                    ? 'metadata'
                                    : 'none'
                                )
                              } catch {}

                              // Auto-play immediately if this video is pending play
                              if (
                                pendingPlayIndexRef.current === index &&
                                !isIPhone()
                              ) {
                                // Pause all other videos (both displayed and preloaded)
                                videoRefs.current.forEach((video, i) => {
                                  if (video && i !== index) {
                                    try {
                                      video.pause()
                                    } catch {}
                                  }
                                })
                                preloadVideoRefs.current.forEach((video, i) => {
                                  if (video && i !== index) {
                                    try {
                                      video.pause()
                                    } catch {}
                                  }
                                })

                                // Function to play video
                                const playVideo = () => {
                                  // Pause all other videos again before playing (safety check)
                                  videoRefs.current.forEach((video, i) => {
                                    if (video && i !== index) {
                                      try {
                                        video.pause()
                                      } catch {}
                                    }
                                  })
                                  preloadVideoRefs.current.forEach(
                                    (video, i) => {
                                      if (video && i !== index) {
                                        try {
                                          video.pause()
                                        } catch {}
                                      }
                                    }
                                  )
                                  try {
                                    el.play()
                                    setPlayingIndex(index)
                                    setPendingPlayIndexSync(null)
                                  } catch {}
                                }

                                // Try to play immediately
                                if (el.readyState >= 2) {
                                  // Video has loaded enough data to play
                                  playVideo()
                                } else {
                                  // Wait for video to be ready
                                  const onCanPlay = () => {
                                    playVideo()
                                    el.removeEventListener('canplay', onCanPlay)
                                  }
                                  el.addEventListener('canplay', onCanPlay)

                                  // Also try after a short delay as fallback
                                  setTimeout(() => {
                                    if (pendingPlayIndexRef.current === index) {
                                      playVideo()
                                      el.removeEventListener(
                                        'canplay',
                                        onCanPlay
                                      )
                                    }
                                  }, 100)
                                }
                              }
                            }
                          }}
                          src={kol.video_review_render ?? kol.video_review}
                          poster={kol.small_image_video_review}
                          preload={
                            preloadedVideos.has(index) ? 'metadata' : 'none'
                          }
                          autoPlay={false}
                          muted
                          loop
                          playsInline
                          controls={false}
                          controlsList="nofullscreen noremoteplayback nodownload noplaybackrate"
                          disablePictureInPicture
                          width={1000}
                          height={1000}
                          className="size-[100px] lg:size-[160px] xl:size-[200px] 2xl:size-[250px] min-w-[100px] lg:min-w-[160px] xl:min-w-[200px] 2xl:min-w-[250px] object-cover rounded-lg lg:rounded-3xl flex-shrink-0 bg-[#DCE5E5]"
                        />
                      ) : (
                        <Image
                          src={
                            kol.small_image_video_review || IMAGES.topProduct
                          }
                          alt="video-thumbnail"
                          width={1000}
                          height={1000}
                          className="size-[100px] lg:size-[160px] xl:size-[200px] 2xl:size-[250px] min-w-[100px] lg:min-w-[160px] xl:min-w-[200px] 2xl:min-w-[250px] object-cover rounded-lg lg:rounded-3xl flex-shrink-0 bg-[#DCE5E5]"
                        />
                      )}
                    </div>
                  ))}
                  {isLoadingMore && (
                    <Skeleton className="size-[100px] lg:size-[160px] xl:size-[200px] 2xl:size-[250px] min-w-[100px] lg:min-w-[160px] xl:min-w-[200px] 2xl:min-w-[250px] object-cover rounded-lg lg:rounded-3xl flex-shrink-0 bg-[#DCE5E5]" />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopReviewer
