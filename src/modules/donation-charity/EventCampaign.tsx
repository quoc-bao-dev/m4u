'use client'
import Image from 'next/image'
import ProductCarouselEmbla from './ProductCarouselEmbla'
import { IMAGES } from '@/core/constants/IMAGES'
import EventCard from './EventCard'

const Line = () => {
  return (
    <svg width="18" height="308" viewBox="0 0 18 308" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9 0.873047C4.58172 0.873047 1 4.45477 1 8.87305C1 13.2913 4.58172 16.873 9 16.873C13.4183 16.873 17 13.2913 17 8.87305C17 4.45477 13.4183 0.873047 9 0.873047ZM8.99999 307.873L17.6602 292.873L0.339733 292.873L8.99999 307.873ZM9 8.87305L7.5 8.87305L7.49999 294.373L8.99999 294.373L10.5 294.373L10.5 8.87305L9 8.87305Z"
        fill="#D1D5DB" />
    </svg>
  )
}

const EventCampaign = () => {
  return (
    <div className='py-24 flex flex-col items-center justify-center gap-10 w-full'>
      <div className='flex flex-col items-center justify-center gap-4 container-custom'>
        <h2 className='text-6xl font-bold text-greyscale-400'><span className='text-gradient-blue-black'>
          Your Glow,
        </span>
          Her Growth</h2>
        <p className='text-2xl text-greyscale-700 text-center max-w-6xl'>Each product contributes 5% to volunteer campaigns that uplift single moms—funding daily needs and skills programs. When you try & review, you help twice.</p>
      </div>
      <div className='flex flex-col pl-24 w-full'>
        <ProductCarouselEmbla />
        <div className='relative'>
          <div className='ml-[198px]'>
            <Line />
          </div>
          <Image src={IMAGES.speaker} alt='speaker' width={300} height={240} className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' />
        </div>
        <div className='container-custom !pl-0 grid grid-cols-3 items-center justify-center gap-6'>
          <EventCard
            status='happening'
            date='06/09/2025'
            title='Livelihood assistance for single mothers in underserved communities.'
            productCount={69}
            fundAmount={'1,234,567'}
            imageSrc='/image/donation/event.jpg'
          />
          <EventCard
            status='coming'
            date='06/09/2025'
            title='Livelihood assistance for single mothers in underserved communities.'
            productCount={69}
            fundAmount={'1,234,567'}
            imageSrc='/image/donation/event1.jpg'
          />
           <EventCard
            status='coming'
            date='06/09/2025'
            title='Livelihood assistance for single mothers in underserved communities.'
            productCount={69}
            fundAmount={'1,234,567'}
            imageSrc='/image/donation/event2.jpg'
          />
        </div>
      </div>
    </div>
  )
}

export default EventCampaign
