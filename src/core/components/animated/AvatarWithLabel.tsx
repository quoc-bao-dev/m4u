'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

type AvatarWithLabelProps = {
  index: number
  src: string
  size?: number
  step?: number
  isEven?: boolean
  renderLabel?: (args: { index: number; isEven: boolean }) => React.ReactNode
}

const AvatarWithLabel: React.FC<AvatarWithLabelProps> = ({
  index,
  src,
  size = 50,
  step = 0,
  isEven = index % 2 === 0,
  renderLabel,
}) => {
  const labelRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = labelRef.current
    if (!el) return
    // Animation direction: even positions (top) animate from above, odd positions (bottom) animate from below
    const fromY = isEven ? -8 : 8
    gsap.fromTo(
      el,
      { y: fromY, opacity: 0.8 },
      { y: 0, opacity: 1, duration: 0.25, ease: 'power1.out' }
    )
  }, [step, isEven])

  // Even positions render label above, odd positions render label below
  const position = isEven ? 'top' : 'bottom'

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      {isEven ? '33a' : '44a'}
      <div
        style={{
          position: 'relative',
          width: size,
          height: size,
          borderRadius: '9999px',
          overflow: 'hidden',
          boxShadow: '0 6px 16px rgba(0,0,0,0.12)',
          background: '#f3f4f6',
        }}
      >
        <img
          src={src}
          alt={`avatar-${index}`}
          width={size}
          height={size}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={(e) => {
            const target = e.currentTarget
            target.style.display = 'none'
          }}
        />
      </div>

      <div
        ref={labelRef}
        style={
          {
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            [position]: size * 0.9,
          } as React.CSSProperties
        }
      >
        {renderLabel ? renderLabel({ index, isEven }) : null}
      </div>
    </div>
  )
}

export default AvatarWithLabel
