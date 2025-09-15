'use client'

import { Container } from '@/core/components'
import Image from 'next/image'
import AnnouncementCountdownCard from './AnnouncementCountdownCard'
import PromoRibbons from './PromoRibbons'

const HeroSection = () => {
  return (
    <>
      <section className="relative lg:h-[100svh] pt-[100px] lg:pt-0">
        <div className="w-full absolute top-0 -z-10">
          <img
            src="/image/event/image-blur-01.png"
            alt=""
            className="w-full object-cover"
          />
        </div>
        <Container className="h-full flex flex-col">
          <div className="flex flex-col lg:flex-row mt-auto">
            <div className="flex-1 flex flex-col items-center h-full justify-center pb-20">
              <p className="font-krona text-[#FF8092] xl:text-[32px]  2xl:text-[52px] text-center leading-[120%]">
                Mask-a-thon Challenge
              </p>
              <PromoRibbons
                text1="Review any 3 sheet masks"
                text2="chance to win an iPhone 16"
                className="pt-4 scale-[80%] 2x:scale-[100%]"
              />
            </div>
            <div className="max-w-[380px] mx-auto lg:mx-0 lg:max-w-none">
              <Image
                src={'/image/event/image-01.png'}
                alt=""
                width={500}
                height={500}
                className="w-[80%] aspect-[680/867] object-contain "
              />
            </div>
            <div className="flex-1 relative">
              <div className="w-full  relative lg:absolute bottom-[10%] right-0">
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
