'use client'

import React from 'react'
import { motion } from 'framer-motion'

const HeroBackground = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: [0.9, 1.05, 1] }}
      transition={{ duration: 1.4, ease: 'easeOut' }}
      className="absolute inset-0 w-full h-full overflow-hidden"
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1920 918"
        fill="none"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid slice"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.8, delay: 0.3, ease: 'easeOut' }}
      >
        <motion.g
          filter="url(#filter0_f_17446_539)"
          initial={{ scale: 0.75, rotate: -2, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ duration: 2.1, delay: 0.5, ease: 'easeOut' }}
        >
          <motion.path
            d="M-53.5004 787.484C-52.0784 1303.63 48.9973 1421.79 885.867 1046.22C1359.21 674.609 1763.76 899.352 2277.03 596.179C1498.98 -37.7671 1258.33 835.712 844.499 805.984C333.605 769.283 127.112 144.116 -53.5004 787.484Z"
            fill="url(#paint0_linear_17446_539)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, delay: 0.8, ease: 'easeInOut' }}
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
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
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
            animate={{
              x1: ['5.08409', '25.08409', '5.08409'],
              y1: ['419.226', '439.226', '419.226'],
              x2: ['1498.44', '1518.44', '1498.44'],
              y2: ['1530.03', '1550.03', '1530.03'],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <motion.stop
              offset="0.0238694"
              stop-color="#97E6FF"
              animate={{
                stopColor: ['#97E6FF', '#8FE0FF', '#97E6FF'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.stop
              offset="0.452463"
              stop-color="#A690FC"
              animate={{
                stopColor: ['#A690FC', '#9780FC', '#A690FC'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.5,
              }}
            />
            <motion.stop
              offset="0.762123"
              stop-color="#FC96BB"
              stop-opacity="0.46"
              animate={{
                stopColor: ['#FC96BB', '#FF86BB', '#FC96BB'],
                stopOpacity: [0.46, 0.7, 0.46],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1,
              }}
            />
            <motion.stop
              offset="1"
              stop-color="#FFC397"
              stop-opacity="0.28"
              animate={{
                stopColor: ['#FFC397', '#FFB377', '#FFC397'],
                stopOpacity: [0.28, 0.5, 0.28],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1.5,
              }}
            />
          </motion.linearGradient>
        </defs>
      </motion.svg>

      {/* Thêm hiệu ứng floating particles */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 1.5 }}
      >
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2.5 h-2.5 bg-white/30 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
            animate={{
              x: [-15, 15, -15],
              y: [-40, 40, -40],
              opacity: [0.15, 0.9, 0.15],
            }}
            transition={{
              duration: 4 + i * 0.4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.3,
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  )
}

export default HeroBackground
