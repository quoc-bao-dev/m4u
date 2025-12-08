'use client'
import VideoWrapper from '@/components/VideoWrapper'
import { useGetDataReviewHub } from '@/services/review-hub/queries'
import { useTranslations } from 'next-intl'
import Influencer from './InfluencerSection'
import NodataReviewhub from './NodataReviewhub'
import RankingList from './RankingList'
import TopReviewer from './TopReviewer'
import { useCallback } from 'react'

const ReviewHub = () => {
  const t = useTranslations('reviewHub')
  const { isLoading, data } = useGetDataReviewHub()
  
  const isIPhone = useCallback(() => {
    // return true
    return /iPhone|iPod|iPad/.test(navigator.userAgent)
  }, [])

  return (
    <div className="px-0 md:px-8 lg:px-12 xl:px-20 pb-12 flex flex-col gap-6 xl:gap-12 items-center pt-[72px] min-h-screen rounded-b-4xl">
      <h1 className="text-2xl lg:text-5xl 2xl:text-[64px] font-bold xl:py-6 text-gradient-blue-black">
        {t('title')}
      </h1>

      {!isLoading && data?.length === 0 ? (
        <NodataReviewhub />
      ) : (
        <div className='w-full flex flex-col gap-6 xl:gap-12'>
          {/* <TopReviewer isLoading={isLoading} data={data?.[0]} /> */}
          <div className="px-3 lg:px-0 w-full flex flex-col gap-6 xl:gap-12">
            {/* <RankingList products={data?.slice(1) ?? []} isLoading={isLoading} /> */}
            <Influencer />
          </div>
        </div>
      )}

      {isIPhone() ?
        <div className="absolute inset-0 -z-[11] w-full h-full bg-gray-50" />
        : <VideoWrapper
          src="/image/background.mp4"
          playbackRate={0.3}
          className="absolute inset-0 -z-[1] w-full h-full object-cover pointer-events-none"
        />}
    </div>
  )
}

export default ReviewHub
