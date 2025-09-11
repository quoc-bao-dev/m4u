import Influencer from './InfluencerSection'
import RankingList from './RankingList'
import Testsvg from './testsvg'
import TopReviewer from './TopReviewer'

const ReviewHub = () => {
  return (
    <div className="bg-white px-0 md:px-8 lg:px-12 xl:px-20 pb-12 flex flex-col gap-6 xl:gap-12 items-center pt-[72px] min-h-screen rounded-b-4xl">
      <h1 className="text-2xl lg:text-5xl 2xl:text-[64px] font-bold xl:py-6 text-gradient-blue-black">
        Review Hub
      </h1>
      <Testsvg />
      <TopReviewer />
      <div className="px-3 lg:px-0 w-full flex flex-col gap-6 xl:gap-12">
        <RankingList />
        <Influencer />
      </div>
    </div>
  )
}

export default ReviewHub
