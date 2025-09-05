'use client'

import React from 'react'
import { motion } from 'framer-motion'

type Easing =
  | 'linear'
  | 'easeIn'
  | 'easeOut'
  | 'easeInOut'
  | [number, number, number, number]
  | ((t: number) => number)

export const BLUR_CIRCLE1_CONFIG = {
  svg: { width: 1232, height: 1232, viewBox: '0 0 1232 1232' },
  circle: { cx: 616, cy: 616, r: 416, fillOpacity: 0.35 },
  gradient: {
    id: 'paint0_linear_blur1',
    x1: 616,
    y1: 200,
    x2: 616,
    y2: 1032,
    // Blue, Purple, Pink
    colors: ['#5EB2FC', '#B3B3FC', '#FF5EBE'],
  },
  filterId: 'filter0_f_blur1',
  motion: {
    axis: 'both' as 'x' | 'y' | 'both',
    amplitudeX: 12,
    amplitudeY: 12,
    rotation: 8,
    duration: 8,
    ease: 'easeInOut' as Easing,
    repeat: Infinity as number,
    offsetX: 0,
    offsetY: 0,
  },
}

type BlurCircle1Props = {
  className?: string
  animation?: Partial<typeof BLUR_CIRCLE1_CONFIG.motion>
}

const BlurCircle1: React.FC<BlurCircle1Props> = ({ className, animation }) => {
  const cfg = BLUR_CIRCLE1_CONFIG
  const motionCfg = { ...cfg.motion, ...animation }

  return (
    <div className={className}>
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
            x:
              motionCfg.axis === 'y'
                ? 0
                : -motionCfg.amplitudeX + motionCfg.offsetX,
            y:
              motionCfg.axis === 'x'
                ? 0
                : -motionCfg.amplitudeY + motionCfg.offsetY,
            rotate: 0,
          }}
          animate={{
            x:
              motionCfg.axis === 'y'
                ? 0
                : [
                    motionCfg.offsetX - motionCfg.amplitudeX,
                    motionCfg.offsetX + motionCfg.amplitudeX,
                    motionCfg.offsetX - motionCfg.amplitudeX,
                  ],
            y:
              motionCfg.axis === 'x'
                ? 0
                : [
                    motionCfg.offsetY - motionCfg.amplitudeY,
                    motionCfg.offsetY + motionCfg.amplitudeY,
                    motionCfg.offsetY - motionCfg.amplitudeY,
                  ],
            rotate: [0, motionCfg.rotation, 0],
          }}
          transition={{
            duration: motionCfg.duration,
            repeat: motionCfg.repeat,
            ease: motionCfg.ease,
          }}
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
                  cfg.gradient.colors[0], // blue
                  cfg.gradient.colors[1], // purple
                  cfg.gradient.colors[2], // pink
                  cfg.gradient.colors[0],
                ],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.stop
              offset="100%"
              animate={{
                stopColor: [
                  cfg.gradient.colors[1], // purple
                  cfg.gradient.colors[2], // pink
                  cfg.gradient.colors[0], // blue
                  cfg.gradient.colors[1],
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

export default BlurCircle1
