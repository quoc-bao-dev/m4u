'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

interface MaskRevealProps {
  children: React.ReactNode
  className?: string
  maskHeight?: number // Chiều cao của mask (default: 50% viewport height)
  direction?: 'top' | 'bottom' // Hướng reveal
  smoothness?: number // Độ mượt của transition (0-1)
  maskColor?: string // Màu của mask
  start?: string // Điểm bắt đầu trigger
  end?: string // Điểm kết thúc trigger
  onReveal?: (progress: number) => void // Callback khi reveal
}

const MaskReveal: React.FC<MaskRevealProps> = ({
  children,
  className = '',
  maskHeight = 50, // 50% viewport height
  direction = 'top',
  smoothness = 0.1,
  maskColor = 'white',
  start = 'top bottom',
  end = 'bottom top',
  onReveal,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const maskRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const mask = maskRef.current

    if (!container || !mask) return

    // Set initial mask position
    const initialMaskStyle =
      direction === 'top'
        ? {
            top: `${maskHeight}%`,
            bottom: 'auto',
            height: `${100 - maskHeight}%`,
          }
        : {
            bottom: `${maskHeight}%`,
            top: 'auto',
            height: `${100 - maskHeight}%`,
          }

    gsap.set(mask, initialMaskStyle)

    // Create ScrollTrigger
    const scrollTrigger = ScrollTrigger.create({
      trigger: container,
      start,
      end,
      scrub: smoothness,
      onUpdate: (self) => {
        const progress = self.progress
        const revealHeight = progress * (100 - maskHeight)

        if (direction === 'top') {
          gsap.set(mask, {
            top: `${maskHeight + revealHeight}%`,
            height: `${100 - maskHeight - revealHeight}%`,
          })
        } else {
          gsap.set(mask, {
            bottom: `${maskHeight + revealHeight}%`,
            height: `${100 - maskHeight - revealHeight}%`,
          })
        }

        onReveal?.(progress)
      },
    })

    // Cleanup
    return () => {
      scrollTrigger.kill()
    }
  }, [maskHeight, direction, smoothness, maskColor, start, end, onReveal])

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {/* Content */}
      <div className="relative z-10">{children}</div>

      {/* Mask */}
      <div
        ref={maskRef}
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          background: maskColor,
        }}
      />
    </div>
  )
}

export default MaskReveal
