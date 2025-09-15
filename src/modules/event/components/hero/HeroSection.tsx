'use client'

import { Container } from '@/core/components'
import Image from 'next/image'
import AnnouncementCountdownCard from './AnnouncementCountdownCard'
import PromoRibbons from './PromoRibbons'

const HeroSection = () => {
  return (
    <section className="relative md:h-[100svh] ">
      <div className="w-full absolute top-0 -z-10">
        <img
          src="/image/event/image-blur-01.png"
          alt=""
          className="w-full object-cover"
        />
      </div>
      <Container className="h-full flex flex-col">
        <div className="flex mt-auto">
          <div className=" flex-1 flex flex-col items-center h-full justify-center">
            <p className="font-krona text-[#FF8092] text-[52px] text-center leading-[120%]">
              Mask-a-thon Challenge
            </p>
            <PromoRibbons
              text1="Review any 3 sheet masks"
              text2="chance to win an iPhone 16"
              className="pt-4"
            />
          </div>
          <div className="">
            <Image
              src={'/image/event/image-01.png'}
              alt=""
              width={500}
              height={500}
              className="w-[660px] aspect-[680/867] object-contain "
            />
          </div>
          <div className="flex-1 relative">
            <div className="w-full  absolute bottom-[10%]">
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
  )
}

export default HeroSection
