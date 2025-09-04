'use client'

import { PropsWithChildren, useLayoutEffect, useState } from 'react'
import { Footer } from '../footer'
import { Header } from '../header'
import Concave from './Concave'

// Config object for scroll behavior
const SCROLL_CONFIG = {
  threshold: 10, // px
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

      // Nếu là lần load đầu tiên, luôn hiện header và set lastScrollY
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
        // Chỉ enable hiệu ứng ẩn/hiện header khi scroll qua threshold
        // Nếu scroll xuống (scrollDifference > 0) và header đang hiện
        if (scrollDifference > 0 && isHeaderVisible) {
          setIsHeaderVisible(false)
        }
        // Nếu scroll lên (scrollDifference < 0) và header đang ẩn
        else if (scrollDifference < 0 && !isHeaderVisible) {
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
    <div className="relative min-h-screen overflow-x-hidden">
      <div
        className={`fixed top-0 left-0 right-0 z-50 bg-transparent ${
          SCROLL_CONFIG.headerTransitionClass
        } ${isHeaderVisible ? 'translate-y-0' : '-translate-y-full'}`}
      >
        {/* Background overlay với opacity đồng bộ với Concave */}
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

        {/* Concave với opacity đồng bộ với background overlay */}
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
