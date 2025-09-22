'use client'

import { useReferralIntroduceInfoQuery } from '@/services/referral-program'
import React, { useMemo } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import moment from 'moment'
import { NoData } from '@/modules/trial-registration'
import { useTranslations } from 'next-intl'
import UserAvatar from '@/core/components/UserAvatar'

const getInitials = (name: string) => {
  if (!name) return ''
  const parts = name.trim().split(/\s+/)
  const first = parts[0]?.[0] ?? ''
  const last = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? '' : ''
  return (first + last).toUpperCase()
}
const ReferralUsers = () => {
  const t = useTranslations('Referral')
  const { data, isLoading } = useReferralIntroduceInfoQuery()
  const listUser = data?.data.data
  const mappedUsers = useMemo(
    () =>
      (listUser ?? []).map((u) => ({
        id: u.id,
        name: u.fullname,
        sub: moment(u.birthday).format('DD/MM/YYYY'),
        initials: getInitials(u.fullname),
      })),
    [listUser]
  )

  return (
    <div className="space-y-4 xl:max-h-full overflow-y-auto">
      {isLoading ? (
        Array.from({ length: 6 }).map((_, idx) => (
          <div key={idx} className="flex items-center justify-between pr-0 ">
            <div className="flex items-center space-x-3">
              <Skeleton className="w-10 h-10 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
            <Skeleton className="h-4 w-12" />
          </div>
        ))
      ) : mappedUsers.length === 0 ? (
        <div className="py-8">
          <NoData title={t('noData.title')} description={t('noData.desc')} />
        </div>
      ) : (
        mappedUsers.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between pr-0 "
          >
            <div className="flex items-center space-x-3">
              <UserAvatar userName={user.name} size={40} />
              <div>
                <div className="text-gray-900 text-base font-medium">
                  {user.name}
                </div>
                <div className="text-gray-600 text-sm">{user.sub}</div>
              </div>
            </div>
            <div className="text-blue-400 text-base font-medium">- ₫</div>
          </div>
        ))
      )}
    </div>
  )
}

export default ReferralUsers
