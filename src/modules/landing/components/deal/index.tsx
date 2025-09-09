'use client'

import { IMAGES } from '@/core/constants/IMAGES'
import { Lightning } from '@/icons'
import { ArrowLeftIcon, ArrowRightIcon, StarIcon } from '@phosphor-icons/react'
import Image from 'next/image'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Link from 'next/link'
import Button from '@/core/components/ui/button'

const deals = [
  {
    id: 1,
    title: 'MANYO',
    description: 'Panthetoin Deep Moisture Mask',
    participation: '70/100 participation',
    image: IMAGES.deal1,
    bgColor: '#FFE1F1',
    hex: '#FE6BBA',
  },
  {
    id: 2,
    title: 'MANYO',
    description: 'Panthetoin Deep Moisture Mask',
    participation: '70/100 participation',
    image: IMAGES.deal2,
    bgColor: '#FDEAB7',
    hex: '#FACA4A',
  },
  {
    id: 3,
    title: 'MANYO',
    description: 'Panthetoin Deep Moisture Mask',
    participation: '70/100 participation',
    image: IMAGES.deal3,
    bgColor: '#D1F7EA',
    hex: '#10805B',
  },
  {
    id: 4,
    title: 'MANYO',
    description: 'Panthetoin Deep Moisture Mask',
    participation: '70/100 participation',
    image: IMAGES.deal1,
    bgColor: '#FFE1F1',
    hex: '#FE6BBA',
  },
  {
    id: 5,
    title: 'MANYO',
    description: 'Panthetoin Deep Moisture Mask',
    participation: '70/100 participation',
    image: IMAGES.deal2,
    bgColor: '#FDEAB7',
    hex: '#FACA4A',
  },
]

const Deal: React.FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    dragFree: true,
    align: 'center',
    containScroll: 'trimSnaps',
  })
  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  const bgRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap())
    }
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
    onSelect()
    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onSelect)
    }
  }, [emblaApi])

  useEffect(() => {
    const hex = deals[selectedIndex]?.hex ?? '#000000'
    if (bgRef.current) {
      bgRef.current.style.background = `radial-gradient(ellipse, ${hex}66 0%, transparent 65%)`
    }
  }, [selectedIndex])

  const handlePrev = useCallback(() => {
    emblaApi?.scrollPrev()
  }, [emblaApi])

  const handleNext = useCallback(() => {
    emblaApi?.scrollNext()
  }, [emblaApi])

  const handleSelect = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index)
    },
    [emblaApi]
  )

  return (
    <div className="relative py-12 xl:py-24 flex flex-col items-center justify-center gap-4 xl:gap-10">
      {/* Vòng tròn mờ đổi màu */}
      <div
        ref={bgRef}
        className="z-[2] absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 w-[120%] h-[100%] rounded-full blur-lg pointer-events-none"
      />

      <div className="z-[3] flex justify-between items-center w-full px-3 lg:px-10 xl:px-24">
        <div className="flex flex-col gap-2 xl:gap-4">
          <h2 className="2xl:text-6xl xl:text-5xl text-2xl text-center lg:text-left font-bold text-greyscale-700">
            Cơ hội độc quyền <br className="lg:hidden" />
            <span className="text-greyscale-400">dành cho bạn</span>
          </h2>
          <p className="2xl:text-2xl xl:text-xl text-base text-center xl:text-left text-greyscale-700">
            Ưu đãi độc quyền trong ngày. Số lượng giới hạn, đăng ký ngay trước
            khi hết!
          </p>
        </div>
        <div className="hidden xl:flex gap-4 items-center">
          <button
            onClick={handlePrev}
            className="p-5 rounded-full bg-white border border-greyscale-200 hover:bg-greyscale-200"
          >
            <ArrowLeftIcon
              weight="bold"
              className="text-greyscale-700 size-7"
            />
          </button>
          <button
            onClick={handleNext}
            className="p-5 rounded-full bg-white border border-greyscale-200 hover:bg-greyscale-200"
          >
            <ArrowRightIcon
              weight="bold"
              className="text-greyscale-700 size-7"
            />
          </button>
        </div>
      </div>

      {/* Viewport */}
      <div className="z-[3] w-full px-0 lg:px-10 xl:px-32 cursor-default select-none">
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex items-center gap-4 lg:gap-3 h-full">
            {deals.map((deal, index) => {
              return (
                <div
                  key={`wrapper-${index}-${deal.id}`}
                  className="shrink-0 basis-1/3 cursor-pointer"
                  onClick={() => handleSelect(index)}
                  role="button"
                  aria-label={`Chuyển tới ưu đãi ${index + 1}`}
                >
                  <div
                    key={`deal-${index}-${deal.id}`}
                    className={`deal-card relative rounded-3xl h-fit w-full select-none transition-transform duration-300 ${
                      index === selectedIndex
                        ? ''
                        : 'scale-[0.9] lg:scale-[0.8] opacity-90'
                    }`}
                  >
                    <div className="rounded-t-3xl relative overflow-hidden">
                      <div
                        className="absolute inset-0 -z-10"
                        style={{
                          background: `radial-gradient(circle, white 0%, ${deal.hex}26 )`,
                        }}
                      />
                      <div className="absolute top-3 xl:top-4 left-3 xl:left-4 flex items-center gap-1 bg-white rounded-full py-0.5 px-1.5 text-xs xl:text-base font-medium text-greyscale-900">
                        <StarIcon
                          weight="fill"
                          className="size-3 xl:size-5 text-yellow-600"
                        />
                        4.9
                      </div>
                      <div className="absolute bottom-3 xl:bottom-4 right-3 xl:right-4 flex items-center gap-1.5">
                        <span className="2xl:size-11 size-9 flex items-center justify-center bg-[#F5222D] p-2 2xl:rounded-2xl rounded-xl text-white 2xl:text-xl text-base font-semibold">
                          19
                        </span>
                        <span className=" text-[#F5222D] text-xl font-semibold">
                          :
                        </span>
                        <span className="2xl:size-11 size-9 flex items-center justify-center bg-[#F5222D] p-2 2xl:rounded-2xl rounded-xl text-white 2xl:text-xl text-base font-semibold">
                          25
                        </span>
                        <span className=" text-[#F5222D] text-xl font-semibold">
                          :
                        </span>
                        <span className="2xl:size-11 size-9 flex items-center justify-center bg-[#F5222D] p-2 2xl:rounded-2xl rounded-xl text-white 2xl:text-xl text-base font-semibold">
                          00
                        </span>
                      </div>
                      <Image
                        src={deal.image}
                        alt="deal"
                        width={500}
                        height={500}
                        className="w-full h-full object-cover rounded-t-3xl"
                      />
                    </div>
                    <div
                      className="p-3 xl:p-5 flex flex-col gap-1 rounded-b-3xl"
                      style={{ backgroundColor: `${deal.bgColor}` }}
                    >
                      <h3 className="text-xs xl:text-sm font-bold text-greyscale-900">
                        {deal.title}
                      </h3>
                      <h3 className="text-greyscale-900 text-sm xl:text-lg truncate">
                        {deal.description}
                      </h3>
                      <div className="py-1">
                        <div className="relative w-full h-1.5">
                          <div className="relative" style={{ width: `70%` }}>
                            <div className="h-1.5 w-full rounded-full bg-gradient-to-r from-[#FF9800] via-[#EF6C00] to-[#FF8500]" />
                            <Lightning className="size-5 xl:size-6 absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2" />
                          </div>
                          <div className="opacity-20 absolute top-0 left-0 h-1.5 w-full rounded-full bg-gradient-to-r from-[#FF9800] via-[#EF6C00] to-[#FF8500]" />
                        </div>
                      </div>
                      <p className="text-xs xl:text-sm text-greyscale-700">
                        {deal.participation}
                      </p>
                      <button
                        className="w-fit mt-3 xl:mt-4 py-2 xl:py-4 px-3 xl:px-5 rounded-full cursor-pointer text-sm xl:text-base"
                        style={{
                          border: `1px solid ${deal.hex}`,
                          color: deal.hex,
                          backgroundColor: 'transparent',
                          transition: 'all 300ms ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = deal.hex
                          e.currentTarget.style.color = '#000'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent'
                          e.currentTarget.style.color = deal.hex
                        }}
                      >
                        Đăng ký dùng thử
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Mobile navigation buttons */}
      <div className="xl:hidden flex gap-4 items-center">
        <button
          onClick={handlePrev}
          className="p-4 xl:p-5 rounded-full bg-white border border-greyscale-200 hover:bg-greyscale-200 transition-all duration-300 cursor-pointer group"
        >
          <ArrowLeftIcon
            weight="bold"
            className="text-greyscale-700 size-7 group-hover:scale-110 transition-all duration-300"
          />
        </button>
        <button
          onClick={handleNext}
          className="p-4 xl:p-5 rounded-full bg-white border border-greyscale-200 hover:bg-greyscale-200 transition-all duration-300 cursor-pointer group"
        >
          <ArrowRightIcon
            weight="bold"
            className="text-greyscale-700 size-7 group-hover:scale-110 transition-all duration-300"
          />
        </button>
      </div>

      <Link href="vi/review-hub">
        <Button>Xem tất cả</Button>
      </Link>
    </div>
  )
}

export default Deal
