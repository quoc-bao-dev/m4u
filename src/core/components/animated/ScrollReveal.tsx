'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade'
  duration?: number
  delay?: number
  distance?: number
  trigger?: string | Element
  start?: string
  end?: string
  scrub?: boolean | number
  once?: boolean
  onEnter?: () => void
  onLeave?: () => void
  onEnterBack?: () => void
  onLeaveBack?: () => void
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  direction = 'up',
  duration = 1,
  delay = 0,
  distance = 50,
  trigger,
  start = 'top 50%',
  end = 'bottom 50%',
  scrub = false,
  once = true,
  onEnter,
  onLeave,
  onEnterBack,
  onLeaveBack,
}) => {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    // Set initial state based on direction
    const initialStates = {
      up: { y: distance, opacity: 0 },
      down: { y: -distance, opacity: 0 },
      left: { x: distance, opacity: 0 },
      right: { x: -distance, opacity: 0 },
      fade: { opacity: 0 },
    }

    const finalStates = {
      up: { y: 0, opacity: 1 },
      down: { y: 0, opacity: 1 },
      left: { x: 0, opacity: 1 },
      right: { x: 0, opacity: 1 },
      fade: { opacity: 1 },
    }

    // Set initial state
    gsap.set(element, initialStates[direction])

    // Create animation timeline
    const tl = gsap.timeline({
      delay,
      onComplete: () => {
        if (once) {
          ScrollTrigger.refresh()
        }
      },
    })

    tl.to(element, {
      ...finalStates[direction],
      duration,
      ease: 'power2.out',
    })

    // Create ScrollTrigger
    const scrollTrigger = ScrollTrigger.create({
      trigger: trigger || element,
      start,
      end,
      scrub,
      once,
      animation: tl,
      onEnter: () => {
        if (!scrub) {
          tl.play()
        }
        onEnter?.()
      },
      onLeave: () => {
        if (!scrub && !once) {
          tl.reverse()
        }
        onLeave?.()
      },
      onEnterBack: () => {
        if (!scrub && !once) {
          tl.play()
        }
        onEnterBack?.()
      },
      onLeaveBack: () => {
        if (!scrub && !once) {
          tl.reverse()
        }
        onLeaveBack?.()
      },
    })

    // Cleanup
    return () => {
      scrollTrigger.kill()
      tl.kill()
    }
  }, [
    direction,
    duration,
    delay,
    distance,
    trigger,
    start,
    end,
    scrub,
    once,
    onEnter,
    onLeave,
    onEnterBack,
    onLeaveBack,
  ])

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  )
}

export default ScrollReveal
