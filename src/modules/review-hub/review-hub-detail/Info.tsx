'use client'
import Rating from '@/components/Rating'
import Button from '@/core/components/ui/button'
import { IMAGES } from '@/core/constants/IMAGES'
import { useDevice } from '@/core/hooks'
import Image from 'next/image'

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
  const { isMobile } = useDevice()

  return (
    <div className="p-12 bg-yellow-100 flex gap-8 rounded-3xl w-full">
      <div className="flex gap-3 h-[350px] flex-shrink-0">
        <div className="flex flex-col gap-3 overflow-y-auto scroll-hidden w-fit flex-shrink-0">
          <Image
            src={IMAGES.topProduct}
            alt="top-reviewer"
            width={1000}
            height={1000}
            className="size-30 rounded-2xl object-cover"
          />
          <Image
            src={IMAGES.topProduct}
            alt="top-reviewer"
            width={1000}
            height={1000}
            className="size-30 rounded-2xl object-cover"
          />
          <Image
            src={IMAGES.topProduct}
            alt="top-reviewer"
            width={1000}
            height={1000}
            className="size-30 rounded-2xl object-cover"
          />
        </div>
        <div className="size-[350px] flex-shrink-0">
          <Image
            src={IMAGES.topProduct}
            alt="top-reviewer"
            width={1000}
            height={1000}
            className="size-full rounded-2xl object-cover"
          />
        </div>
      </div>
      <div className="flex flex-col gap-3 justify-between flex-1">
        <div className="flex flex-col gap-3 w-full">
          <h2 className="text-xl font-bold text-greyscale-900">MANYO</h2>
          <h3 className="text-[32px] leading-[100%] font-normal text-greyscale-900">
            Panthetoin Deep Moisture Mask
          </h3>
          <div className="flex gap-3 justify-between w-full">
            <div className="flex items-center gap-3">
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
            <div className=" flex items-center gap-1.5">
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
        <div className="flex gap-3 justify-between items-center w-full">
          <div className="flex flex-col gap-1">
            <h4 className="text-2xl font-bold text-[#F5222D]">
              ⚡ Only 88 slots left
            </h4>
            <p className="text-xl text-greyscale-600">
              <span className="text-greyscale-900 font-bold">69 users</span>{' '}
              enrolled in the product&apos;s trial program
            </p>
          </div>
          <div className="flex -space-x-4">
            {kols.slice(0, 5).map((kol, index) => (
              <Image
                key={`${kol.id}-${index}`}
                src={kol.image}
                alt="top-reviewer"
                width={1000}
                height={1000}
                className="flex-shrink-0 2xlsize-16 size-14 rounded-full object-cover border-2 border-white bg-[#D5DEDA]"
              />
            ))}
            {kols.length > 5 && (
              <div className="flex-shrink-0 2xl:size-16 size-14 rounded-full object-cover border-2 border-white bg-black flex items-center justify-center text-white text-base font-semibold">
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
