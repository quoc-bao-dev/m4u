'use client'

import { Container, Section } from '@/core/components/common/group'
import { ArrowLeftIcon, ArrowRightIcon } from '@phosphor-icons/react'
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
                <h1 className="text-5xl md:text-[48px] lg:text-[64px] xl:text-[72px] 2xl:text-[88px] font-bold">
                  <span className="text-gray-900">Giảm </span>
                  <span className="text-[#FF8092]">50%</span>
                  <span className="text-gray-900"> và</span> <br />
                  <span className="text-gray-900">tặng voucher</span>
                </h1>

                <div className="text-base sm:text-xl lg:text-3xl xxl:text-[48px] text-gray-700 leading-relaxed">
                  <p>khi review sản phẩm và</p>
                  <p>đăng ký nhóm trải nghiệm</p>
                </div>
              </div>
              {/* CTA Button */}
              <RegisterCTA className="mt-4" label="Đăng ký trải nghiệm ngay" />

              {/* Arrow Button */}
              <div className="hidden  md:flex gap-4 items-center relative z-10 top-10">
                <button className="p-5 rounded-full border bg-gray-300/50 border-greyscale-200/30 hover:bg-greyscale-200/70 transition-all duration-300 cursor-pointer group">
                  <ArrowLeftIcon
                    weight="bold"
                    className="text-gray-100! size-7 group-hover:scale-110 transition-all duration-300"
                  />
                </button>
                <button className="p-5 rounded-full bg-gray-300/50 border border-greyscale-200/30 hover:bg-greyscale-200/70 transition-all duration-300 cursor-pointer group">
                  <ArrowRightIcon
                    weight="bold"
                    className="text-gray-100! size-7 group-hover:scale-110 transition-all duration-300"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content - Image */}
        <div className="relative -mr-10 md:mt-0 h-[367px] md:h-full min-h-0 ">
          <div className="relative h-full w-full flex justify-end items-end  left-10 -top-30">
            <Image
              src="/image/hero-baner/image-02.png"
              alt="Hero Banner"
              fill
              className=" md:max-h-full xl:pt-40 object-contain object-bottom h-full"
              priority
            />
          </div>
        </div>
      </div>
    ),
    []
  )

  return (
    <div className="pb-20">
      <div className="relative h-screen flex flex-col">
        <div className="flex-1 ">
          <Section background={<HeroBackground />} className="h-full">
            {/* <div className="block md:hidden pt-24"></div> */}
            <Container className="h-full">
              <HeroContent />
            </Container>
            {/* Live Stream Section */}
          </Section>
        </div>
        <div className="relative z-0 -mt-30">
          <LiveStreamComponent />
        </div>
        <sLiveStreamStatus.HardWrap>
          {(value) => {
            return <MobileLiveStreamBar isVisible={value} />
          }}
        </sLiveStreamStatus.HardWrap>
      </div>
    </div>
  )
}

export default HeroSection
