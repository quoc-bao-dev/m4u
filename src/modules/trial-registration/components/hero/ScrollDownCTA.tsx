'use client'
import { useEffect, useState } from 'react'

type ScrollDownCTAProps = {
  label?: string
}

const ScrollDownCTA = ({ label = 'Xem ngay' }: ScrollDownCTAProps) => {
  const [isVisible, setIsVisible] = useState(true)

  const scrollDown = () => {
    const nextPosition = window.scrollY + Math.min(window.innerHeight, 800)
    window.scrollTo({ top: nextPosition, behavior: 'smooth' })
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY < 40)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="fixed bottom-4 left-1/2 translate-x-[-50%] md:translate-x-0 md:bottom-6 md:left-16 z-50">
      <button
        onClick={scrollDown}
        className={`text-gray-500 md:text-xl rounded-full hover:bg-gray-700 active:scale-[0.98] transition duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-label={label}
      >
        {label}
      </button>

      <div
        onClick={scrollDown}
        className={`relative z-40 flex flex-col items-center md:items-start -gap-4 cursor-pointer transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden
      >
        <svg
          className="animate-scroll-chevron size-4 md:size-[24px]"
          style={{ animationDelay: '0s' }}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="rgb(55 65 81 / 0.8)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <svg
          className="animate-scroll-chevron size-4 md:size-[24px]"
          style={{ animationDelay: '0.2s' }}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="rgb(156 163 175 / 0.6)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <svg
          className="animate-scroll-chevron size-4 md:size-[24px]"
          style={{ animationDelay: '0.4s' }}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="rgb(55 65 81 / 0.8)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  )
}

export default ScrollDownCTA
