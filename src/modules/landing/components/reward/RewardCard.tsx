'use client'

import gsap from 'gsap'
import React, { memo } from 'react'

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
  className?: string
  rotateOnHover?: number
  baseRotate?: number
  disableElastic?: boolean
  activeScale?: number
}

const RewardCard = React.forwardRef<HTMLDivElement, RewardCardProps>(
  (
    {
      icon,
      label,
      title,
      bgColor,
      iconColor,
      isActive = false,
      isDimmed = false,
      onMouseEnter,
      onMouseLeave,
      className,
      rotateOnHover = -2,
      baseRotate = 0,
      disableElastic = false,
      activeScale = 1.05,
    },
    ref
  ) => {
    const containerRef = React.useRef<HTMLDivElement | null>(null)
    const iconRef = React.useRef<HTMLDivElement | null>(null)
    const elasticRef = React.useRef<HTMLDivElement | null>(null)
    const enterTlRef = React.useRef<gsap.core.Timeline | null>(null)
    const [resolvedBgColor, setResolvedBgColor] =
      React.useState<string>('#FFFFFF')

    // Local animation configuration dedicated to RewardCard only
    const ANIM = React.useMemo(
      () => ({
        multiplier: 1.0,
        ease: {
          softOut: 'power3.out',
          quickOut: 'power2.out',
          elasticOut: 'elastic.out(1, 0.36)',
        },
        stateChange: 0.28,
        hoverIn: { durationA: 0.18, durationReturn: 0.14 },
        iconWobble: 0.2,
        hoverOut: 0.2,
        elastic: { scaleX: 1.25, inDuration: 0.6, outDuration: 0.28 },
      }),
      []
    )

    // expose root ref to parent
    React.useImperativeHandle(ref, () => containerRef.current as HTMLDivElement)

    // Animate scale when active/dimmed changes
    React.useEffect(() => {
      const targetScale = isActive ? activeScale : isDimmed ? 0.95 : 1
      if (containerRef.current) {
        gsap.to(containerRef.current, {
          scale: targetScale,
          rotate: baseRotate,
          duration: ANIM.stateChange * ANIM.multiplier,
          ease: ANIM.ease.softOut,
        })
      }
      // Reflect card state scale on Elastic width proportionally for cohesion
      if (elasticRef.current) {
        const elasticScaleX = 1 + (targetScale - 1) * 2
        gsap.to(elasticRef.current, {
          scaleX: elasticScaleX,
          transformOrigin: 'left center',
          duration: ANIM.stateChange * ANIM.multiplier,
          ease: ANIM.ease.softOut,
        })
      }
    }, [isActive, isDimmed, ANIM, activeScale, baseRotate])

    // Resolve actual background color from Tailwind className (bgColor) applied on the container
    React.useEffect(() => {
      if (!containerRef.current) return
      const computed = window.getComputedStyle(containerRef.current)
      const bg = computed.backgroundColor
      if (bg) setResolvedBgColor(bg)
    }, [bgColor, className])

    const handleMouseEnter = () => {
      if (enterTlRef.current) enterTlRef.current.kill()
      const tl = gsap.timeline({ defaults: { ease: ANIM.ease.softOut } })
      enterTlRef.current = tl
      if (containerRef.current) {
        tl.to(
          containerRef.current,
          {
            scale: '+=0.03',
            y: -4,
            rotate: baseRotate + rotateOnHover,
            boxShadow: '0 12px 30px rgba(0,0,0,0.08)',
            duration: ANIM.hoverIn.durationA * ANIM.multiplier,
          },
          0
        ).to(
          containerRef.current,
          {
            y: 0,
            duration: ANIM.hoverIn.durationReturn * ANIM.multiplier,
          },
          '>-0.02'
        )
      }
      if (elasticRef.current) {
        gsap.killTweensOf(elasticRef.current)
        tl.fromTo(
          elasticRef.current,
          { scaleX: 1, scaleY: 1, y: 0, transformOrigin: 'left center' },
          {
            scaleX: ANIM.elastic.scaleX,
            scaleY: 0.96,
            y: -4,
            duration: ANIM.hoverIn.durationA * ANIM.multiplier,
            ease: ANIM.ease.elasticOut,
          },
          0
        ).to(
          elasticRef.current,
          {
            scaleY: 1,
            y: 0,
            duration: ANIM.hoverIn.durationReturn * ANIM.multiplier,
            ease: ANIM.ease.softOut,
          },
          '>-0.02'
        )
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
            duration: ANIM.iconWobble * ANIM.multiplier,
            ease: ANIM.ease.quickOut,
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
          rotate: baseRotate,
          boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
          duration: ANIM.hoverOut * ANIM.multiplier,
          ease: ANIM.ease.quickOut,
        })
      }
      if (elasticRef.current) {
        gsap.killTweensOf(elasticRef.current)
        gsap.to(elasticRef.current, {
          scaleX: 1,
          scaleY: 1,
          y: 0,
          transformOrigin: 'left center',
          duration: ANIM.hoverOut * ANIM.multiplier,
          ease: ANIM.ease.quickOut,
        })
      }
      onMouseLeave?.()
    }

    return (
      <div
        ref={containerRef}
        className={`relative rounded-2xl md:rounded-[40px] ${bgColor} p-2 md:p-8 w-[110px] md:w-[290px] h-[120px] md:h-[250px] ${
          className ?? ''
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex flex-col justify-between h-full">
          <div
            ref={iconRef}
            className={`size-8 md:size-16 md:w-16 md:h-16 rounded-full flex items-center justify-center bg-white/80 ${iconColor} text-2xl shadow`}
          >
            {icon}
          </div>
          <div className="mt-1 md:mt-6">
            <p className="text-gray-700 text-xs md:text-2xl font-medium">
              {label}
            </p>
            <h3 className="text-gray-900 text-base md:text-5xl font-extrabold mt-2">
              {title}
            </h3>
          </div>
        </div>
        {!disableElastic && (
          <div
            ref={elasticRef}
            className="absolute h-[18px] md:h-[38px] top-1/2 left-full -translate-y-1/2 -ml-[1px] will-change-transform"
          >
            <Elastic color={resolvedBgColor} />
          </div>
        )}
      </div>
    )
  }
)

RewardCard.displayName = 'RewardCard'

const Elastic = ({ color = '#E8FBF5' }: { color: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-full"
      viewBox="0 0 111 38"
      fill="none"
    >
      <path
        d="M22.7524 18.9887L1.75244 34.1441V3.83325L22.7524 18.9887Z"
        fill={color}
      />
      <path
        d="M12.2524 18.8333H110.252M22.7524 18.9887L1.75244 34.1441V3.83325L22.7524 18.9887Z"
        stroke={color}
        strokeWidth={3}
      />
    </svg>
  )
}

export default memo(RewardCard)
