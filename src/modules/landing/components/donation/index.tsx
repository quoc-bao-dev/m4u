'use client'
import { OrbitingCircles } from '@/components/magicui/orbiting-circles'
import { Skeleton } from '@/components/ui/skeleton'
import { Logo } from '@/core/components'
import { IMAGES } from '@/core/constants/IMAGES'
import { useDevice } from '@/core/hooks'
import { useGetHomePage } from '@/services/home/queries'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import CountUp from 'react-countup'
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
interface DonationProps {
  isHero?: boolean
  className?: string
}
const Donation = ({ isHero = false, className }: DonationProps) => {
  const { isLoading, data: homePage } = useGetHomePage()
  const data = homePage?.section8

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
    <div
      className={`flex flex-col items-center justify-center w-full ${className}`}
    >
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
          className="absolute bottom-1/2 -left-2"
        />

        {isLoading ? (
          <Skeleton className="w-3/5 h-20" />
        ) : (
          <div
            className="text-2xl lg:text-[40px]/[110%] font-bold text-greyscale-700 text-center"
            dangerouslySetInnerHTML={{ __html: data?.title ?? '' }}
          />
        )}

        <div className="flex flex-col items-center gap-1 lg:gap-3">
          {hasViewed ? (
            <CountUp
              className="text-xl lg:text-4xl font-bold text-pink-600"
              start={0}
              end={Number(data?.subtitle ?? 0)}
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
        <div className="absolute top-0 z-[1] w-full h-24 bg-gradient-to-b from-[#F9FAFC] to-transparent"></div>
        <div className="absolute bottom-0 z-10 w-full h-20 bg-gradient-to-t from-[#F9FAFC] to-transparent"></div>
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
          {isLoading ? (
            <Skeleton className="w-4/5 h-32" />
          ) : (
            <div
              className="text-2xl lg:text-[40px]/[110%] font-semibold text-greyscale-700 text-center"
              dangerouslySetInnerHTML={{ __html: data?.title ?? '' }}
            ></div>
          )}

          <div className="flex flex-col items-center gap-1 lg:gap-3">
            {hasViewed ? (
              <CountUp
                className="text-xl lg:text-4xl font-bold text-pink-600"
                start={0}
                end={Number(data?.subtitle ?? 0)}
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
            {!isHero ? (
              <button className="border border-[#3B82F6] hover:bg-[#3B82F6] hover:text-white transition-all duration-300 py-2 xl:py-4 px-5 rounded-full text-base font-semibold text-[#3B82F6] cursor-pointer">
                Tìm hiểu thêm
              </button>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <div className="flex -space-x-2 lg:-space-x-4 z-10">
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
                <div className="-mt-4 pt-7 pb-3 px-4 bg-pink-600 rounded-2xl flex flex-col items-center justify-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <p className="text-white text-[32px] font-semibold">04</p>
                      <p className="text-white text-sm">month</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <p className="text-white text-[32px] font-semibold">20</p>
                      <p className="text-white text-sm">day</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <p className="text-white text-[32px] font-semibold">13</p>
                      <p className="text-white text-sm">hour</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-1">
                    <p className="text-white text-base">
                      <span className="font-bold">69K+ individuals</span>
                      just donated our community!
                    </p>
                    <span className="text-pink-100 text-xs">
                      *Financial statements are made public every month.
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <OrbitingCircles
          radius={isMobile ? 200 : isTablet ? 300 : 500}
          speed={0.8}
        >
          <div className="flex-shrink-0 size-9 md:size-20 lg:size-32 rounded-full overflow-hidden border-2 border-pink-600 shadow-lg">
            <Image
              src={IMAGES.donation1}
              alt="donation"
              width={1000}
              height={1000}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="size-3 xl:size-6 rounded-full bg-purple-300/72"></div>
          <div className="flex-shrink-0 size-9 md:size-20 lg:size-32 rounded-full overflow-hidden border-2 border-pink-600 shadow-lg">
            <Image
              src={IMAGES.donation2}
              alt="donation"
              width={100}
              height={100}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="size-2 xl:size-4 rounded-full bg-[#887EF9]/72"></div>
          <div className="flex-shrink-0 size-9 md:size-20 lg:size-32 rounded-full overflow-hidden border-2 border-pink-600 shadow-lg">
            <Image
              src={IMAGES.donation3}
              alt="donation"
              width={100}
              height={100}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="size-3 xl:size-6 rounded-full bg-[#FCD34D]/72"></div>
          <div className="flex-shrink-0 size-9 md:size-20 lg:size-32 rounded-full overflow-hidden border-2 border-pink-600 shadow-lg">
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
          <div className="flex-shrink-0 size-7 md:size-20 xl:size-[100px] rounded-full overflow-hidden border-2 border-pink-600 shadow-lg">
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
          <div className="flex-shrink-0 size-7 md:size-20 xl:size-[100px] rounded-full overflow-hidden border-2 border-pink-600 shadow-lg">
            <Image
              src={IMAGES.donation6}
              alt="donation"
              width={500}
              height={500}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="size-3 xl:size-6 rounded-full bg-[#FFC4E3]/72"></div>
          <div className="flex-shrink-0 size-7 md:size-20 xl:size-[100px] rounded-full overflow-hidden border-2 border-pink-600 shadow-lg">
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
