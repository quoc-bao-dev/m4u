'use client'

import { motion } from 'framer-motion'
import clsx from 'clsx'
import React from 'react'

type BlurCircleVariant = 'v1' | 'v2'

type BlurCircleProps = {
  variant?: BlurCircleVariant
  className?: string
  animation?: {
    axis?: 'x' | 'y' | 'both'
    amplitude?: number
    rotation?: number
    duration?: number
    ease?:
      | 'linear'
      | 'easeIn'
      | 'easeOut'
      | 'easeInOut'
      | [number, number, number, number]
      | ((t: number) => number)
    repeat?: number
    amplitudeX?: number
    amplitudeY?: number
    offsetX?: number
    offsetY?: number
  }
}

const BLUR_CIRCLE_CONFIG: Record<
  BlurCircleVariant,
  {
    svg: { width: number; height: number; viewBox: string }
    circle: { cx: number; cy: number; r: number; fillOpacity: number }
    gradient: {
      id: string
      x1: number
      y1: number
      x2: number
      y2: number
      fromColors: string[]
      toColors: string[]
    }
    filterId: string
  }
> = {
  v1: {
    svg: { width: 1232, height: 1232, viewBox: '0 0 1232 1232' },
    circle: { cx: 616, cy: 616, r: 416, fillOpacity: 0.35 },
    gradient: {
      id: 'paint0_linear_v1',
      x1: 616,
      y1: 200,
      x2: 616,
      y2: 1032,
      fromColors: ['#5EB2FC', '#B3B3FC'],
      toColors: ['#B3B3FC', '#5EB2FC'],
    },
    filterId: 'filter0_f_v1',
  },
  v2: {
    svg: { width: 1018, height: 1018, viewBox: '0 0 1018 1018' },
    circle: { cx: 509, cy: 509, r: 309, fillOpacity: 0.3 },
    gradient: {
      id: 'paint0_linear_v2',
      x1: 362.394,
      y1: 586.868,
      x2: 728.723,
      y2: 611.191,
      fromColors: ['#4AD295', '#5EB2FC'],
      toColors: ['#5EB2FC', '#4AD295'],
    },
    filterId: 'filter0_f_v2',
  },
}

const BlurCircle: React.FC<BlurCircleProps> = ({
  variant = 'v1',
  className,
  animation,
}) => {
  const cfg = BLUR_CIRCLE_CONFIG[variant]
  const amplitude = animation?.amplitude ?? 10
  const amplitudeX = animation?.amplitudeX ?? amplitude
  const amplitudeY = animation?.amplitudeY ?? amplitude
  const rotation = animation?.rotation ?? 10
  const duration = animation?.duration ?? 6
  const ease = animation?.ease ?? 'easeInOut'
  const repeat = animation?.repeat ?? Infinity
  const axis = animation?.axis ?? 'both'
  const offsetX = animation?.offsetX ?? 0
  const offsetY = animation?.offsetY ?? 0

  return (
    <div className={clsx(className)}>
      <svg
        width={cfg.svg.width}
        height={cfg.svg.height}
        viewBox={cfg.svg.viewBox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.g
          filter={`url(#${cfg.filterId})`}
          initial={{
            x: axis === 'y' ? 0 : -amplitudeX + offsetX,
            y: axis === 'x' ? 0 : -amplitudeY + offsetY,
            rotate: 0,
          }}
          animate={{
            x:
              axis === 'y'
                ? 0
                : [
                    offsetX - amplitudeX,
                    offsetX + amplitudeX,
                    offsetX - amplitudeX,
                  ],
            y:
              axis === 'x'
                ? 0
                : [
                    offsetY - amplitudeY,
                    offsetY + amplitudeY,
                    offsetY - amplitudeY,
                  ],
            rotate: [0, rotation, 0],
          }}
          transition={{ duration, repeat, ease }}
          style={{ willChange: 'transform' }}
        >
          <circle
            cx={cfg.circle.cx}
            cy={cfg.circle.cy}
            r={cfg.circle.r}
            fill={`url(#${cfg.gradient.id})`}
            fillOpacity={cfg.circle.fillOpacity}
          />
        </motion.g>
        <defs>
          <filter
            id={cfg.filterId}
            x="0"
            y="0"
            width={cfg.svg.width}
            height={cfg.svg.height}
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="100"
              result="effect1_foregroundBlur"
            />
          </filter>
          <linearGradient
            id={cfg.gradient.id}
            x1={cfg.gradient.x1}
            y1={cfg.gradient.y1}
            x2={cfg.gradient.x2}
            y2={cfg.gradient.y2}
            gradientUnits="userSpaceOnUse"
          >
            <motion.stop
              offset="0%"
              animate={{
                stopColor: [
                  cfg.gradient.fromColors[0],
                  cfg.gradient.toColors[0],
                  cfg.gradient.fromColors[0],
                ],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.stop
              offset="100%"
              animate={{
                stopColor: [
                  cfg.gradient.fromColors[1],
                  cfg.gradient.toColors[1],
                  cfg.gradient.fromColors[1],
                ],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

export default BlurCircle
