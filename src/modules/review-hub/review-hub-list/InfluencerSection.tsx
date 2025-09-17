'use client'

import Button from '@/core/components/ui/button'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

const Influencer = () => {
  const t = useTranslations('reviewHub.influencer')
  return (
    <div className="w-full flex flex-col md:flex-row items-center gap-6 xl:gap-10 rounded-3xl bg-[#FFFAED] pb-10 md:pb-0">
      {/* Left: Image */}
      <div className="relative w-full md:w-1/2 aspect-[845/600] overflow-hidden rounded-3xl">
        <Image
          src="/image/influencer/image-01.png"
          alt="influencer"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Right: Content */}
      <div className="w-full md:flex-1 flex flex-col gap-2 lg:gap-4 text-left px-3 md:px-0">
        <h2 className="text-[24px] lg:text-[40px] 2xl:text-[64px] font-bold leading-tight text-[#0F172A]">
          <span className="text-gray-400">{t('titleLead')}</span>{' '}
          <br className="hidden xl:block" />
          {t('titleEnd')}
        </h2>
        <p className="text-gray-600 text-base lg:text-lg">{t('subtitle')}</p>
        <Button>{t('cta')}</Button>
      </div>
    </div>
  )
}

export default Influencer
