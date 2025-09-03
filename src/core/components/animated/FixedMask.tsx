'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

interface FixedMaskProps {
  children: React.ReactNode
  className?: string
  maskColor?: string // Màu của mask
  threshold?: number // Vị trí ranh giới (default: 50% viewport height)
  smoothness?: number // Độ mượt của transition
  fadeEdge?: number // Độ dài fade edge ở ranh giới (default: 0 - không có fade)
}

const FixedMask: React.FC<FixedMaskProps> = ({
  children,
  className = '',
  maskColor = 'white',
  threshold = 50, // 50% viewport height
  smoothness = 0.1,
  fadeEdge = 0, // 0 = không có fade, > 0 = có fade edge
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const maskRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const mask = maskRef.current

    if (!container || !mask) return

    // Create ScrollTrigger to update mask based on container position
    const scrollTrigger = ScrollTrigger.create({
      trigger: container,
      start: 'top bottom',
      end: 'bottom top',
      scrub: smoothness,
      onUpdate: (self) => {
        const containerRect = container.getBoundingClientRect()
        const containerTop = containerRect.top
        const containerBottom = containerRect.bottom
        const containerHeight = containerRect.height

        // Calculate viewport threshold position
        const viewportHeight = window.innerHeight
        const thresholdPx = (viewportHeight * threshold) / 100

        // Calculate how much of the container is above the threshold
        const containerAboveThreshold = Math.max(0, thresholdPx - containerTop)
        const containerBelowThreshold = Math.max(
          0,
          containerBottom - thresholdPx
        )

        // Calculate mask position
        if (containerTop >= thresholdPx) {
          // Container is entirely below threshold - hide everything
          gsap.set(mask, {
            top: '0%',
            height: '100%',
            background: maskColor,
          })
        } else if (containerBottom <= thresholdPx) {
          // Container is entirely above threshold - show everything
          gsap.set(mask, {
            height: '0%',
          })
        } else {
          // Container crosses the threshold
          const visibleHeight = containerAboveThreshold
          const hiddenHeight = containerBelowThreshold
          const visiblePercentage = (visibleHeight / containerHeight) * 100
          const hiddenPercentage = (hiddenHeight / containerHeight) * 100

          if (fadeEdge > 0) {
            // Create gradient mask with fade edge
            const fadeEdgePx = (fadeEdge * containerHeight) / 100
            const fadeStartPercentage = visiblePercentage
            const fadeEndPercentage =
              visiblePercentage + (fadeEdgePx / containerHeight) * 100

            gsap.set(mask, {
              top: `${fadeStartPercentage}%`,
              height: `${
                hiddenPercentage + (fadeEdgePx / containerHeight) * 100
              }%`,
              background: `linear-gradient(to bottom, transparent 0%, ${maskColor} ${
                (fadeEdgePx / (hiddenHeight + fadeEdgePx)) * 100
              }%, ${maskColor} 100%)`,
            })
          } else {
            // Solid mask (original behavior)
            gsap.set(mask, {
              top: `${visiblePercentage}%`,
              height: `${hiddenPercentage}%`,
              background: maskColor,
            })
          }
        }
      },
    })

    // Cleanup
    return () => {
      scrollTrigger.kill()
    }
  }, [threshold, smoothness, maskColor, fadeEdge])

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {/* Content */}
      <div className="relative z-10">{children}</div>

      {/* Fixed Mask */}
      <div
        ref={maskRef}
        className="absolute z-20 pointer-events-none"
        style={{
          background: maskColor,
          left: 0,
          right: 0,
        }}
      />
    </div>
  )
}

export default FixedMask
