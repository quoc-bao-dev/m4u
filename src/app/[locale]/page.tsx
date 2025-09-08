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

const Page = () => {
  return (
    <main className="overflow-x-hidden">
      <HeroSection />
      {/* <IntroduceSection /> */}
      {/* <RewardSection /> */}
      <CommisionSection />
      <JoinNow />
      <Reviewer />
      <Deal />
      <Donation />
      <InfluencerSection />
    </main>
  )
}

export default Page
