
'use client'

import { memo, useEffect } from 'react'
import { LogoLoading } from '../../brand'
import { Container } from '../../common'
import LanguageSwitcher from './LanguageSwitcher'
import UserMenu from '@/core/components/layout/menu/user-menu'
import { useLoading } from '@/core/hooks'

const Header = () => {
  const { isLoading, startLoading, stopLoading } = useLoading()
 
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
          <LogoLoading 
            isLoading={isLoading}
            size="md"
            href="/vi"
          />
        </div>
        <LanguageSwitcher />
      </div>
    </Container>
  )
}

export default memo(Header)
