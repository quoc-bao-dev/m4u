'use client'

import { Container, Section } from '@/core/components/common/group'
import { signify } from 'react-signify'
import HeroBackground from './HeroBackground'
import HeroContent from './HeroContent'
import MobileLiveStreamBar from './MobileLiveStreamBar'
import { memo } from 'react'
import LiveStreamComponent from './LiveStreamComponent'

export const sLiveStreamStatus = signify<boolean>(false)

const HeroSection = () => {
  return (
    <>
      <div className="pb-20">
        <div className="relative h-screen flex flex-col overflow-hidden">
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
          <div className="relative z-0 -mt-70 md:mt-0 ">
            <LiveStreamComponent />
          </div>

          <sLiveStreamStatus.HardWrap>
            {(value) => {
              return <MobileLiveStreamBar isVisible={value} />
            }}
          </sLiveStreamStatus.HardWrap>
        </div>
      </div>
    </>
  )
}

export default memo(HeroSection)
