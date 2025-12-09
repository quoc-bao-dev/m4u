'use client'
import VideoWrapper from '@/components/VideoWrapper'
import {
  useGetDataReviewHubDetailInfinite,
  useGetProductRelationListReviewHub,
} from '@/services/review-hub/queries'
import Info from './Info'
import KOLs from './KOLs'
import Similar from './Similar'
import { useForMobileApp } from '@/core/hooks/useForMobileApp'

const ReviewHubDetail = ({ slug }: { slug: string }) => {
  const { isLoading, data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useGetDataReviewHubDetailInfinite(slug)
  const {
    isLoading: isLoadingSimilar,
    data: productRelationListReviewHub,
    isError,
  } = useGetProductRelationListReviewHub({ id: data?.pages?.[0]?.id })
  const forMobileApp = useForMobileApp()

  return (
    <div
      className={`px-0 md:px-8 lg:px-12 xl:px-20 2xl:px-24 pb-12 flex flex-col gap-6 xl:gap-12 items-center  min-h-screen rounded-b-4xl ${
        forMobileApp ? 'pt-0' : 'pt-[72px]'
      }`}
    >
      <Info data={data?.pages?.[0]} isLoading={isLoading} />
      <KOLs
        data={data}
        isLoading={isLoading}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
        slug={slug}
      />
      <Similar
        isError={isError}
        data={productRelationListReviewHub}
        isLoading={isLoading || isLoadingSimilar}
      />
      <VideoWrapper
        src="/image/background.mp4"
        playbackRate={0.3}
        className="absolute inset-0 -z-10 w-full h-full object-cover pointer-events-none"
      />
    </div>
  )
}

export default ReviewHubDetail
