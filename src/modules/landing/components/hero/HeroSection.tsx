'use client'

import { Header } from '@/core/components'
import { Container, Section } from '@/core/components/common/group'
import Image from 'next/image'
import { useCallback } from 'react'
import { LiveStreamBadge } from '../badge'
import { RegisterCTA } from '../cta'
import HeroBackground from './HeroBackground'

const HeroSection = () => {
  const LiveStreamComponent = useCallback(
    () => (
      <div className="bg-[#FFF0F8] py-6 lg:py-8">
        <Container>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            {/* Live Stream Badge */}
            <LiveStreamBadge />

            {/* Members Section */}
            <div className="flex items-center gap-4">
              {/* Member Info */}
              <div className="text-right">
                <p className="text-gray-900 text-2xl font-medium">
                  Thành viên online
                </p>
                <p className="text-xl">
                  <span className="text-[#F5222D] font-semibold">
                    69+ mẹ đơn thân
                  </span>{' '}
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
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-12 h-full">
        {/* Left Content */}
        <div className="lg:space-y-8 lg:h-full py-10 lg:py-0">
          <div className="flex items-center h-full">
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
                  <p> khi review sản phẩm và</p>
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
    ),
    []
  )

  return (
    <div className="relative lg:h-screen flex flex-col">
      <div className="absolute top-0 left-0 right-0 z-30">
        <Header />
      </div>
      <div className="flex-1 ">
        <Section background={<HeroBackground />} className="h-full">
          <div className="block lg:hidden pt-24"></div>
          <Container className="h-full">
            <HeroContent />
          </Container>
          {/* Live Stream Section */}
        </Section>
      </div>
      <div>
        <LiveStreamComponent />
      </div>
    </div>
  )
}

export default HeroSection
