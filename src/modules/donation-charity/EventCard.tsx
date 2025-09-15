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
    <div className='flex flex-col gap-4 shadow-[0px_4px_10px_0px_#00000040] rounded-xl pb-4'>
      <div className='relative p-2 bg-pink-300 rounded-xl'>
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
        <Image src={IMAGES.logo} alt='mask' width={80} height={80} className='p-3 2xl:p-4 absolute right-0 bottom-0 size-14 2xl:size-20 object-cover' />
      </div>
      <div className='px-4 flex flex-col gap-4'>
        <div className='flex items-center justify-between gap-4'>
          <div className={`flex items-center gap-1 rounded-full py-2 px-3 ${cfg.className}`}>
            {cfg.showIcon && <BroadcastIcon className='text-white' />}
            <span className='text-xs font-medium text-white'>
              {cfg.label}
            </span>
          </div>
          <p className='text-base font-normal text-greyscale-700'>{date}</p>
        </div>
        <h4 className='text-2xl font-bold text-greyscale-900'>{title}</h4>
        <div className='flex items-center gap-3'>
          <div className='flex items-center justify-center p-3 rounded-full bg-greyscale-800'>
            <Image src="/image/donation/logoWhite.png" alt='icon' width={28} height={28} />
          </div>
          <p className='text-base font-medium text-greyscale-700'>M4U charity fund</p>
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <div className='flex flex-col gap-1'>
            <p className='text-sm font-normal text-greyscale-700'>Total products</p>
            <p className='text-2xl font-semibold text-orange-500'>{productCount}</p>
          </div>
          <div className='flex flex-col gap-1'>
            <p className='text-sm font-normal text-greyscale-700'>Total funds converted</p>
            <p className='text-2xl font-semibold text-orange-500'>{fundAmount}
              <span className='text-sm underline'>đ</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventCard


