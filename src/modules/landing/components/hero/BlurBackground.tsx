'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

// Animation configuration optimized for different devices
const ANIMATION = {
  // Desktop: Full animations with multiplier
  desktop: {
    multiplier: 2, // Reduced from 3 to 2
    ease: {
      inOut: 'easeInOut' as const,
      out: 'easeOut' as const,
    },
    hero: {
      containerEnter: 0.5, // Reduced from 0.7
      svgEnter: { duration: 0.6, delay: 0.1 }, // Reduced durations
      blobEnter: { duration: 0.8, delay: 0.2 },
      pathDraw: { duration: 1.5, delay: 0.25 }, // Much shorter
      gradientLoop: 1.8, // Reduced from 2.6
      colorLoop: { duration: 2.5, delayOffsets: [0, 0.5, 1] }, // Fewer changes
      gradientSweep: { distance: 600, duration: 5 }, // Reduced distance and duration
    },
  },
  // Mobile: Simplified animations for better performance
  mobile: {
    multiplier: 1,
    ease: {
      inOut: 'easeInOut' as const,
      out: 'easeOut' as const,
    },
    hero: {
      containerEnter: 0.2, // Even faster
      svgEnter: { duration: 0.3, delay: 0.05 },
      blobEnter: { duration: 0.4, delay: 0.1 },
      pathDraw: { duration: 0.6, delay: 0.15 },
      gradientLoop: 1.2, // Shorter loop
      colorLoop: { duration: 1.5, delayOffsets: [0, 0.7] }, // Only 2 color changes
      gradientSweep: { distance: 300, duration: 3 }, // Much shorter
    },
  },
} as const

interface BlurBackgroundProps {
  isMobile: boolean
}

const BlurBackground = ({ isMobile }: BlurBackgroundProps) => {
  const shouldReduceMotion = useReducedMotion()
  const [isVisible, setIsVisible] = useState(false)
  
  // Get appropriate animation config based on device
  const animationConfig = isMobile ? ANIMATION.mobile : ANIMATION.desktop

  // Performance optimization: only render when in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById('blur-background')
    if (element) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [])

  // Disable animations if user prefers reduced motion or on mobile
  if (isMobile || shouldReduceMotion) {
    return (
      <div 
        id="blur-background"
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #2EA7FF 0%, #5B50FF 25%, #FF2E90 75%, #FF7A2B 100%)',
          filter: 'blur(120px)',
          opacity: 0.15,
          willChange: 'auto',
        }}
      />
    )
  }

  if (!isVisible) {
    return <div id="blur-background" className="absolute inset-0 w-full h-full overflow-hidden" />
  }

  return (
    <motion.div
      id="blur-background"
      // Hiển thị màu ngay từ đầu: đặt opacity/scale về trạng thái cuối ngay lập tức
      initial={{ opacity: 1, scale: 1 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        // duration scaled by device-specific multiplier
        duration:
          animationConfig.hero.containerEnter * animationConfig.multiplier,
        ease: animationConfig.ease.out,
      }}
      className="absolute inset-0 w-full h-full overflow-hidden"
      style={{
        willChange: 'transform',
        transform: 'translate3d(0,0,0)', // Force hardware acceleration
      }}
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1920 918"
        fill="none"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid slice"
        // Tránh fade-in: hiển thị ngay
        initial={{ y: 0, opacity: 1 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration:
            animationConfig.hero.svgEnter.duration * animationConfig.multiplier,
          delay: animationConfig.hero.svgEnter.delay,
          ease: animationConfig.ease.out,
        }}
        style={{
          willChange: 'transform',
          transform: 'translate3d(0,0,0)',
        }}
      >
        <motion.g
          filter="url(#filter0_f_17446_539)"
          initial={{ scale: 0.72, rotate: -3, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{
            duration:
              animationConfig.hero.blobEnter.duration *
              animationConfig.multiplier,
            delay: animationConfig.hero.blobEnter.delay,
            ease: animationConfig.ease.out,
          }}
          style={{
            willChange: 'transform',
            transform: 'translate3d(0,0,0)',
          }}
        >
          <motion.path
            d="M-53.5004 787.484C-52.0784 1303.63 48.9973 1421.79 885.867 1046.22C1359.21 674.609 1763.76 899.352 2277.03 596.179C1498.98 -37.7671 1258.33 835.712 844.499 805.984C333.605 769.283 127.112 144.116 -53.5004 787.484Z"
            fill="url(#paint0_linear_17446_539)"
            // Vẽ đầy đủ ngay từ đầu để có màu tức thì
            initial={{ pathLength: 1 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration:
                animationConfig.hero.pathDraw.duration *
                animationConfig.multiplier,
              delay: animationConfig.hero.pathDraw.delay,
              ease: animationConfig.ease.inOut,
            }}
          />
        </motion.g>
        <defs>
          <filter
            id="filter0_f_17446_539"
            x="-417.5"
            y="0.891602"
            width="3058.53"
            height="1629.18"
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
              stdDeviation="120"
              result="effect1_foregroundBlur_17446_539"
            />
          </filter>
          <motion.linearGradient
            id="paint0_linear_17446_539"
            x1="5.08409"
            y1="419.226"
            x2="1498.44"
            y2="1530.03"
            gradientUnits="userSpaceOnUse"
            initial={{
              gradientTransform: `translate(${animationConfig.hero.gradientSweep.distance} 0)`,
            }}
            animate={{
              gradientTransform: [
                `translate(${animationConfig.hero.gradientSweep.distance} 0)`,
                `translate(-${animationConfig.hero.gradientSweep.distance} 0)`,
              ],
            }}
            transition={{
              duration:
                animationConfig.hero.gradientSweep.duration *
                animationConfig.multiplier,
              repeat: Infinity,
              repeatType: 'mirror',
              ease: animationConfig.ease.inOut,
            }}
          >
            <motion.stop
              offset="0.0238694"
              stopColor="#2EA7FF"
              animate={{
                stopColor: ['#2EA7FF', '#97E6FF', '#2EA7FF'],
              }}
              transition={{
                duration:
                  animationConfig.hero.colorLoop.duration *
                  animationConfig.multiplier,
                repeat: Infinity,
                repeatType: 'mirror',
                ease: animationConfig.ease.inOut,
              }}
              style={{ willChange: 'stop-color' }}
            />
            <motion.stop
              offset="0.452463"
              stopColor="#5B50FF"
              animate={{
                stopColor: ['#5B50FF', '#A690FC', '#5B50FF'],
              }}
              transition={{
                duration:
                  animationConfig.hero.colorLoop.duration *
                  animationConfig.multiplier,
                repeat: Infinity,
                ease: animationConfig.ease.inOut,
                delay: animationConfig.hero.colorLoop.delayOffsets[1],
                repeatType: 'mirror',
              }}
              style={{ willChange: 'stop-color' }}
            />
            <motion.stop
              offset="0.762123"
              stopColor="#FF2E90"
              stopOpacity="0.95"
              animate={{
                stopColor: ['#FF2E90', '#FC96BB', '#FF2E90'],
                stopOpacity: [0.95, 0.3, 0.95],
              }}
              transition={{
                duration:
                  animationConfig.hero.colorLoop.duration *
                  animationConfig.multiplier,
                repeat: Infinity,
                ease: animationConfig.ease.inOut,
                delay: animationConfig.hero.colorLoop.delayOffsets[2],
                repeatType: 'mirror',
              }}
              style={{ willChange: 'stop-color, stop-opacity' }}
            />
            <motion.stop
              offset="1"
              stopColor="#FF7A2B"
              stopOpacity="0.7"
              animate={{
                stopColor: ['#FF7A2B', '#FFC397', '#FF7A2B'],
                stopOpacity: [0.7, 0.18, 0.7],
              }}
              transition={{
                duration:
                  animationConfig.hero.colorLoop.duration *
                  animationConfig.multiplier,
                repeat: Infinity,
                ease: animationConfig.ease.inOut,
                delay: animationConfig.hero.colorLoop.delayOffsets[animationConfig.hero.colorLoop.delayOffsets.length - 1],
                repeatType: 'mirror',
              }}
              style={{ willChange: 'stop-color, stop-opacity' }}
            />
          </motion.linearGradient>
        </defs>
      </motion.svg>
    </motion.div>
  )
}

export default BlurBackground
