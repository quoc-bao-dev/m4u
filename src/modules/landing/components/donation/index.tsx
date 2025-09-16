'use client'
import { OrbitingCircles } from '@/components/magicui/orbiting-circles'
import { Skeleton } from '@/components/ui/skeleton'
import { Logo } from '@/core/components'
import { IMAGES } from '@/core/constants/IMAGES'
import { useDevice } from '@/core/hooks'
import { Link } from '@/locale'
import { useGetHomePage } from '@/services/home/queries'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import CountUp from 'react-countup'
// Dữ liệu KOLs - có thể dễ dàng thay đổi
const kols = [
  { id: 1, image: IMAGES.kol1 },
  { id: 2, image: IMAGES.kol2 },
  { id: 3, image: IMAGES.kol3 },
  { id: 4, image: IMAGES.kol1 },
  { id: 5, image: IMAGES.kol2 },
  { id: 6, image: IMAGES.kol2 },
  { id: 7, image: IMAGES.kol3 },
  { id: 8, image: IMAGES.kol1 },
  { id: 9, image: IMAGES.kol2 },
]

// Component KOLs Display
const KOLsDisplay = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex -space-x-2 lg:-space-x-4 z-10">
        {kols.slice(0, 5).map((kol, index) => (
          <Image
            key={`${kol.id}-${index}`}
            src={kol.image}
            alt="top-reviewer"
            width={1000}
            height={1000}
            className="flex-shrink-0 size-12 lg:size-12 xl:size-14 2xl:size-16 rounded-full object-cover border-2 border-white bg-[#D5DEDA]"
          />
        ))}
        {kols.length > 5 && (
          <div className="flex-shrink-0 size-12 lg:size-12 xl:size-14 2xl:size-16 rounded-full object-cover border-2 border-white bg-black flex items-center justify-center text-white text-base font-semibold">
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
          <p className="text-white text-sm xl:text-base">
            <span className="font-bold">69K+ individuals</span>
            just donated our community!
          </p>
          <span className="text-pink-100 text-xs">
            *Financial statements are made public every month.
          </span>
        </div>
      </div>
    </div>
  )
}

// Cấu hình cho orbiting items - dễ dàng thay đổi
const outerOrbitingConfig = [
  { src: IMAGES.donation1, alt: 'donation', className: 'size-9 md:size-20 lg:size-32' },
  { type: 'dot', className: 'size-3 xl:size-6', bgColor: 'bg-purple-300/72' },
  { src: IMAGES.donation2, alt: 'donation', className: 'size-9 md:size-20 lg:size-32' },
  { type: 'dot', className: 'size-2 xl:size-4', bgColor: 'bg-[#887EF9]/72' },
  { src: IMAGES.donation3, alt: 'donation', className: 'size-9 md:size-20 lg:size-32' },
  { type: 'dot', className: 'size-3 xl:size-6', bgColor: 'bg-[#FCD34D]/72' },
  { src: IMAGES.donation4, alt: 'donation', className: 'size-9 md:size-20 lg:size-32' },
  { type: 'dot', className: 'size-3 xl:size-6', bgColor: 'bg-[#FF8092]/72' },
]

const innerOrbitingConfig = [
  { src: IMAGES.donation5, alt: 'donation', className: 'size-7 md:size-20 xl:size-[100px]' },
  { type: 'dot', className: 'size-2 xl:size-4', bgColor: 'bg-[#FF8092]/72' },
  { type: 'dot', className: 'size-2 xl:size-4', bgColor: 'bg-[#38BDF8]/72' },
  { src: IMAGES.donation6, alt: 'donation', className: 'size-7 md:size-20 xl:size-[100px]' },
  { type: 'dot', className: 'size-3 xl:size-6', bgColor: 'bg-[#FFC4E3]/72' },
  { src: IMAGES.donation7, alt: 'donation', className: 'size-7 md:size-20 xl:size-[100px]' },
  { type: 'dot', className: 'size-2 xl:size-4', bgColor: 'bg-[#A0DFF9]/72' },
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
          obs.unobserve(el)
        }
      },
      { root: null, threshold: 0.4 }
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [hasViewed])

  // Helper functions để tái sử dụng
  const renderHeartDecorations = (variant: 'mobile' | 'desktop' | 'logo') => {
    const positions = {
      mobile: { heart1: 'absolute top-4 -right-4', heart2: 'absolute bottom-1/2 -left-2' },
      desktop: { heart1: 'absolute top-4 -right-4', heart2: 'absolute bottom-1/2 left-0' },
      logo: { heart1: 'absolute size-4 -top-1 -right-5', heart2: 'absolute size-4 -bottom-2 -left-5' }
    }

    const pos = positions[variant]
    return (
      <>
        <Image src={IMAGES.heart1} alt="heart" width={24} height={24} className={pos.heart1} />
        <Image src={IMAGES.heart2} alt="heart" width={24} height={24} className={pos.heart2} />
      </>
    )
  }

  const renderCountUp = (value: number) => {
    if (hasViewed) {
      return (
        <CountUp
          className="text-xl lg:text-4xl font-bold text-pink-600"
          start={0}
          end={value}
          suffix=" ₫"
          duration={2.2}
          separator=","
        />
      )
    }
    return <span className="text-xl lg:text-4xl font-bold text-pink-600">0 ₫</span>
  }

  const renderOrbitingItems = (config: any[], radius: number, reverse = false, iconSize?: number) => {
    const responsiveRadius = isMobile ? Math.min(radius, 200) : isTablet ? Math.min(radius, 300) : radius

    return (
      <OrbitingCircles
        iconSize={iconSize}
        radius={responsiveRadius}
        reverse={reverse}
        speed={0.8}
      >
        {config.map((item, index) => (
          <div key={index}>
            {item.src ? (
              <div className={`flex-shrink-0 ${item.className} rounded-full overflow-hidden border-2 border-pink-600 shadow-lg`}>
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={1000}
                  height={1000}
                  className="object-cover w-full h-full"
                />
              </div>
            ) : (
              <div className={`${item.className} rounded-full ${item.bgColor}`}></div>
            )}
          </div>
        ))}
      </OrbitingCircles>
    )
  }

  return (
    <div className={`flex flex-col items-center justify-center w-full ${className}`}>
      {/* Mobile Content */}
      <div className="lg:hidden relative flex flex-col justify-center items-center lg:gap-6 gap-2 w-[90%] lg:w-[464px]">
        {renderHeartDecorations('mobile')}

        {isLoading ? (
          <Skeleton className="w-3/5 h-20" />
        ) : (
          <div
            className="text-2xl lg:text-[40px]/[110%] font-bold text-greyscale-700 text-center"
            dangerouslySetInnerHTML={{ __html: data?.title ?? '' }}
          />
        )}

        <div className="flex flex-col items-center gap-1 lg:gap-3">
          {renderCountUp(Number(data?.subtitle ?? 0))}
          <p className="text-sm lg:text-base text-greyscale-700">Đã được quyên góp!</p>
        </div>
      </div>

      {/* Main Container */}
      <div
        ref={containerRef}
        className="py-12 xl:py-20 relative flex h-[50vh] md:h-[80vh] w-full flex-col items-center justify-center overflow-hidden"
      >
        <div className="absolute top-0 z-[1] w-full h-24 bg-gradient-to-b from-[#F9FAFC] to-transparent"></div>
        <div className="absolute bottom-0 z-10 w-full h-20 bg-gradient-to-t from-[#F9FAFC] to-transparent"></div>

        {/* Logo với heart decorations */}
        <div className="relative lg:hidden">
          <Logo className="size-[40px] md:size-[60px]" />
          {renderHeartDecorations('logo')}
        </div>

        {/* Desktop Content */}
        <div className="hidden relative lg:flex flex-col justify-center items-center lg:gap-6 gap-2 w-[90%] lg:w-[464px]">
          {renderHeartDecorations('desktop')}

          {isLoading ? (
            <Skeleton className="w-4/5 h-32" />
          ) : (
            <div
              className="text-2xl lg:text-[40px]/[110%] font-semibold text-greyscale-700 text-center"
              dangerouslySetInnerHTML={{ __html: data?.title ?? '' }}
            />
          )}

          <div className="flex flex-col items-center gap-1 lg:gap-3">
            {renderCountUp(Number(data?.subtitle ?? 0))}
            <p className="text-sm lg:text-base text-greyscale-700">Đã được quyên góp!</p>

            {!isHero ? (
              <Link href="/donation-charity" className="border border-[#3B82F6] hover:bg-[#3B82F6] hover:text-white transition-all duration-300 py-2 xl:py-4 px-5 rounded-full text-base font-semibold text-[#3B82F6] cursor-pointer">
               {data?.title_button}
              </Link>
            ) : (
              <KOLsDisplay />
            )}
          </div>
        </div>

        {/* Orbiting Circles */}
        {renderOrbitingItems(outerOrbitingConfig, isMobile ? 200 : isTablet ? 300 : 500)}
        {renderOrbitingItems(innerOrbitingConfig, isMobile ? 120 : isTablet ? 200 : 330, true, 30)}
      </div>

      <div className='lg:hidden'>
        {!isHero ? (
          <Link href="/donation-charity" className=" border border-[#3B82F6] hover:bg-[#3B82F6] hover:text-white transition-all duration-300 py-1 xl:py-4 px-5 rounded-full text-base font-semibold text-[#3B82F6] cursor-pointer">
            {data?.title_button}
          </Link>
        ) : (
          <KOLsDisplay />
        )}
      </div>
    </div>
  )
}

export default Donation
