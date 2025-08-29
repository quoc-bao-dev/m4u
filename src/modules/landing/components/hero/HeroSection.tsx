'use client'

import { Logo } from '@/core/components'
import { Container, Section } from '@/core/components/common/group'
import Image from 'next/image'
import { useCallback } from 'react'
import { RegisterCTA } from '../cta'

const HeroSection = () => {
  // Background component placeholder - you can modify this later
  const BackgroundComponent = () => (
    <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100">
      {/* Add your custom background here */}
    </div>
  )

  const LiveStreamComponent = useCallback(
    () => (
      <div className="bg-[#FFF0F8] py-6 lg:py-8">
        <Container>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            {/* Live Stream Badge */}
            <div className="flex items-center gap-4">
              {/* Live stream button placeholder - you can modify this later */}
              <div className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                LIVE
                <span className="bg-black/20 px-2 py-1 rounded text-xs">
                  69
                </span>
              </div>
            </div>

            {/* Members Section */}
            <div className="flex items-center gap-4">
              {/* Member Info */}
              <div className="text-right">
                <p className="text-gray-900 text-2xl font-medium">
                  Thành viên online
                </p>
                <p className="text-xl">
                  <span className="text-[#F5222D]">69+ mẹ đơn thân</span>{' '}
                  <span className="text-[#4B5563]">
                    đang tham gia nhóm trải nghiệm
                  </span>
                </p>
              </div>

              {/* Avatar Stack */}
              <div className="flex -space-x-2">
                {/* Avatar placeholders - replace with actual user avatars */}
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-16 h-16 bg-gray-300 rounded-full border-4 border-white flex items-center justify-center text-gray-600 text-xs font-medium"
                  >
                    {i}
                  </div>
                ))}
                <div className="w-16 h-16 bg-gray-400 rounded-full border-4 border-white flex items-center justify-center text-white text-sm font-medium">
                  69
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    ),
    []
  )

  const HeroContent = useCallback(
    () => (
      <Section background={<BackgroundComponent />} className="h-full">
        <div className="block lg:hidden pt-24"></div>
        <Container className="h-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-12 h-full">
            {/* Left Content */}
            <div className="lg:space-y-8 lg:h-full py-10 lg:py-0">
              <div className="flex items-center h-full">
                <div>
                  {/* Main Heading */}
                  <div className="space-y-4 ">
                    <h1 className="text-4xl sm:text-6xl lg:text-8xl xl:text-[108px] font-bold">
                      <span className="text-gray-900">Giảm </span>
                      <span className="text-[#FF8092]">50%</span>
                      <span className="text-gray-900"> và</span>
                      <br />
                      <span className="text-gray-900">tặng voucher</span>
                    </h1>

                    <p className="text-base sm:text-2xl lg:text-3xl xl:text-[48px] text-gray-700 leading-relaxed">
                      khi review sản phẩm và
                      <br />
                      đăng ký nhóm trải nghiệm
                    </p>
                  </div>
                  {/* CTA Button */}
                  <RegisterCTA className="mt-4" />
                </div>
              </div>
            </div>

            {/* Right Content - Image */}
            <div className="relative h-full">
              <div className="relative h-[500px] lg:h-full w-full lg:-right-20">
                <Image
                  src="/image/hero-baner/image-01.png"
                  alt="Hero Banner"
                  fill
                  className="object-contain h-full"
                  priority
                />
              </div>
            </div>
          </div>
        </Container>
        {/* Live Stream Section */}
      </Section>
    ),
    []
  )

  return (
    <div className="relative lg:h-screen flex flex-col">
      <div className="absolute top-0 left-0 right-0 z-30">
        <Container>
          <div className="flex justify-between py-6">
            <div className="size-10 bg-amber-500"></div>
            <Logo />
            <div className="size-10 bg-amber-500"></div>
          </div>
        </Container>
      </div>
      <div className="flex-1 ">
        <HeroContent />
      </div>
      <div>
        <LiveStreamComponent />
      </div>
    </div>
  )
}

export default HeroSection
