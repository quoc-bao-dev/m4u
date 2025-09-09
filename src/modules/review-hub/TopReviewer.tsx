'use client'
import Rating from '@/components/Rating'
import { IMAGES } from '@/core/constants/IMAGES'
import { useDevice } from '@/core/hooks'
import { MedalIcon, StarIcon } from '@phosphor-icons/react'
import Image from 'next/image'

const kols = [
  {
    name: 'MANYO',
    image: IMAGES.kol1,
    rating: 4.9,
    reviews: 69,
  },
  {
    name: 'MANYO',
    image: IMAGES.kol2,
    rating: 4.9,
    reviews: 69,
  },
  {
    name: 'MANYO',
    image: IMAGES.kol3,
    rating: 4.9,
    reviews: 69,
  },
  {
    name: 'MANYO',
    image: IMAGES.kol1,
    rating: 4.9,
    reviews: 69,
  },
  {
    name: 'MANYO',
    image: IMAGES.kol2,
    rating: 4.9,
    reviews: 69,
  },
  {
    name: 'MANYO',
    image: IMAGES.kol3,
    rating: 4.9,
    reviews: 69,
  },
]
const TopReviewer = () => {
  const { isMobile } = useDevice()
  return (
    <div className="relative px-3 p-6 lg:p-8 2xl:p-12 flex flex-col lg:flex-row gap-4 lg:gap-8 lg:rounded-3xl bg-yellow-100 w-full overflow-hidden">
      <MedalIcon
        weight="fill"
        className="hidden lg:block size-[350px] z-1 absolute top-0 right-0 translate-x-[40%] -translate-y-1/3 text-yellow-300"
      />
      <h2 className="lg:hidden text-center text-gradient-blue-black font-semibold text-lg leading-[100%] tracking-tight">
        Endorsed by top reviewers
      </h2>
      <Image
        src={IMAGES.topProduct}
        alt="top-reviewer"
        width={1000}
        height={1000}
        className="size-full lg:size-[380px] 2xl:size-[480px] object-cover rounded-3xl"
      />
      <div className="flex flex-col justify-end gap-4 2xl:gap-8 w-full min-w-0 z-10">
        <h2 className="hidden lg:block text-gradient-blue-black font-semibold xl:text-4xl 2xl:text-[40px] leading-[100%] tracking-tight">
          Endorsed by top reviewers
        </h2>
        <div className="flex gap-3">
          <span className="text-5xl lg:text-7xl xl:text-[96px]/[110%] font-semibold">
            🥇
          </span>
          <div className="flex flex-col gap-2 2xl:gap-3">
            <h3 className="text-xs md:text-xl font-bold text-greyscale-900">
              MANYO
            </h3>
            <p className="text-sm lg:text-3xl 2xl:text-[32px] lg:leading-[100%] text-greyscale-900">
              Panthetoin Deep Moisture Mask
            </p>
            <div className="flex items-center gap-3 xl:pt-2 2xl:pt-4">
              <Rating
                value={Number(4.0)}
                readOnly
                maxWidth={isMobile ? 116 : 136}
              />
              <p className="text-sm lg:text-2xl 2xl:text-[28px] leading-[80%] text-greyscale-500">
                <span className="text-greyscale-900 font-medium">4.0 </span>
                (69 reviews)
              </p>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="absolute z-[2] top-0 right-0 w-20 h-full bg-gradient-to-l from-yellow-100 to-transparent"></div>
          <div className="flex gap-3 lg:gap-4 overflow-x-scroll scroll-hidden flex-1 min-w-0">
            {kols.map((kol, index) => (
              <div className="relative" key={index}>
                <div className="absolute top-1 right-1 lg:top-3 lg:right-3 flex items-center gap-1 bg-white rounded-full py-0.5 px-1.5 text-xs xl:text-base 2xl:text-lg font-medium text-greyscale-900">
                  <StarIcon
                    weight="fill"
                    className="size-3 xl:size-5 text-yellow-600"
                  />
                  4.9
                </div>
                <Image
                  src={kol.image}
                  alt="kol"
                  width={1000}
                  height={1000}
                  className="size-[100px] lg:size-[160px] xl:size-[200px] 2xl:size-[250px] min-w-[100px] lg:min-w-[160px] xl:min-w-[200px] 2xl:min-w-[250px] object-cover rounded-lg lg:rounded-3xl flex-shrink-0 bg-[#DCE5E5]"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopReviewer
