'use client'

import gsap from 'gsap'
import React from 'react'

type RewardCardProps = {
  icon: React.ReactNode
  label: string
  title: string
  bgColor: string
  iconColor: string
  isActive?: boolean
  isDimmed?: boolean
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

const RewardCard: React.FC<RewardCardProps> = ({
  icon,
  label,
  title,
  bgColor,
  iconColor,
  isActive = false,
  isDimmed = false,
  onMouseEnter,
  onMouseLeave,
}) => {
  const containerRef = React.useRef<HTMLDivElement | null>(null)
  const iconRef = React.useRef<HTMLDivElement | null>(null)

  // Animate scale when active/dimmed changes
  React.useEffect(() => {
    const targetScale = isActive ? 1.05 : isDimmed ? 0.95 : 1
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        scale: targetScale,
        rotate: 0,
        duration: 0.35,
        ease: 'power3.out',
      })
    }
  }, [isActive, isDimmed])

  const handleMouseEnter = () => {
    if (containerRef.current) {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.to(containerRef.current, {
        scale: '+=0.03',
        y: -4,
        rotate: -2,
        boxShadow: '0 12px 30px rgba(0,0,0,0.08)',
        duration: 0.22,
      }).to(containerRef.current, { y: 0, duration: 0.18 })
    }
    if (iconRef.current) {
      gsap.fromTo(
        iconRef.current,
        { y: 0, rotate: 0 },
        {
          y: -6,
          rotate: -6,
          yoyo: true,
          repeat: 1,
          duration: 0.24,
          ease: 'power2.out',
        }
      )
    }
    onMouseEnter?.()
  }

  const handleMouseLeave = () => {
    const baseScale = isActive ? 1.05 : isDimmed ? 0.95 : 1
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        scale: baseScale,
        y: 0,
        rotate: 0,
        boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
        duration: 0.25,
        ease: 'power2.out',
      })
    }
    onMouseLeave?.()
  }

  return (
    <div
      ref={containerRef}
      className={`relative rounded-[40px] ${bgColor} p-6 md:p-8 w-full md:w-[360px] shadow-sm`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={iconRef}
        className={`h-16 w-16 rounded-full flex items-center justify-center bg-white/80 ${iconColor} text-2xl shadow`}
      >
        {icon}
      </div>
      <div className="mt-6">
        <p className="text-gray-700 text-xl md:text-2xl font-medium">{label}</p>
        <h3 className="text-gray-900 text-4xl md:text-5xl font-extrabold mt-2">
          {title}
        </h3>
      </div>
    </div>
  )
}

export default RewardCard
