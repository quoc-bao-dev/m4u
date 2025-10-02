'use client'

import { LeftContent } from '../left-content'
import { RightContent } from '../right-content'
import { useTranslations } from 'next-intl'

const Referral = () => {
  const t = useTranslations('Referral')
  return (
    <main className='h-full min-h-0 overflow-auto'>
      <div className="py-2">
        <h1 className="text-2xl font-bold pb-1">{t('title')}</h1>
      </div>
      <div className="flex flex-col xl:flex-row gap-5 max-w-7xl mx-auto pb-8">
        {/* Left Column */}
        <LeftContent />

        {/* Right Column */}
        <RightContent />
      </div>
    </main>
  )
}

export default Referral
