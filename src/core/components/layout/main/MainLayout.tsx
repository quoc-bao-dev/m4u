'use client'

import { PropsWithChildren, useLayoutEffect, useState } from 'react'
import { Footer } from '../footer'
import { Header } from '../header'
import Concave from './Concave'

// Config object for scroll behavior
const SCROLL_CONFIG = {
  threshold: 10, // px
  backgroundClass: 'bg-white', // background when scrolled
  defaultClass: 'bg-transparent', // default background
  transitionClass: 'transition-all duration-200 ease-in-out', // smooth transition
}

const MainLayout = ({ children }: PropsWithChildren) => {
  const [isScrolled, setIsScrolled] = useState(false)

  useLayoutEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsScrolled(currentScrollY > SCROLL_CONFIG.threshold)
    }

    handleScroll()

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div
        className={`fixed top-0 left-0 right-0 z-50 ${
          SCROLL_CONFIG.transitionClass
        } ${
          isScrolled
            ? SCROLL_CONFIG.backgroundClass
            : SCROLL_CONFIG.defaultClass
        }`}
      >
        <div className="relative z-50">
          <Header />
        </div>

        {/* điều chỉnh theo config ở đây */}
        <div
          className={`w-full transition-opacity duration-200 ease-in-out ${
            isScrolled ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Concave />
        </div>
      </div>
      <div className="relative z-10 bg-gray-100 pb-[30px] -mb-[200px] rounded-b-4xl">
        {children}
      </div>
      <Footer className="pt-[200px]" />

      <div className="fixed bottom-0 left-0 right-0">
        <Footer className="pt-[200px]" />
      </div>
    </div>
  )
}

export default MainLayout
