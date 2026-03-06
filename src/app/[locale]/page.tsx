import {
  HeroSection,
  InfluencerSection,
  IntroduceSection,
  RewardSection,
} from '@/modules/landing'
import CommisionSection from '@/modules/landing/components/commision'
import Deal from '@/modules/landing/components/deal'
import Donation from '@/modules/landing/components/donation'
import JoinNow from '@/modules/landing/components/joinNow'
import Reviewer from '@/modules/landing/components/reviewer'
import VideoWrapper from '@/components/VideoWrapper'

const Page = () => {
  return (
    <main className="overflow-x-hidden">
      <div className="relative">
        <HeroSection />
        <VideoWrapper
          src="/image/background.mp4"
          playbackRate={0.3}
          className="absolute inset-0 -z-10 w-full h-full object-cover pointer-events-none"
        />
        <IntroduceSection />
        <RewardSection />
        <CommisionSection />
        <JoinNow />
      </div>
      <Reviewer />
      <Deal />
      <Donation />
      <InfluencerSection />
    </main>
  )
}

export default Page
