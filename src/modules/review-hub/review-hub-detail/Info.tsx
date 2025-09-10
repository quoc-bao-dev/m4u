'use client'
import Rating from '@/core/components/common/Rating'
import Button from '@/core/components/ui/button'
import { IMAGES } from '@/core/constants/IMAGES'
import { useDevice } from '@/core/hooks'
import Image from 'next/image'
import { useRef, useState } from 'react'

const kols = [
  {
    id: 1,
    image: IMAGES.kol1,
  },
  {
    id: 2,
    image: IMAGES.kol2,
  },
  {
    id: 3,
    image: IMAGES.kol3,
  },
  {
    id: 4,
    image: IMAGES.kol1,
  },
  {
    id: 5,
    image: IMAGES.kol2,
  },
  {
    id: 6,
    image: IMAGES.kol2,
  },
  {
    id: 7,
    image: IMAGES.kol3,
  },
  {
    id: 8,
    image: IMAGES.kol1,
  },
  {
    id: 9,
    image: IMAGES.kol2,
  },
]

const Info = () => {
  const { isMobile, isTablet, isDesktop } = useDevice()
  const images = [
    IMAGES.topProduct,
    IMAGES.topProduct1,
    IMAGES.topProduct2,
    IMAGES.topProduct3,
    IMAGES.topProduct1,
  ]
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const itemRefs = useRef<(HTMLImageElement | null)[]>([])

  return (
    <div className="p-3 py-6 lg:p-6 xl:p-12 bg-yellow-100 flex flex-col lg:flex-row gap-4 lg:gap-6 xl:gap-8 md:rounded-3xl w-full">
      <div className="flex flex-col-reverse lg:flex-row gap-3 lg:h-[300px] xl:h-[350px] flex-shrink-0">
        <div className="relative">
          <div className="lg:hidden absolute right-0 w-20 xl:w-full h-full xl:h-20 bg-gradient-to-l xl:bg-gradient-to-t from-yellow-100 to-transparent pointer-events-none" />
          <div className="hidden lg:block absolute bottom-0 right-0 w-20 lg:w-full h-full lg:h-20 bg-gradient-to-l lg:bg-gradient-to-t from-yellow-100 to-transparent pointer-events-none" />

          <div
            ref={containerRef}
            className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto overflow-y-hidden lg:overflow-x-hidden h-full scroll-hidden w-fit flex-shrink-0"
          >
            {images.map((img, index) => (
              <Image
                key={`thumb-${index}`}
                src={img}
                alt={`product-thumb-${index + 1}`}
                width={1000}
                height={1000}
                ref={(el) => {
                  itemRefs.current[index] = el
                }}
                onClick={() => {
                  setActiveIndex(index)
                  const el = itemRefs.current[index]
                  const isVertical = isDesktop
                  el?.scrollIntoView({
                    behavior: 'smooth',
                    block: isVertical ? 'center' : 'nearest',
                    inline: isVertical ? 'nearest' : 'center',
                  })
                }}
                className={`size-24 xl:size-30 rounded-2xl object-cover cursor-pointer ${
                  activeIndex === index
                    ? 'border border-[#FF8092]'
                    : 'border border-transparent'
                }`}
              />
            ))}
          </div>
        </div>
        <div className="relative size-full lg:size-[300px] xl:size-[350px] flex-shrink-0">
          <Image
            src={images[activeIndex]}
            alt="top-reviewer"
            width={1000}
            height={1000}
            className="size-full rounded-2xl object-cover"
          />
          <div className="xl:hidden absolute bottom-2 right-2 flex items-center gap-1.5">
            <span className="2xl:size-11 size-9 flex items-center justify-center bg-[#F5222D] p-2 2xl:rounded-2xl rounded-xl text-white 2xl:text-xl lg:text-base text-sm font-semibold">
              19
            </span>
            <span className=" text-[#F5222D] text-xl font-semibold">:</span>
            <span className="2xl:size-11 size-9 flex items-center justify-center bg-[#F5222D] p-2 2xl:rounded-2xl rounded-xl text-white 2xl:text-xl lg:text-base text-sm font-semibold">
              25
            </span>
            <span className=" text-[#F5222D] text-xl font-semibold">:</span>
            <span className="2xl:size-11 size-9 flex items-center justify-center bg-[#F5222D] p-2 2xl:rounded-2xl rounded-xl text-white 2xl:text-xl lg:text-base text-sm font-semibold">
              00
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3 justify-between flex-1">
        <div className="flex flex-col gap-1 xl:gap-3 w-full">
          <h2 className="text-xs lg:text-base xl:text-xl font-bold text-greyscale-900">
            MANYO
          </h2>
          <h3 className="text-base lg:text-2xl xl:text-[32px] xl:leading-[100%] font-normal text-greyscale-900">
            Panthetoin Deep Moisture Mask
          </h3>
          <div className="flex gap-3 justify-between w-full mt-2 lg:mt-0">
            <div className="flex items-center gap-3">
              <Rating
                value={Number(4.0)}
                readOnly
                maxWidth={isMobile ? 116 : 136}
              />
              <p className="text-sm lg:text-xl xl:text-2xl 2xl:text-[28px] leading-[80%] text-greyscale-500">
                <span className="text-greyscale-900 font-medium">4.0 </span>
                (69 reviews)
              </p>
            </div>
            <div className="hidden xl:flex items-center gap-1.5">
              <span className="2xl:size-11 size-9 flex items-center justify-center bg-[#F5222D] p-2 2xl:rounded-2xl rounded-xl text-white 2xl:text-xl text-base font-semibold">
                19
              </span>
              <span className=" text-[#F5222D] text-xl font-semibold">:</span>
              <span className="2xl:size-11 size-9 flex items-center justify-center bg-[#F5222D] p-2 2xl:rounded-2xl rounded-xl text-white 2xl:text-xl text-base font-semibold">
                25
              </span>
              <span className=" text-[#F5222D] text-xl font-semibold">:</span>
              <span className="2xl:size-11 size-9 flex items-center justify-center bg-[#F5222D] p-2 2xl:rounded-2xl rounded-xl text-white 2xl:text-xl text-base font-semibold">
                00
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col-reverse xl:flex-row gap-3 justify-between xl:items-center w-full">
          <div className="flex flex-col gap-1">
            <h4 className="text-lg lg:text-xl xl:text-2xl font-bold text-[#F5222D]">
              ⚡ Only 88 slots left
            </h4>
            <p className="text-sm lg:text-base xl:text-xl text-greyscale-600">
              <span className="text-greyscale-900 font-bold">69 users</span>{' '}
              enrolled in the product&apos;s trial program
            </p>
          </div>
          <div className="flex -space-x-2 lg:-space-x-4">
            {kols.slice(0, 5).map((kol, index) => (
              <Image
                key={`${kol.id}-${index}`}
                src={kol.image}
                alt="top-reviewer"
                width={1000}
                height={1000}
                className="flex-shrink-0 size-10 lg:size-12 xl:size-14 2xl:size-16 rounded-full object-cover border-2 border-white bg-[#D5DEDA]"
              />
            ))}
            {kols.length > 5 && (
              <div className="flex-shrink-0 size-10 lg:size-12 xl:size-14 2xl:size-16 rounded-full object-cover border-2 border-white bg-black flex items-center justify-center text-white text-base font-semibold">
                +{kols.length - 5}
              </div>
            )}
          </div>
        </div>
        <Button>Đăng ký ngay</Button>
      </div>
    </div>
  )
}

export default Info
