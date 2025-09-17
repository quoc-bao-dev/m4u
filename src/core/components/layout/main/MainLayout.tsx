'use client'

import { PropsWithChildren, useLayoutEffect, useState } from 'react'
import { Footer } from '../footer'
import { Header } from '../header'
import Concave from './Concave'
import CartIcon from '@/modules/trial-registration/components/cart/CartIcon'

// Config object for scroll behavior
const SCROLL_CONFIG = {
  threshold: 0, // px
  headerHideThreshold: 100, // px - threshold để enable hiệu ứng ẩn/hiện header
  backgroundOverlayClass: 'bg-white', // background overlay color
  transitionClass: 'transition-all duration-200 ease-in-out', // smooth transition
  headerTransitionClass: 'transition-transform duration-300 ease-in-out', // smooth transition for header slide
}

const MainLayout = ({ children }: PropsWithChildren) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isInitialLoad, setIsInitialLoad] = useState(true)

  useLayoutEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const scrollDifference = currentScrollY - lastScrollY

      // Cập nhật background khi scroll
      setIsScrolled(currentScrollY > SCROLL_CONFIG.threshold)

      // Nếu là lần load đầu tiên
      if (isInitialLoad) {
        setIsHeaderVisible(true)
        setLastScrollY(currentScrollY)
        setIsInitialLoad(false)
        return
      }

      // Khi ở đầu trang, luôn hiện header
      if (currentScrollY <= SCROLL_CONFIG.headerHideThreshold) {
        setIsHeaderVisible(true)
      } else {
        if (scrollDifference > 0 && isHeaderVisible) {
          setIsHeaderVisible(false)
        } else if (scrollDifference < 0 && !isHeaderVisible) {
          setIsHeaderVisible(true)
        }
      }

      setLastScrollY(currentScrollY)
    }

    handleScroll()

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY, isHeaderVisible, isInitialLoad])

  return (
    <div className="">
      <div className="relative min-h-screen">
        {/* Header */}
        <div
          className={`fixed top-0 left-0 right-0 z-50 bg-transparent ${
            SCROLL_CONFIG.headerTransitionClass
          } ${isHeaderVisible ? 'translate-y-0' : '-translate-y-[190%]'}`}
        >
          <div
            className={`absolute inset-0 ${
              SCROLL_CONFIG.backgroundOverlayClass
            } transition-opacity duration-200 ease-in-out ${
              isScrolled ? 'opacity-100' : 'opacity-0'
            }`}
          />
          <div className="relative z-50">
            <Header />
          </div>
          <div
            className={`w-full transition-opacity duration-200 ease-in-out ${
              isScrolled ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Concave />
          </div>
        </div>

        {/* Content with overlap capability */}
        <main className="relative z-20 bg-gray-50 -bg-white min-h-screen rounded-b-4xl">
          {children}
        </main>

        {/* Sticky footer with content overlap */}
        <div className="sticky bottom-0 left-0 right-0 z-10 -mt-[100px]">
          <Footer />
        </div>

        {/* Cart Icon - Fixed position */}
        <CartIcon />
      </div>
    </div>
  )
}

export default MainLayout
