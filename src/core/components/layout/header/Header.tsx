'use client'

import { memo } from 'react'
import { Logo } from '../../brand'
import { Container } from '../../common'
import LanguageSwitcher from './LanguageSwitcher'
import UserMenu from '@/components/menu/user-menu'
import Link from 'next/link'

const Header = () => {
  return (
    <Container>
      <div className="flex justify-between items-center py-3">
        <UserMenu />
        <div className="absolute left-1/2 -translate-x-1/2">
          <Link href={'/vi'}> 
            <Logo className="size-[40px] md:size-[60px]" />
          </Link>
        </div>
        <LanguageSwitcher />
      </div>
    </Container>
  )
}

export default memo(Header)
