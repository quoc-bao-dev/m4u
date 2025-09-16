'use client'

import { Container } from '@/core/components'
import Image from 'next/image'
import AnnouncementCountdownCard from './AnnouncementCountdownCard'
import PromoRibbons from './PromoRibbons'

const HeroSection = () => {
  return (
    <>
      <section className="relative md:h-[100svh] pt-[100px] lg:pt-0">
        <div className="w-full absolute top-0 -z-10">
          <img
            src="/image/event/image-blur-01.png"
            alt=""
            className="w-full object-cover"
          />
        </div>
        <Container className="h-full flex flex-col">
          <div className="flex flex-col md:flex-row mt-auto  justify-between  md:pt-[100px]  h-full">
            <div className=" md:relative -top-12 lg:top-0 left-0 md:-left-10 lg:-left-0 flex-1 flex flex-col items-center justify-center h-full">
              <p className="font-krona text-[#FF8092] text-[28px] md:text-[32px] lg:text-[38px]  2xl:text-[52px] text-center leading-[120%]">
                <span className="truncate"> Mask-a-thon</span> <br /> Challenge
              </p>
              <PromoRibbons
                text1="Review any 3 sheet masks"
                text2="chance to win an iPhone 16"
                className="pt-4 scale-[80%] md:scale-[80%] lg:scale-[80%] 2xl:scale-[100%] w-fit"
              />
            </div>
            <div className="relative flex-2 h-full pt-6 md:pt-0">
              <div className="mx-auto md:absolute md:bottom-0 md:left-1/2 md:-translate-x-1/2 w-full md:w-[480px] xl:w-[580px]  2xl:w-[660px] -z-10">
                <Image
                  src={'/image/event/image-01.png'}
                  alt=""
                  width={500}
                  height={500}
                  className="w-full"
                />
              </div>
            </div>
            <div className="flex-1 relative flex justify-center mf:block">
              <div className="md:absolute md:bottom-[15%] md:right-0">
                <AnnouncementCountdownCard
                  imageUrl="/image/event/image-02.png"
                  imageAlt="Megaphone"
                  targetDate="2025-10-01T00:00:00+07:00"
                  dateLabel="01 October 2025"
                  headline="WINNERS WILL BE ANNOUNCED"
                  buttonText="JOIN NOW"
                  onJoin={() => alert('Joined!')}
                />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

export default HeroSection
