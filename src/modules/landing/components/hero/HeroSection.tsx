'use client'

import { Container, Section } from '@/core/components/common/group'
import Image from 'next/image'
import { useCallback } from 'react'
import { LiveStreamBadge } from '../badge'
import { RegisterCTA } from '../cta'
import AvatarStack from './AvatarStack'
import HeroBackground from './HeroBackground'

const HeroSection = () => {
  const LiveStreamComponent = useCallback(
    () => (
      <div className="bg-[#FFF0F8] py-6 lg:py-8">
        <Container>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            {/* Live Stream Badge */}
            <div className="flex justify-center md:block w-full">
              <LiveStreamBadge />
            </div>

            {/* Members Section */}
            <div className="flex flex-col md:flex-row items-center gap-4">
              {/* Member Info */}
              <div className="text-center md:text-right">
                <p className="text-gray-900 text-2xl font-bold truncate">
                  Thành viên online
                </p>
                <p className="text-sm md:text-xl ">
                  <span className="text-[#F5222D] font-bold">
                    69+ mẹ đơn thân
                  </span>{' '}
                  <span className="text-[#4B5563] truncate">
                    đang tham gia nhóm trải nghiệm
                  </span>
                </p>
              </div>

              {/* Avatar Stack */}
              <AvatarStack />
            </div>
          </div>
        </Container>
      </div>
    ),
    []
  )

  const HeroContent = useCallback(
    () => (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-12 h-full">
        {/* Left Content */}
        <div className="lg:space-y-8 lg:h-full py-10 lg:py-0">
          <div className="flex items-center h-full  -mt-8 md:mt-0">
            <div>
              {/* Main Heading */}
              <div className="space-y-4 ">
                <h1 className="text-4xl sm:text-6xl lg:text-8xl xl:text-[88px] font-bold">
                  <span className="text-gray-900">Giảm </span>
                  <span className="text-[#FF8092]">50%</span>
                  <span className="text-gray-900"> và</span>
                  <br />
                  <span className="text-gray-900">tặng voucher</span>
                </h1>

                <div className="text-base sm:text-xl lg:text-3xl xxl:text-[48px] text-gray-700 leading-relaxed">
                  <p>khi review sản phẩm và</p>
                  <p>đăng ký nhóm trải nghiệm</p>
                </div>
              </div>
              {/* CTA Button */}
              <RegisterCTA className="mt-4" label="Đăng ký trải nghiệm ngay" />
            </div>
          </div>
        </div>

        {/* Right Content - Image */}
        <div className="relative h-full">
          <div className="relative -mt-20 md:mt-0 h-[400px] md:h-[600px] lg:h-full  w-full lg:-right-20">
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
    ),
    []
  )

  return (
    <div className="relative md:h-screen flex flex-col">
      <div className="flex-1 ">
        <Section background={<HeroBackground />} className="h-full">
          <div className="block lg:hidden pt-24"></div>
          <Container className="h-full">
            <HeroContent />
          </Container>
          {/* Live Stream Section */}
        </Section>
      </div>
      <div className="relative z-0">
        <LiveStreamComponent />
      </div>
    </div>
  )
}

export default HeroSection
