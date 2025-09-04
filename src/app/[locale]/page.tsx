import {
  HeroSection,
  InfluencerSection,
  IntroduceSection,
  RewardSection,
} from '@/modules/landing'
import CommisionSection from '@/modules/landing/components/commision'
import JoinNow from '@/modules/landing/components/joinNow'
import Reviewer from '@/modules/landing/components/reviewer'

const Page = () => {
  return (
    <main className="overflow-x-hidden">
      <HeroSection />
      <IntroduceSection />
      <RewardSection />
      <CommisionSection />
      <JoinNow />
      <Reviewer />
      <InfluencerSection />
    </main>
  )
}

export default Page
