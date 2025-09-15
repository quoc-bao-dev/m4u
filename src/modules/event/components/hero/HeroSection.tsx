import { Container } from '@/core/components'
import PromoRibbons from './PromoRibbons'
import Image from 'next/image'

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
          <div className="flex-1 flex flex-col items-center h-full justify-center">
            <p className="font-krona text-[#FF8092] text-[52px] text-center leading-[120%]">
              Mask-a-thon Challenge
            </p>
          </div>
          <div className="">
            <Image
              src={'/image/event/image-01.png'}
              alt=""
              width={500}
              height={500}
              className="w-[590px] aspect-[680/867] object-contain "
            />
          </div>
          <div className="flex-1">
            <p className="font-krona text-[#FF8092]">HeroSection</p>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default HeroSection
