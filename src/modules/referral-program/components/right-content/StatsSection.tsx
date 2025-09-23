'use client'

import { useAuth } from '@/modules/auth'
import { useReferralIntroduceInfoQuery } from '@/services/referral-program'
import { useTranslations } from 'next-intl'

const StatsSection = () => {
  const t = useTranslations()
  const { data } = useReferralIntroduceInfoQuery()
  return (
    <div className="flex justify-between items-stretch w-full">
      <div className="text-center  w-3/12 flex justify-start">
        <div className="">
          <div className="text-2xl font-bold text-gray-900">
            {data?.guest || 0}
          </div>
          <div className="text-sm text-gray-600">
            {t('menu.auth.stats.referrals')}
          </div>
        </div>
      </div>
      <div className="w-px bg-gray-200 mx-2"></div>
      <div className="text-center flex-1">
        <div className="">
          <div className="text-2xl font-bold text-gray-900">0 ₫</div>
          <div className="text-sm text-gray-600">
            {t('menu.auth.stats.commissionRevenue')}
          </div>
        </div>
      </div>
      <div className="w-px bg-gray-200 mx-2"></div>
      <div className="text-center w-3/12 flex justify-end">
        <div className="">
          <div className="text-2xl font-bold text-gray-900">
            {data?.review || 0}
          </div>
          <div className="text-sm text-gray-600">
            {t('menu.auth.stats.reviews')}
          </div>
        </div>
      </div>
    </div>
  )
}

export default StatsSection
