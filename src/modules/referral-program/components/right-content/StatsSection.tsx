'use client'

import { useTranslations } from 'next-intl'

const StatsSection = () => {
  const t = useTranslations('Referral')
  return (
    <div className="flex justify-between items-stretch w-full">
      <div className="text-center  w-3/12 flex justify-start">
        <div className="">
          <div className="text-2xl font-bold text-gray-900">69</div>
          <div className="text-sm text-gray-600">{t('referrals')}</div>
        </div>
      </div>
      <div className="w-px bg-gray-200 mx-2"></div>
      <div className="text-center flex-1">
        <div className="">
          <div className="text-2xl font-bold text-gray-900">0 đ</div>
          <div className="text-sm text-gray-600">{t('commissionRevenue')}</div>
        </div>
      </div>
      <div className="w-px bg-gray-200 mx-2"></div>
      <div className="text-center w-3/12 flex justify-end">
        <div className="">
          <div className="text-2xl font-bold text-gray-900">88</div>
          <div className="text-sm text-gray-600">{t('friends')}</div>
        </div>
      </div>
    </div>
  )
}

export default StatsSection
