'use client'

import { Container, Section } from '@/core/components/common/group'
import Image from 'next/image'
import { useCallback } from 'react'
import { signify } from 'react-signify'
import { RegisterCTA } from '../cta'
import HeroBackground from './HeroBackground'
import LiveStreamComponent from './LiveStreamComponent'
import MobileLiveStreamBar from './MobileLiveStreamBar'

export const sLiveStreamStatus = signify<boolean>(false)

const HeroSection = () => {
  const HeroContent = useCallback(
    () => (
      <div className="grid grid-cols-1 grid-rows-[1fr_auto] md:grid-rows-1 md:grid-cols-2 lg:gap-12 h-full">
        {/* Left Content */}
        <div className="lg:space-y-8 lg:h-full md:py-10 lg:py-0">
          <div className="flex items-center w-full md:h-full mt-20 md:mt-0">
            <div className="w-full">
              {/* Main Heading */}
              <div className="space-y-4 w-full">
                <style jsx>{`
                  .hero-title {
                    font-size: 24px;
                  }

                  .hero-subtitle {
                    font-size: 12px;
                  }

                  .hero-image {
                    width: 50%;
                    height: 50%;
                  }

                  @media (min-height: 600px) {
                    .hero-title {
                      font-size: inherit;
                    }

                    .hero-subtitle {
                      font-size: inherit;
                    }

                    .hero-image {
                      width: inherit;
                      height: inherit;
                    }
                  }
                `}</style>

                <div className="text-[42px] md:text-[48px] lg:text-[64px] xl:text-[72px] 2xl:text-[88px]">
                  <h1 className="hero-title font-bold leading-[120%] md:leading-none">
                    <span className="text-gray-900">Giảm </span>
                    <span className="text-[#FF8092]">50%</span>
                    <span className="text-gray-900"> và</span> <br />
                    <span className="text-gray-900">tặng voucher</span>
                  </h1>
                </div>

                <div className="text-xl lg:text-3xl xxl:text-[48px] text-gray-700 leading-relaxed">
                  <p className="hero-subtitle ">khi review sản phẩm và</p>
                  <p className="hero-subtitle ">đăng ký nhóm trải nghiệm</p>
                </div>
              </div>
              {/* CTA Button */}
              <div className="hidden md:block">
                <RegisterCTA
                  className="mt-4"
                  label="Đăng ký trải nghiệm ngay"
                />
              </div>

              <div className="block md:hidden">
                <RegisterCTA className="mt-4" label="Đăng ký ngay" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Content - Image */}
        <div className="relative -mr-10 md:mt-0 h-[367px] md:h-full min-h-0 ">
          <div className="relative h-full w-full flex justify-end items-end left-22 -top-70 md:top-0">
            <div className="relative w-[90%] h-[90%] md:w-full md:h-full flex items-end justify-end">
              <div className="hero-image ">
                <Image
                  src="/image/hero-baner/image-02.png"
                  alt="Hero Banner"
                  fill
                  className="md:max-h-full xl:pt-40 object-contain object-bottom h-full"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    []
  )

  return (
    <>
      <div className="pb-20">
        <div className="relative h-screen flex flex-col overflow-hidden">
          <div className="flex-1 ">
            <Section background={<HeroBackground />} className="h-full">
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

export default HeroSection
