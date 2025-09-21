'use client'

import { useTranslations } from 'next-intl'
import UserGeneralForm from './UserGeneralForm'
import UserSecurityForm from './UserSecurityForm'

const UserInfo = () => {
  const t = useTranslations()

  return (
    <div>
      <div className="py-2">
        <h1 className="text-2xl font-bold">
          {t('personal.accountPreferences', {
            defaultValue: 'Account preferences',
          })}
        </h1>
      </div>
      <UserGeneralForm />
      <UserSecurityForm />
    </div>
  )
}

export default UserInfo
