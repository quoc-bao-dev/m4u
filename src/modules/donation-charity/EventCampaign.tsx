'use client'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import ProductCarouselEmbla from './ProductCarouselEmbla'
import { IMAGES } from '@/core/constants/IMAGES'
import EventCarouselEmbla from './EventCarouselEmbla'

const Line = ({ className }: { className?: string }) => {
  const t = useTranslations('donationCharity.eventCampaign')
  return (
    <svg
      viewBox="0 0 18 308"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M9 0.873047C4.58172 0.873047 1 4.45477 1 8.87305C1 13.2913 4.58172 16.873 9 16.873C13.4183 16.873 17 13.2913 17 8.87305C17 4.45477 13.4183 0.873047 9 0.873047ZM8.99999 307.873L17.6602 292.873L0.339733 292.873L8.99999 307.873ZM9 8.87305L7.5 8.87305L7.49999 294.373L8.99999 294.373L10.5 294.373L10.5 8.87305L9 8.87305Z"
        fill="#D1D5DB"
      />
    </svg>
  )
}

const EventCampaign = () => {
  const t = useTranslations('donationCharity.eventCampaign')
  return (
    <div className="py-8 xl:py-24 pl-3 md:pl-0 flex flex-col items-center justify-center w-full">
      <div className="flex flex-col items-center justify-center gap-4 container-custom">
        <h2 className="pr-3 md:pr-0 text-2xl xl:text-6xl font-bold text-greyscale-400">
          <span className="text-gradient-blue-black">{t('titleLead')}</span>
          {t('titleEnd')}
        </h2>
        <p className="pr-3 md:pr-0 text-base xl:text-2xl text-greyscale-700 text-center max-w-6xl">
          {t('desc')}
        </p>
      </div>
      <div className="flex flex-col md:pl-6 lg:pl-12 xl:pl-24 w-full">
        <ProductCarouselEmbla />
        <div className="relative">
          <div className="ml-[75px] lg:ml-[136px]">
            <Line className="h-[120px] lg:h-[200px] xl:h-[300px]" />
          </div>
          <Image
            src={IMAGES.speaker}
            alt="speaker"
            width={300}
            height={240}
            className="absolute w-[150px] lg:w-[200px] xl:w-[300px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        </div>
        <div className="container-custom !pl-0">
          <EventCarouselEmbla />
        </div>
      </div>
    </div>
  )
}

export default EventCampaign
