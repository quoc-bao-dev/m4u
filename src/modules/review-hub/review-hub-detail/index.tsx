'use client'
import VideoWrapper from '@/components/VideoWrapper'
import Info from './Info'
import KOLs from './KOLs'
import Similar from './Similar'

const ReviewHubDetail = () => {

  return (
    <div className="px-0 md:px-8 lg:px-12 xl:px-20 2xl:px-24 pb-12 flex flex-col gap-6 xl:gap-12 items-center pt-[72px] min-h-screen rounded-b-4xl">
      <Info />
      <KOLs />
      <Similar />
      <VideoWrapper
        src="/image/background.mp4"
        playbackRate={0.3}
        className="absolute inset-0 -z-10 w-full h-full object-cover pointer-events-none"
      />
    </div>
  )
}

export default ReviewHubDetail
