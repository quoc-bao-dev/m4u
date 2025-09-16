'use client'
import { PropsWithChildren } from 'react'
import Image from 'next/image'
import { IMAGES } from '@/core/constants/IMAGES'

type EventFrameProps = PropsWithChildren<{
  className?: string
}>

const EventFrame = ({ children, className }: EventFrameProps) => {
  return (
    <div
      className={`relative p-1 lg:p-2 bg-pink-300 rounded-xl ${
        className ?? ''
      }`}
    >
      <div
        className="relative bg-pink-300 rounded-lg w-full aspect-[56/30]"
        style={{
          WebkitMaskImage: 'url(/image/donation/mask.png)',
          maskImage: 'url(/image/donation/mask.png)',
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
          WebkitMaskSize: 'contain',
          maskSize: 'contain',
          WebkitMaskPosition: 'center',
          maskPosition: 'center',
        }}
      >
        {children}
      </div>
      <Image
        src={IMAGES.logo}
        alt="mask"
        width={80}
        height={80}
        className="p-1.5 lg:p-3 2xl:p-4 absolute right-0 bottom-0 w-[14%] aspect-square object-cover"
      />
    </div>
  )
}

export default EventFrame
