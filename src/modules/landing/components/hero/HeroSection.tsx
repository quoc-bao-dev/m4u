import { Container, Section } from '@/core/components/common/group'
import HeroBackground from './HeroBackground'
import HeroContent from './HeroContent'
import LiveStreamComponent from './LiveStreamComponent'
import LiveStreamShow from './LiveStreamShow'

const HeroSection = () => {
  return (
    <>
      <div className="">
        <div className="relative h-[100svh] flex flex-col overflow-hidden">
          <div className="flex-1 ">
            <Section
              background={
                <>
                  <HeroBackground />
                </>
              }
              className="h-full"
            >
              {/* <div className="block md:hidden pt-24"></div> */}
              <Container className="h-full">
                <HeroContent />
              </Container>
              {/* Live Stream Section */}
            </Section>
          </div>
          <div className="relative z-10 -mt-70 md:mt-0 ">
            <LiveStreamComponent />
          </div>
        </div>
      </div>
      <LiveStreamShow />
    </>
  )
}

export default HeroSection
