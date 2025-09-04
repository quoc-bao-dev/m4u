'use client'

import { PropsWithChildren, useEffect, useState } from 'react'
import { Footer } from '../footer'
import { Header } from '../header'
import Concave from './Concave'

// Config object for scroll behavior
const SCROLL_CONFIG = {
  threshold: 10, // px
  backgroundClass: 'bg-white', // background when scrolled
  defaultClass: 'bg-transparent', // default background
  transitionClass: 'transition-all duration-200 ease-in-out', // smooth transition

  // Rounded corners config
  roundedCorners: {
    enabled: true, // enable/disable rounded corners effect
    maxRadius: 32, // maximum border radius in px
    minRadius: 0, // minimum border radius in px
    scrollRange: 100, // scroll range to reach max radius (px)
    corners: 'bottom-left bottom-right', // which corners to round
  },
}

const MainLayout = ({ children }: PropsWithChildren) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrollY(currentScrollY)
      setIsScrolled(currentScrollY > SCROLL_CONFIG.threshold)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Calculate corner radius based on scroll position
  const getCornerRadius = () => {
    if (!SCROLL_CONFIG.roundedCorners.enabled) return 0

    const { maxRadius, minRadius, scrollRange } = SCROLL_CONFIG.roundedCorners
    const progress = Math.min(scrollY / scrollRange, 1)
    return minRadius + (maxRadius - minRadius) * progress
  }

  const cornerRadius = getCornerRadius()

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
        style={
          {
            '--corner-radius': `${cornerRadius}px`,
          } as React.CSSProperties
        }
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
      <div className="relative z-10 bg-white pb-[30px] -mb-[200px] rounded-b-4xl">
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
