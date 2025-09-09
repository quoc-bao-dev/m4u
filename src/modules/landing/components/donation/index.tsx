'use client'
import { OrbitingCircles } from '@/components/magicui/orbiting-circles'
import { Logo } from '@/core/components'
import { IMAGES } from '@/core/constants/IMAGES'
import { useDevice } from '@/core/hooks'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import CountUp from 'react-countup'

const Donation = () => {
  const { isMobile, isTablet } = useDevice()
  // quan sát khi component vào viewport
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [hasViewed, setHasViewed] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el || hasViewed) return

    const obs = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry.isIntersecting) {
          setHasViewed(true)
          obs.unobserve(el) // chỉ chạy 1 lần
        }
      },
      { root: null, threshold: 0.4 } // thấy ~40% chiều cao là kích hoạt
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [hasViewed])

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="lg:hidden relative flex flex-col justify-center items-center lg:gap-6 gap-2 w-[90%] lg:w-[464px]">
        <Image
          src={IMAGES.heart1}
          alt="heart"
          width={24}
          height={24}
          className="absolute top-4 -right-4"
        />
        <Image
          src={IMAGES.heart2}
          alt="heart"
          width={24}
          height={24}
          className="absolute bottom-1/2 left-0"
        />
        <h2 className="text-2xl lg:text-[40px]/[110%] font-bold text-greyscale-700 text-center">
          <span className="text-greyscale-400">
            Chung tay lan tỏa yêu thương,
          </span>{' '}
          đồng hành cùng mẹ đơn thân
        </h2>

        <div className="flex flex-col items-center gap-1 lg:gap-3">
          {hasViewed ? (
            <CountUp
              className="text-xl lg:text-4xl font-bold text-pink-600"
              start={0}
              end={1234567890}
              suffix=" ₫"
              duration={2.2}
              separator=","
            />
          ) : (
            // Trạng thái trước khi vào viewport (hiển thị tĩnh)
            <span className="text-xl lg:text-4xl font-bold text-pink-600">
              0 ₫
            </span>
          )}
          <p className="text-sm lg:text-base text-greyscale-700">
            Đã được quyên góp!
          </p>
        </div>
      </div>
      <div
        ref={containerRef}
        className="py-12 xl:py-20 relative flex h-[50vh]  md:h-[80vh] w-full flex-col items-center justify-center overflow-hidden"
      >
        <div className="absolute top-0 z-[1] w-full h-24 bg-gradient-to-b from-white to-transparent"></div>
        <div className="absolute bottom-0 z-10 w-full h-20 bg-gradient-to-t from-white to-transparent"></div>
        <div className="relative lg:hidden">
          <Logo className="size-[40px] md:size-[60px]" />
          <Image
            src={IMAGES.heart1}
            alt="heart"
            width={24}
            height={24}
            className="absolute size-4 -top-1 -right-5"
          />
          <Image
            src={IMAGES.heart2}
            alt="heart"
            width={24}
            height={24}
            className="absolute size-4 -bottom-2 -left-5"
          />
        </div>
        <div className="hidden relative lg:flex flex-col justify-center items-center lg:gap-6 gap-2 w-[90%] lg:w-[464px]">
          <Image
            src={IMAGES.heart1}
            alt="heart"
            width={24}
            height={24}
            className="absolute top-4 -right-4"
          />
          <Image
            src={IMAGES.heart2}
            alt="heart"
            width={24}
            height={24}
            className="absolute bottom-1/2 left-0"
          />
          <h2 className="text-2xl lg:text-[40px]/[110%] font-semibold text-greyscale-700 text-center">
            <span className="text-greyscale-400">
              Chung tay lan tỏa yêu thương,
            </span>{' '}
            đồng hành cùng mẹ đơn thân
          </h2>

          <div className="flex flex-col items-center gap-1 lg:gap-3">
            {hasViewed ? (
              <CountUp
                className="text-xl lg:text-4xl font-bold text-pink-600"
                start={0}
                end={1234567890}
                suffix=" ₫"
                duration={2.2}
                separator=","
              />
            ) : (
              // Trạng thái trước khi vào viewport (hiển thị tĩnh)
              <span className="text-xl lg:text-4xl font-bold text-pink-600">
                0 ₫
              </span>
            )}
            <p className="text-sm lg:text-base text-greyscale-700">
              Đã được quyên góp!
            </p>
            <button className="border border-[#3B82F6] hover:bg-[#3B82F6] hover:text-white transition-all duration-300 py-2 xl:py-4 px-5 rounded-full text-base font-semibold text-[#3B82F6] cursor-pointer">
              Tìm hiểu thêm
            </button>
          </div>
        </div>
        <OrbitingCircles
          radius={isMobile ? 200 : isTablet ? 300 : 500}
          speed={0.8}
        >
          <div className="flex-shrink-0 size-9 md:size-20 lg:size-32 rounded-full overflow-hidden">
            <Image
              src={IMAGES.donation1}
              alt="donation"
              width={1000}
              height={1000}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="size-3 xl:size-6 rounded-full bg-purple-300/72"></div>
          <div className="flex-shrink-0 size-9 md:size-20 lg:size-32 rounded-full overflow-hidden">
            <Image
              src={IMAGES.donation2}
              alt="donation"
              width={100}
              height={100}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="size-2 xl:size-4 rounded-full bg-[#887EF9]/72"></div>
          <div className="flex-shrink-0 size-9 md:size-20 lg:size-32 rounded-full overflow-hidden">
            <Image
              src={IMAGES.donation3}
              alt="donation"
              width={100}
              height={100}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="size-3 xl:size-6 rounded-full bg-[#FCD34D]/72"></div>
          <div className="flex-shrink-0 size-9 md:size-20 lg:size-32 rounded-full overflow-hidden">
            <Image
              src={IMAGES.donation4}
              alt="donation"
              width={100}
              height={100}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="size-3 xl:size-6 rounded-full bg-[#FF8092]/72"></div>
        </OrbitingCircles>

        <OrbitingCircles
          iconSize={30}
          radius={isMobile ? 120 : isTablet ? 200 : 330}
          reverse
          speed={0.8}
        >
          <div className="flex-shrink-0 size-7 md:size-20 xl:size-[100px] rounded-full overflow-hidden">
            <Image
              src={IMAGES.donation5}
              alt="donation"
              width={500}
              height={500}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="size-2 xl:size-4 rounded-full bg-[#FF8092]/72"></div>
          <div className="size-2 xl:size-4 rounded-full bg-[#38BDF8]/72"></div>
          <div className="flex-shrink-0 size-7 md:size-20 xl:size-[100px] rounded-full overflow-hidden">
            <Image
              src={IMAGES.donation6}
              alt="donation"
              width={500}
              height={500}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="size-3 xl:size-6 rounded-full bg-[#FFC4E3]/72"></div>
          <div className="flex-shrink-0 size-7 md:size-20 xl:size-[100px] rounded-full overflow-hidden">
            <Image
              src={IMAGES.donation7}
              alt="donation"
              width={500}
              height={500}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="size-2 xl:size-4 rounded-full bg-[#A0DFF9]/72"></div>
        </OrbitingCircles>
      </div>
      <button className="lg:hidden border border-[#3B82F6] hover:bg-[#3B82F6] hover:text-white transition-all duration-300 py-1 xl:py-4 px-5 rounded-full text-base font-semibold text-[#3B82F6] cursor-pointer">
        Tìm hiểu thêm
      </button>
    </div>
  )
}

export default Donation
