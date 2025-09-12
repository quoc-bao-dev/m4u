import VideoWrapper from '@/components/VideoWrapper'
import {
  HeroSection,
  ProductSection,
  ReviewCTASection,
  TermNBenefitSection,
  TopProductSection,
} from '@/modules/trial-registration'

const Page = () => {
  return (
    <main>
      <HeroSection />
      <TopProductSection />
      <div className="relative">
        <VideoWrapper
          src="/image/background.mp4"
          playbackRate={0.3}
          className="absolute inset-0 -z-10 w-full h-full object-cover pointer-events-none opacity-60"
        />{' '}
        <div className="relative z-40">
          <ProductSection />
        </div>
        <TermNBenefitSection />
        <ReviewCTASection />
      </div>
    </main>
  )
}

export default Page
