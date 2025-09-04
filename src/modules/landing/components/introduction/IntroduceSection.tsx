import { Section } from '@/core/components'
import { BlurCircle2 } from '@/core/components/animated/blur'
import BlurCircle1 from '@/core/components/animated/blur/BlurCircle1'
import BeautyReviewerSection from './BeautyReviewerContnent'
import ReviewerCarousel from './ReviewerCarousel'

const IntroduceSection = () => {
  return (
    <div className="py-[96px]">
      <Section
        background={
          <div className="relative z-0">
            {/* <BlurCircle
              className="absolute top-[-300px] right-[-30%]"
              variant="v1"
              animation={{
                duration: 1,
                amplitudeX: 10,
                amplitudeY: 20,
              }}
            />
            <BlurCircle
              className="absolute top-[0%] right-[20%]"
              variant="v2"
              animation={{
                duration: 1,
              }}
            /> */}
            <BlurCircle1
              className="absolute top-[-200px] right-[-30%]"
              animation={{
                duration: 1,
              }}
            />
            <BlurCircle2
              className="absolute top-[0px] right-[30%]"
              animation={{
                duration: 1,
              }}
            />
          </div>
        }
      >
        <BeautyReviewerSection />
        <div className="pt-[48px]"></div>
        <ReviewerCarousel />
      </Section>
    </div>
  )
}

export default IntroduceSection
