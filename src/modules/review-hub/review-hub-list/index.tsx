import VideoWrapper from '@/components/VideoWrapper'
import Influencer from './InfluencerSection'
import RankingList from './RankingList'
import TopReviewer from './TopReviewer'

const ReviewHub = () => {
  return (
    <div className="px-0 md:px-8 lg:px-12 xl:px-20 pb-12 flex flex-col gap-6 xl:gap-12 items-center pt-[72px] min-h-screen rounded-b-4xl">
      <h1 className="text-2xl lg:text-5xl 2xl:text-[64px] font-bold xl:py-6 text-gradient-blue-black">
        Review Hub
      </h1>
      <TopReviewer />
      <div className="px-3 lg:px-0 w-full flex flex-col gap-6 xl:gap-12">
        <RankingList />
        <Influencer />
      </div>
      <VideoWrapper
        src="/image/background.mp4"
        playbackRate={0.3}
        className="absolute inset-0 -z-10 w-full h-full object-cover pointer-events-none"
      />
    </div>
  )
}

export default ReviewHub
