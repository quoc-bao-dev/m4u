'use client'
import { Container } from '@/core/components'
import Image from 'next/image'
import AvatarStack from './AvatarStack'
import TestimonialCard from './TestimonialCard'
import ScrollDownCTA from './ScrollDownCTA'

const HeroSection = () => {
  return (
    <section className="relative md:h-[100svh] pt-[90px] md:pt-0 overflow-hidden">
      <div className="absolute left-0 right-0 -bottom-[50%] z-0">
        <img
          src="/blur/blur-hero-01.png"
          alt=""
          className="scale-[130%] w-full"
        />
      </div>
      <div className="h-full flex flex-col">
        <div className="mt-auto pb-[200px]">
          <Container>
            <div className="flex flex-col md:flex-row justify-between relative">
              {/* Right */}
              <div className="w-full md:w-[35%]">
                <div className="flex flex-col space-y-[16px]">
                  {/* Main Headline */}
                  <div className="space-y-[8px]">
                    <h1 className="text-[32px] lg:text-[64px] xl:text-[80px] 2xl:text-[96px] font-bold leading-[110%]">
                      <span className="text-gray-900">Tham gia</span>{' '}
                      <span className="text-[#FF8092]">trải nghiệm</span>
                    </h1>
                  </div>

                  {/* Sub-headline */}
                  <p className="lg:text-[20px] xl:text-[24px] 2xl:text-[36px] font-medium text-gray-800">
                    viết review nhận ngay ưu đãi
                  </p>
                  {/* Social Proof Section */}
                  <AvatarStack />
                </div>
              </div>
              {/* Center */}
              <div className="w-[80%] md:w-[30%] md:absolute left-1/2 top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 ">
                <div className="">
                  <Image
                    src="/image/trial/image-01.png"
                    alt="Hero Image"
                    className="w-full"
                    width={300}
                    height={300}
                  />
                </div>
              </div>
              {/* Left */}
              <div className="w-full md:w-[30%]">
                <TestimonialCard />
              </div>
            </div>
          </Container>
        </div>
      </div>
      <ScrollDownCTA />
    </section>
  )
}

export default HeroSection
