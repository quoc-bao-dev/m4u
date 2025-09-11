'use client'
import * as React from 'react'
import Image, { type StaticImageData } from 'next/image'
import { CaretRightIcon, StarIcon } from '@phosphor-icons/react'
import { Loading } from '@/core/components/common/loading'

export type KOLCardProps = {
  image: StaticImageData | string
  avatar: StaticImageData | string
  name: string
  rating: number | string
  reviews: number | string
  onClick?: () => void
}

export const KOLCard: React.FC<KOLCardProps> = ({
  image,
  avatar,
  name,
  rating,
  reviews,
  onClick,
}) => {
  const [isLoading, setIsLoading] = React.useState(true)
  const videoRef = React.useRef<HTMLVideoElement | null>(null)

  const handleMouseEnter = () => {
    void videoRef.current?.play()
  }

  const handleMouseLeave = () => {
    videoRef.current?.pause()
  }

  setTimeout(() => {
    setIsLoading(false)
  }, 3000)

  return (
    <div className="shadow-[0px_4px_24px_0px_#0000000F] rounded-3xl">
      <button
        type="button"
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="overflow-hidden rounded-3xl relative w-full text-left focus:outline-none cursor-pointer group"
      >
        <div className="absolute top-3 left-3 size-9 rounded-full bg-black/50 flex items-center justify-center">
          <CaretRightIcon weight="fill" className="size-5 text-white" />
        </div>
        {isLoading ? (
          <Loading className="w-full object-cover aspect-[410/342]" />
        ) : (
          <video
            src={image as string}
            ref={videoRef}
            muted
            loop
            playsInline
            width={1000}
            height={1000}
            className="w-full object-cover aspect-[410/342]"
          />
        )}

        <div className="2xl:p-5 p-4 bg-orange-100 flex gap-3 items-center justify-between">
          <Image
            src={avatar}
            alt="avatar"
            width={1000}
            height={1000}
            className="size-10 lg:size-12 rounded-full object-cover bg-[#D5DEDA]"
          />
          <div className="flex flex-col flex-1">
            <h3 className="2xl:text-lg text-base font-bold text-greyscale-900 group-hover:text-orange-600 transition-colors">
              {name}
            </h3>
            <p className="2xl:text-sm text-sm font-normal text-greyscale-900">
              {reviews} views
            </p>
          </div>
          <div className="py-0.5 px-1 lg:p-2 h-fit flex items-center gap-1 lg:gap-2 bg-white rounded-full">
            <StarIcon
              weight="fill"
              className="size-4 xl:size-5 text-yellow-600"
            />
            <span className="text-sm xl:text-base 2xl:text-lg font-medium text-greyscale-900">
              {rating}
            </span>
          </div>
        </div>
      </button>
    </div>
  )
}
