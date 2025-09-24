'use client'

import { MultiSelect } from '@/core/components'
import { Grid } from '@/core/components/common/group'
import UserAvatar from '@/core/components/UserAvatar'
import { useTranslation } from '@/locale'
import { ScrollRevealCard } from '@/modules/trial-registration'
import { PlayIcon, StarIcon } from '@phosphor-icons/react'
import { useGetDataReviewHubDetailInfinite } from '@/services/review-hub/queries'
import { useParams } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import Image from 'next/image'
import { IMAGES } from '@/core/constants/IMAGES'
import { useTranslations } from 'next-intl'

const options = [
  { label: 'Đặt lịch', value: 'dat-lich' },
  { label: 'Khiếu nại', value: 'khieu-nai' },
  { label: 'Tư vấn', value: 'tu-van' },
  { label: 'Khác', value: 'khac' },
]

const Reviewer = () => {
  const t = useTranslations()
  const { slug } = useParams()
  const loadMoreRef = useRef<HTMLDivElement>(null)
  const firstVideoRef = useRef<HTMLVideoElement>(null)

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useGetDataReviewHubDetailInfinite(slug as string)

  // Flatten all pages data
  const allReviews = data?.pages?.flatMap(page => page?.review?.data || []) || []

  // Auto play first video when data loads
  useEffect(() => {
    if (allReviews.length > 0 && !isLoading && firstVideoRef.current) {
      firstVideoRef.current.play().catch(console.error)
    }
  }, [allReviews.length, isLoading])

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
      },
      { threshold: 0.1 }
    )

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current)
    }

    return () => observer.disconnect()
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  return (
    <div className="pt-[20px] md:pt-[48px]">
      {/* Filter Section */}
      <div className="flex justify-end">
        <div className="flex items-center gap-4 mb-4 md:mb-8">
          <span className="text-gray-700 font-medium truncate">
            {t('product.filterBy')}
          </span>

          {/* Filter Dropdown */}
          <MultiSelect
            options={options}
            // defaultValue={['dat-lich']}
            onChange={(vals) => console.log(vals)}
            className="md:min-w-[150px]"
            placeholder={t('product.selectFilter')}
          />
          <MultiSelect
            options={options}
            // defaultValue={['dat-lich']}
            onChange={(vals) => console.log(vals)}
            className="md:min-w-[150px]"
            placeholder={t('product.selectFilter')}
          />
        </div>
      </div>

      {/* Review Cards Grid */}
      <Grid className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mb-8">
        {isLoading ? (
          <>
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className="w-full aspect-square rounded-3xl" />
            ))}
          </>
        ) : allReviews.length > 0 ? (
          allReviews.map((reviewer: any, index: number) => (
            <ScrollRevealCard
              key={reviewer.id}
              delay={index * 0.05}
              duration={0.6}
            >
              <ReviewCard
                reviewer={reviewer}
                videoRef={index === 0 ? firstVideoRef : undefined}
              />
            </ScrollRevealCard>
          ))
        ) : (
          <div className="col-span-full flex flex-col justify-center items-center gap-1 h-full w-full">
            <Image src={IMAGES.imageNoData} alt="No reviews" width={1000} height={1000} className="w-[250px] h-full object-cover" />
            <p className="text-greyscale-600 text-xl font-semibold">{t('product.noReviews')}</p>
          </div>
        )}
      </Grid>

      {/* Loading indicator */}
      {isFetchingNextPage && (
        <div className="flex justify-center mb-8">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-pink-600"></div>
        </div>
      )}

      {/* Load more trigger */}
      <div ref={loadMoreRef} className="h-4" />

      {/* <div className="flex justify-center">
        <Button size="md" variant="primary">
          {t('product.viewAll')}
        </Button>
      </div> */}
    </div>
  )
}

// Review Card Component
const ReviewCard = ({ reviewer, videoRef }: { reviewer: any, videoRef?: React.RefObject<HTMLVideoElement | null> }) => {
  const { t } = useTranslation()

  const handleMouseEnter = (e: React.MouseEvent<HTMLVideoElement>) => {
    const allVideos = document.querySelectorAll('video')
    allVideos.forEach(video => {
      if (video !== e.currentTarget) {
        video.pause()
      }
    })
    e.currentTarget.play()
  }

  return (
    <div className="bg-orange-100 rounded-2xl overflow-hidden shadow-xl/3 hover:shadow-xl/5 transition-shadow duration-300 group cursor-pointer">
      {/* Video Thumbnail */}
      <div className="relative bg-gray-100 w-full aspect-[410/342]">
        <video
          ref={videoRef}
          src={reviewer?.video_review}
          className="object-cover w-full aspect-[410/342]"
          muted
          loop
          playsInline
          onMouseEnter={handleMouseEnter}
        />
        {/* Play Button */}
        <div className="absolute top-3 left-3 bg-black/50 rounded-full p-2">
          <PlayIcon className="w-4 h-4 text-white" weight="fill" />
        </div>
      </div>

      {/* User Info */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="relative w-10 h-10 rounded-full overflow-hidden">
              <UserAvatar
                src={reviewer?.client?.avatar}
                userName={reviewer?.client?.fullname}
                size={40}
              />
            </div>

            {/* User Details */}
            <div>
              <h3 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">{reviewer?.client?.fullname}</h3>
              <p className="text-sm text-gray-700">
                {reviewer?.view_see} {t('product.views')}
              </p>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 bg-white rounded-full px-2 py-1">
            <StarIcon weight="fill" className="size-6 text-yellow-600" />
            <span className="text-[18px] font-medium text-gray-900 ml-1">
              {reviewer?.evaluate?.toFixed(1)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reviewer
