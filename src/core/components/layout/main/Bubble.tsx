'use client'

import ChatBot from '@/modules/chat-bot/components/ChatBot'
import CartIcon from '@/modules/trial-registration/components/cart/CartIcon'
import { usePathname } from 'next/navigation'

const Bubble = () => {
  const pathname = usePathname()

  const includePath = ['/trial-registration', '/product']
  const isIncludePath = includePath.some((path) => pathname.includes(path))

  return <div>{isIncludePath ? <CartIcon /> : <ChatBot />}</div>
}

export default Bubble
