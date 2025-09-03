'use client'

import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { gsap } from 'gsap'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'

gsap.registerPlugin(MotionPathPlugin)

type PathCarouselProps<T = { avatar: string }> = {
  pathD: string
  items: T[]
  delay?: number
  avatarSize?: number
  showPath?: boolean
  className?: string
  viewBox?: string
  direction?: 'left-to-right' | 'right-to-left' // TODO: direction - Control hướng di chuyển
  getImageSrc?: (item: T) => string
  renderItem?: (args: {
    index: number
    item: T
    src: string
    size: number
    step: number
    isEven: boolean
  }) => React.ReactNode
}

type StationPoint = { x: number; y: number }

function getContainerAlignedStations(
  svgEl: SVGSVGElement,
  pathEl: SVGPathElement,
  containerEl: HTMLDivElement,
  stationCount: number
): StationPoint[] {
  const points: StationPoint[] = []
  if (!svgEl || !pathEl || !containerEl || stationCount <= 0) return points

  const totalLength = pathEl.getTotalLength()
  const svgPoint = svgEl.createSVGPoint()
  const containerRect = containerEl.getBoundingClientRect()
  const screenCTM = pathEl.getScreenCTM()
  if (!screenCTM) return points

  for (let i = 0; i < stationCount; i++) {
    const progress = stationCount <= 1 ? 0 : i / (stationCount - 1)
    const isLast = stationCount > 1 && i === stationCount - 1
    // Ensure last point snaps to exact end of path
    const len = isLast ? totalLength : totalLength * progress
    const p = pathEl.getPointAtLength(len)

    svgPoint.x = p.x
    svgPoint.y = p.y
    const screenPoint = svgPoint.matrixTransform(screenCTM)

    points.push({
      x: screenPoint.x - containerRect.left,
      y: screenPoint.y - containerRect.top,
    })
  }
  return points
}

const PathCarousel = <T extends { avatar?: string; src?: string }>({
  pathD,
  items,
  delay = 1000,
  avatarSize = 50,
  showPath = false,
  className,
  viewBox = '0 0 640 400',
  direction = 'left-to-right', // TODO: direction - Default direction từ trái sang phải
  getImageSrc,
  renderItem,
}: PathCarouselProps<T>) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const svgRef = useRef<SVGSVGElement | null>(null)
  const pathRef = useRef<SVGPathElement | null>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const offsetRef = useRef<number>(0)
  const stationsRef = useRef<StationPoint[]>([])
  const intervalRef = useRef<number | null>(null)
  const resizeObserverRef = useRef<ResizeObserver | null>(null)
  const [moveStep, setMoveStep] = useState<number>(0)

  // Helper function to get image source from item
  const getItemImageSrc = (item: T): string => {
    if (getImageSrc) {
      return getImageSrc(item)
    }
    return (item as any).avatar || (item as any).src || ''
  }

  // Ensure refs array length matches items
  itemRefs.current = useMemo(
    () => new Array(items.length).fill(null),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [items.length]
  )

  // Compute stations and keep in sync with layout/resize
  useLayoutEffect(() => {
    const svgEl = svgRef.current
    const pathEl = pathRef.current
    const containerEl = containerRef.current
    if (!svgEl || !pathEl || !containerEl) return

    const computeAndPlace = () => {
      stationsRef.current = getContainerAlignedStations(
        svgEl,
        pathEl,
        containerEl,
        items.length
      )

      itemRefs.current.forEach((el, i) => {
        const stationIndex = (i + offsetRef.current) % items.length
        const pt = stationsRef.current[stationIndex]
        if (el && pt) {
          gsap.set(el, { x: pt.x, y: pt.y, opacity: 1 })
        }
      })
    }

    computeAndPlace()

    // Observe container resize and window resize
    const ro = new ResizeObserver(() => {
      computeAndPlace()
    })
    ro.observe(containerEl)
    resizeObserverRef.current = ro

    const onWindowResize = () => computeAndPlace()
    window.addEventListener('resize', onWindowResize)

    return () => {
      window.removeEventListener('resize', onWindowResize)
      ro.disconnect()
      if (resizeObserverRef.current === ro) resizeObserverRef.current = null
      stationsRef.current = []
    }
  }, [pathD, items.length])

  // Tick movement: every delay ms, move to next station
  useEffect(() => {
    if (items.length === 0) return
    if (!pathRef.current) return

    const moveOnce = () => {
      if (!stationsRef.current.length) return

      const stationCount = items.length
      // TODO: direction - Tính toán nextOffset dựa trên direction
      const nextOffset =
        direction === 'left-to-right'
          ? (offsetRef.current + 1) % stationCount
          : (offsetRef.current - 1 + stationCount) % stationCount

      itemRefs.current.forEach((el, i) => {
        if (!el) return
        const currentIndex = (i + offsetRef.current) % stationCount
        const nextIndex = (i + nextOffset) % stationCount
        const nextPt = stationsRef.current[nextIndex]

        // TODO: direction - Check wrap-around dựa trên direction
        const isWrapping =
          direction === 'left-to-right'
            ? nextIndex === 0 && currentIndex === stationCount - 1
            : nextIndex === stationCount - 1 && currentIndex === 0

        if (isWrapping) {
          const tl = gsap.timeline()
          tl.to(el, { opacity: 0, duration: 0.2, ease: 'power1.out' })
            .set(el, { x: nextPt.x, y: nextPt.y })
            .to(el, { opacity: 1, duration: 0.25, ease: 'power1.inOut' })
        } else {
          gsap.to(el, {
            x: nextPt.x,
            y: nextPt.y,
            duration: 0.45,
            ease: 'power1.inOut',
          })
        }
      })

      offsetRef.current = nextOffset
      setMoveStep((s) => s + 1)
    }

    // Place a small initial delay to ensure layout is ready
    const id = window.setInterval(moveOnce, Math.max(300, delay))
    intervalRef.current = id
    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [delay, items.length, direction]) // TODO: direction - Thêm direction vào dependency

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ position: 'relative', width: '100%', height: '100%' }}
    >
      {/* SVG path layer */}
      <svg
        ref={svgRef}
        viewBox={viewBox}
        preserveAspectRatio="xMidYMid meet"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
        }}
      >
        <path
          ref={pathRef}
          d={pathD}
          fill="none"
          stroke={showPath ? '#e5e7eb' : 'transparent'}
          strokeWidth={showPath ? 2 : 0}
        />
      </svg>

      {/* Items layer */}
      {items.map((item, i) => {
        // Tính toán vị trí thực tế của avatar dựa trên offset hiện tại
        const actualPosition = (i + offsetRef.current) % items.length
        const isEven = actualPosition % 2 === 0
        const src = getItemImageSrc(item)

        return (
          <div
            key={i}
            ref={(el) => {
              itemRefs.current[i] = el
            }}
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: avatarSize,
              height: avatarSize,
              transform: 'translate(-50%, -50%)',
            }}
          >
            {renderItem ? (
              renderItem({
                index: actualPosition, // Sử dụng vị trí thực tế thay vì index gốc
                item,
                src,
                size: avatarSize,
                step: moveStep,
                isEven: isEven, // Sử dụng giá trị isEven được tính từ vị trí thực tế
              })
            ) : (
              <div
                style={{
                  position: 'relative',
                  width: avatarSize,
                  height: avatarSize,
                  borderRadius: '9999px',
                  overflow: 'hidden',
                  boxShadow: '0 6px 16px rgba(0,0,0,0.12)',
                  background: '#f3f4f6',
                }}
              >
                <img
                  src={src}
                  alt={`avatar-${actualPosition}`}
                  width={avatarSize}
                  height={avatarSize}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    const target = e.currentTarget
                    target.style.display = 'none'
                  }}
                />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default PathCarousel
