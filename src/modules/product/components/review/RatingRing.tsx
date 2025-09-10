import React from 'react'

/**
 * RatingRing – a lightweight circular rating/progress component (no deps)
 *
 * Props:
 *  - value: number (current value)
 *  - max?: number (default 5)
 *  - size?: number (px, default 180)
 *  - strokeWidth?: number (px, default 14)
 *  - trackColor?: string (default "#EFEFEF")
 *  - color?: string | { from: string; to: string }  (stroke color or gradient)
 *  - rounded?: boolean (default true)
 *  - label?: string (e.g. "Excellent")
 *  - reviews?: number (e.g. 69)
 *  - showSuffix?: boolean ("/5" after the value)
 *  - decimals?: number (default 1)
 *  - animate?: boolean (default true)
 *  - className?: string (extra class for the container)
 */
export type RatingRingProps = {
  value: number
  max?: number
  size?: number
  strokeWidth?: number
  trackColor?: string
  color?: string | { from: string; to: string }
  rounded?: boolean
  label?: string
  reviews?: number
  showSuffix?: boolean
  decimals?: number
  animate?: boolean
  className?: string
}

export default function RatingRing({
  value,
  max = 5,
  size = 180,
  strokeWidth = 10,
  trackColor = '#F0F0F0',
  color = '#FE6BBA',
  rounded = true,
  label,
  reviews,
  showSuffix = true,
  decimals = 1,
  animate = true,
  className,
}: RatingRingProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const clamped = Math.max(0, Math.min(value / max, 1))
  const dashOffset = -circumference * (1 - clamped)
  const gradientId = React.useId()

  const strokeProps: React.SVGProps<SVGCircleElement> = {
    strokeLinecap: rounded ? 'round' : 'butt',
    strokeLinejoin: 'round',
    fill: 'transparent',
    r: radius,
    cx: size / 2,
    cy: size / 2,
  }

  const formatted = (
    Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals)
  ).toFixed(decimals)

  return (
    <>
      <div
        className={`hidden md:flex items-center justify-center ${
          className ?? ''
        }`}
        style={{ width: size, height: size }}
      >
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {/* Optional gradient */}
          {typeof color === 'object' && (
            <defs>
              <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={color.from} />
                <stop offset="100%" stopColor={color.to} />
              </linearGradient>
            </defs>
          )}

          {/* Track */}
          <circle
            {...strokeProps}
            stroke={trackColor}
            strokeWidth={strokeWidth}
            style={{ opacity: 0.55 }}
          />

          {/* Progress ring */}
          <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
            <circle
              {...strokeProps}
              stroke={typeof color === 'string' ? color : `url(#${gradientId})`}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              style={{
                transition: animate
                  ? 'stroke-dashoffset 800ms ease'
                  : undefined,
              }}
            />
          </g>

          {/* Center text */}
          <foreignObject
            x={strokeWidth}
            y={strokeWidth}
            width={size - strokeWidth * 2}
            height={size - strokeWidth * 2}
          >
            <div className="w-full h-full flex flex-col items-center justify-center text-center select-none">
              <div
                className="leading-none"
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 4,
                  justifyContent: 'center',
                }}
              >
                <span
                  style={{
                    fontSize: size * 0.24,
                    fontWeight: 700,
                    color: color as string,
                  }}
                >
                  {formatted}
                </span>
                {showSuffix && (
                  <span style={{ fontSize: size * 0.12, opacity: 0.7 }}>
                    /{max}
                  </span>
                )}
              </div>
              {label && (
                <div
                  style={{
                    fontSize: size * 0.11,
                    fontWeight: 700,
                    marginTop: 4,
                    color: color as string,
                  }}
                >
                  {label}
                </div>
              )}
              {typeof reviews === 'number' && (
                <div
                  className="text-greyscale-500 text-xs"
                  style={{ fontSize: size * 0.085, opacity: 0.8, marginTop: 2 }}
                >
                  {reviews} reviews
                </div>
              )}
            </div>
          </foreignObject>
        </svg>
      </div>

      <div className="block md:hidden">
        <div className="w-full h-full flex flex-col items-center justify-center text-center select-none">
          <div
            className="leading-none"
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: 4,
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                fontSize: size * 0.24,
                fontWeight: 700,
                color: color as string,
              }}
            >
              {formatted}
            </span>
            {showSuffix && (
              <span style={{ fontSize: size * 0.12, opacity: 0.7 }}>
                /{max}
              </span>
            )}
          </div>
          {label && (
            <div
              style={{
                fontSize: size * 0.11,
                fontWeight: 700,
                marginTop: 4,
                color: color as string,
              }}
            >
              {label}
            </div>
          )}
          {typeof reviews === 'number' && (
            <div
              className="text-greyscale-500 text-xs"
              style={{ fontSize: size * 0.085, opacity: 0.8, marginTop: 2 }}
            >
              {reviews} reviews
            </div>
          )}
        </div>
      </div>
    </>
  )
}
