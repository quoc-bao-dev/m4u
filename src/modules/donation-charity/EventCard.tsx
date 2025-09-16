'use client'
import Image from 'next/image'
import { BroadcastIcon } from '@phosphor-icons/react'
import { IMAGES } from '@/core/constants/IMAGES'

type EventCardProps = {
  status: 'happening' | 'coming';
  date: string;
  title: string;
  productCount: number | string;
  fundAmount: string;
  imageSrc: string;
}

const statusConfig: Record<EventCardProps['status'], { label: string; className: string; showIcon?: boolean }> = {
  happening: { label: 'Happening', className: 'bg-red-600', showIcon: true },
  coming: { label: 'Coming soon', className: 'bg-[#2DD4BF]', showIcon: false },
}

const EventCard = ({ status, date, title, productCount, fundAmount, imageSrc }: EventCardProps) => {
  const cfg = statusConfig[status]
  return (
    <div className='group flex flex-col gap-2 xl:gap-4 shadow-[0px_4px_10px_0px_#00000040] hover:shadow-xl transition-all duration-300 rounded-xl pb-2 xl:pb-4 cursor-pointer'>
      <div className='relative p-1 lg:p-2 bg-pink-300 rounded-xl'>
        <div
          className='relative bg-pink-300 rounded-lg w-full aspect-[56/30]'
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
          <Image src={imageSrc} alt='event' width={300} height={240} className='absolute inset-0 w-full h-full object-cover' />
        </div>
        <Image src={IMAGES.logo} alt='mask' width={80} height={80} className='p-1.5 lg:p-3 2xl:p-4 absolute right-0 bottom-0 w-[14%] aspect-square object-cover' />
      </div>
      <div className='px-2 xl:px-4 flex flex-col gap-4'>
        <div className='flex items-center justify-between gap-4'>
          <div className={`flex items-center gap-1 rounded-full py-1 lg:py-2 px-2 lg:px-3 ${cfg.className}`}>
            {cfg.showIcon && <BroadcastIcon className='text-white size-3 lg:size-4' />}
            <span className='text-xs font-medium text-white'>
              {cfg.label}
            </span>
          </div>
          <p className='text-xs lg:text-base font-normal text-greyscale-700'>{date}</p>
        </div>
        <h4 className='text-base lg:text-2xl font-bold text-greyscale-900 group-hover:text-pink-500 transition-all duration-300'>{title}</h4>
        <div className='flex items-center gap-3'>
          <div className='flex items-center justify-center p-1.5 lg:p-3 rounded-full bg-greyscale-800'>
            <Image src="/image/donation/logoWhite.png" alt='icon' width={28} height={28} className='size-4 xl:size-7'/>
          </div>
          <p className='text-sm lg:text-base font-medium text-greyscale-700'>M4U charity fund</p>
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <div className='flex flex-col gap-1'>
            <p className='text-[10px] lg:text-sm font-normal text-greyscale-700'>Total products</p>
            <p className='text-sm lg:text-2xl font-semibold text-orange-500'>{productCount}</p>
          </div>
          <div className='flex flex-col gap-1'>
            <p className='text-[10px] lg:text-sm font-normal text-greyscale-700'>Total funds converted</p>
            <p className='text-sm lg:text-2xl font-semibold text-orange-500'>{fundAmount}
              <span className='text-sm underline'>đ</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventCard


