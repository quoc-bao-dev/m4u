'use client'

import React, { memo } from 'react'
import { motion } from 'framer-motion'

const LiveAvatar: React.FC<{ src: string; alt?: string; small?: boolean }> = ({
  src,
  alt = '',
  small = false,
}) => {
  return (
    <div
      className={`${small ? 'w-8' : 'w-12 md:w-16'} flex flex-col items-center`}
    >
      <div
        className={`relative transform-gpu ${
          small ? 'size-8 ' : 'size-12 md:size-16'
        }`}
        style={{ willChange: 'transform' }}
      >
        {/* Rotating gradient ring */}
        <motion.div
          aria-hidden
          className="absolute inset-0 rounded-full transform-gpu"
          style={{
            background: 'conic-gradient(#ff2d55, #ff375f, #ff2d55)',
            willChange: 'transform',
            backfaceVisibility: 'hidden',
          }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, ease: 'easeOut', duration: 2 }}
        />
        {/* Create ring thickness via mask so center is hollow */}
        <div
          aria-hidden
          className="absolute inset-0 rounded-full"
          style={{
            backgroundColor: 'black',
            mask: 'radial-gradient(farthest-side, transparent calc(100% - 4px), black 0)',
            WebkitMask:
              'radial-gradient(farthest-side, transparent calc(100% - 4px), black 0)',
          }}
        />
        {/* Pulsing halo - use shadow glow + transform-only to avoid flicker */}
        <motion.div
          aria-hidden
          className="absolute -inset-1 rounded-full pointer-events-none transform-gpu"
          style={{
            boxShadow: '0 0 0 3px rgba(239,68,68,0.7)',
            willChange: 'transform, opacity',
            backfaceVisibility: 'hidden',
          }}
          animate={{
            opacity: [0.6, 0, 0, 0.6],
            scale: [0.8, 1.05, 0.8, 0.8],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.6,
            ease: 'easeInOut',
            times: [0, 0.5, 0.51, 1],
          }}
        />
        {/* Avatar content with white stroke above ring */}
        <div
          className="absolute inset-0 rounded-full border-2 md:border-4 border-red-500 overflow-hidden transform-gpu"
          style={{ willChange: 'transform' }}
        >
          <motion.img
            src={src}
            className="size-full object-cover"
            alt={alt}
            style={{
              willChange: 'transform, opacity',
              backfaceVisibility: 'hidden',
            }}
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* Inner red ring */}
          {/* <div className="pointer-events-none absolute -inset-1 rounded-full border-4 border-red-500 z-50" /> */}
        </div>
      </div>
      {!small && (
        <span className="mt-1 px-2 py-0.5 rounded-full bg-red-600 text-white text-[10px] leading-none font-semibold uppercase tracking-wider">
          live
        </span>
      )}
    </div>
  )
}

const AvatarStack = ({ small = false }: { small?: boolean }) => {
  return (
    <div className="flex -space-x-1 md:-space-x-2">
      {/* Avatar placeholders - replace with actual user avatars */}
      {[1, 2, 3, 4].map((i) => (
        <LiveAvatar
          key={i}
          src={`/image/reviewer-carousel/image-0${i}.jpg`}
          small={small}
        />
      ))}
      <div
        className={`${
          small ? 'size-8' : 'size-12 md:size-16'
        } bg-gray-900 rounded-full border-2 md:border-4 border-gray-900 flex items-center justify-center text-white text-sm font-medium`}
      >
        <p
          className={`${
            small ? 'text-xs md:text-sm' : 'text-base md:text-xl'
          } font-medium`}
        >
          69+
        </p>
      </div>
    </div>
  )
}

export default memo(AvatarStack)
