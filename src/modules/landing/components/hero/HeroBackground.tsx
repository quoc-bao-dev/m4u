'use client'

import { useDevice } from '@/core/hooks'
import { motion } from 'framer-motion'
import { useCallback } from 'react'

// Local animation configuration for this component only
// NOTE: Tốc độ chậm hơn - chỉnh ở đây
// - Tăng `multiplier` để làm mọi animation chậm hơn
// - Có thể tinh chỉnh từng duration/delay bên trong `hero`
const ANIMATION = {
  // Tăng giá trị này (ví dụ 1.6) để toàn bộ chuyển động chậm lại
  multiplier: 3,
  ease: {
    inOut: 'easeInOut' as const,
    out: 'easeOut' as const,
  },
  hero: {
    // Có thể tăng nhẹ các duration cơ bản để mượt và chậm hơn
    containerEnter: 0.7,
    svgEnter: { duration: 0.95, delay: 0.16 },
    blobEnter: { duration: 1.2, delay: 0.28 },
    pathDraw: { duration: 2.6, delay: 0.36 },
    gradientLoop: 2.6,
    colorLoop: { duration: 3, delayOffsets: [0, 0.4, 0.8, 1] },
    gradientSweep: { distance: 960, duration: 7.5 },
  },
} as const

const HeroBackground = () => {
  const { isMobile } = useDevice()

  console.log('[isMobile] ', isMobile)

  const BlurBackground = useCallback(() => {
    return (
      <motion.div
        // Hiển thị màu ngay từ đầu: đặt opacity/scale về trạng thái cuối ngay lập tức
        initial={{ opacity: 1, scale: 1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          // duration scaled by global multiplier
          duration: ANIMATION.hero.containerEnter * ANIMATION.multiplier,
          ease: ANIMATION.ease.out,
        }}
        className="absolute inset-0 w-full h-full overflow-hidden"
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
            duration: ANIMATION.hero.svgEnter.duration * ANIMATION.multiplier,
            delay: ANIMATION.hero.svgEnter.delay,
            ease: ANIMATION.ease.out,
          }}
        >
          <motion.g
            filter="url(#filter0_f_17446_539)"
            initial={{ scale: 0.72, rotate: -3, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{
              duration:
                ANIMATION.hero.blobEnter.duration * ANIMATION.multiplier,
              delay: ANIMATION.hero.blobEnter.delay,
              ease: ANIMATION.ease.out,
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
                  ANIMATION.hero.pathDraw.duration * ANIMATION.multiplier,
                delay: ANIMATION.hero.pathDraw.delay,
                ease: ANIMATION.ease.inOut,
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
                stdDeviation="182"
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
                gradientTransform: `translate(${ANIMATION.hero.gradientSweep.distance} 0)`,
              }}
              animate={{
                gradientTransform: [
                  `translate(${ANIMATION.hero.gradientSweep.distance} 0)`,
                  `translate(-${ANIMATION.hero.gradientSweep.distance} 0)`,
                ],
              }}
              transition={{
                duration:
                  ANIMATION.hero.gradientSweep.duration * ANIMATION.multiplier,
                repeat: Infinity,
                repeatType: 'mirror',
                ease: ANIMATION.ease.inOut,
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
                    ANIMATION.hero.colorLoop.duration * ANIMATION.multiplier,
                  repeat: Infinity,
                  repeatType: 'mirror',
                  ease: ANIMATION.ease.inOut,
                }}
              />
              <motion.stop
                offset="0.452463"
                stopColor="#5B50FF"
                animate={{
                  stopColor: ['#5B50FF', '#A690FC', '#5B50FF'],
                }}
                transition={{
                  duration:
                    ANIMATION.hero.colorLoop.duration * ANIMATION.multiplier,
                  repeat: Infinity,
                  ease: ANIMATION.ease.inOut,
                  delay: ANIMATION.hero.colorLoop.delayOffsets[1],
                  repeatType: 'mirror',
                }}
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
                    ANIMATION.hero.colorLoop.duration * ANIMATION.multiplier,
                  repeat: Infinity,
                  ease: ANIMATION.ease.inOut,
                  delay: ANIMATION.hero.colorLoop.delayOffsets[2],
                  repeatType: 'mirror',
                }}
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
                    ANIMATION.hero.colorLoop.duration * ANIMATION.multiplier,
                  repeat: Infinity,
                  ease: ANIMATION.ease.inOut,
                  delay: ANIMATION.hero.colorLoop.delayOffsets[3],
                  repeatType: 'mirror',
                }}
              />
            </motion.linearGradient>
          </defs>
        </motion.svg>
      </motion.div>
    )
  }, [])

  return (
    <div className="h-full">
      {!isMobile ? (
        <>
          <BlurBackground />
        </>
      ) : (
        // Mobile version - static blur background without animations
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '120%',
              height: '120%',
              background:
                'linear-gradient(135deg, #2EA7FF 0%, #5B50FF 25%, #FF2E90 75%, #FF7A2B 100%)',
              filter: 'blur(182px)',
              opacity: 0.2,
            }}
          />
        </div>
      )}
      <div className="hidden lg:block absolute inset-0 w-full h-full -z-10 ">
        <img
          src="/image/hero-baner/Homepage_5.gif"
          className="w-full h-full ml-10 object-cover "
          alt=""
        />
      </div>

      <div className="block lg:hidden absolute inset-0 w-full h-full -z-10 ">
        <img
          src="/image/hero-baner/Homepage_1.gif"
          className="w-full h-full object-cover "
          alt=""
        />
      </div>
    </div>
  )
}

export default HeroBackground
