'use client'

import UserMenu from '@/core/components/layout/menu/user-menu'
import { useLoading } from '@/core/hooks'
import { useAuth } from '@/modules/auth'
import NotifyButton from '@/modules/notification/components/popup/NotifyButton'
import { memo, useEffect } from 'react'
import { LogoLoading } from '../../brand'
import { Container } from '../../common'
import LanguageSwitcher from './LanguageSwitcher'
import ButtonOpenApp from './ButtonOpenApp'

const Header = () => {
  const { isLoading, startLoading, stopLoading } = useLoading()
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    startLoading()
    setTimeout(() => {
      stopLoading()
    }, 3000)
  }, [])

  return (
    <Container>
      <div className="flex justify-between items-center py-3">
        <UserMenu />
        <div className="absolute left-1/2 -translate-x-1/2">
          <LogoLoading isLoading={isLoading} size="md" href="/" />
        </div>
        <div className="flex items-center gap-2">
          <ButtonOpenApp />
          {isAuthenticated && <NotifyButton />}
          <LanguageSwitcher />
        </div>
      </div>
    </Container>
  )
}

export default memo(Header)
