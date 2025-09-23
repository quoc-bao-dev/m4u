'use client'
import { CaretRightIcon, StarIcon } from '@phosphor-icons/react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import * as React from 'react'

export type KOLCardProps = {
  data: any
  onClick?: () => void
}

export const KOLCard: React.FC<KOLCardProps> = ({
  data,
  onClick,
}) => {
  const videoRef = React.useRef<HTMLVideoElement | null>(null)
  const tProduct = useTranslations('product')

  const handleMouseEnter = () => {
    void videoRef.current?.play()
  }

  const handleMouseLeave = () => {
    videoRef.current?.pause()
  }

  return (
    <div className="shadow-[0px_4px_24px_0px_#0000000F] rounded-2xl xl:rounded-3xl">
      <button
        type="button"
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="overflow-hidden rounded-2xl xl:rounded-3xl relative w-full text-left focus:outline-none cursor-pointer group"
      >
        <div className="absolute top-3 left-3 size-9 rounded-full bg-black/50 flex items-center justify-center">
          <CaretRightIcon weight="fill" className="size-5 text-white" />
        </div>

        <video
          src={data?.video_review as string}
          ref={videoRef}
          muted
          loop
          playsInline
          width={1000}
          height={1000}
          className="w-full object-cover aspect-[410/342]"
        />

        <div className="2xl:p-5 p-3 bg-orange-100 flex gap-3 items-center justify-between">
          <Image
            src={data?.client?.avatar || '/image/avatar/image-01.png'}
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = '/image/avatar/image-01.png'
            }}
            alt="avatar"
            width={1000}
            height={1000}
            className="size-10 lg:size-12 rounded-full object-cover bg-[#D5DEDA]"
          />
          <div className="flex flex-col flex-1">
            <h3 className="2xl:text-lg text-base font-bold text-greyscale-900 group-hover:text-orange-600 transition-colors">
              {data?.client?.fullname}
            </h3>
            <p className="2xl:text-sm text-sm font-normal text-greyscale-900">
              {100} {tProduct('views')}
            </p>
          </div>
          <div className="absolute top-2 right-2 md:static py-0.5 px-1 lg:px-2 h-fit flex items-center gap-1 lg:gap-2 bg-white rounded-full">
            <StarIcon
              weight="fill"
              className="size-4 xl:size-5 text-yellow-600"
            />
            <span className="text-sm xl:text-base 2xl:text-lg font-medium text-greyscale-900">
              {data?.evaluate.toFixed(1)}
            </span>
          </div>
        </div>
      </button>
    </div>
  )
}
