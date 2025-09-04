'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface SvgScrollDrawProps {
  children: React.ReactElement<SVGSVGElement>
  className?: string
  strokeColor?: string
  strokeWidth?: number
  start?: string
  end?: string
  scrub?: boolean | number
  markers?: boolean
  triggerTarget?: string
  showMarker?: boolean
  markerType?: 'arrow' | 'dot'
  markerColor?: string
  markerSize?: number
  // If set, only reveal a moving segment behind the marker
  trailRatio?: number // 0..1 of total path length
  // Fine tune marker placement relative to path (in px)
  markerOffset?: number // shift perpendicular to path (normal)
  markerOffsetAlong?: number // shift along the path (tangential)
}

const SvgScrollDraw: React.FC<SvgScrollDrawProps> = ({
  children,
  className,
  strokeColor = '#FF8092',
  strokeWidth = 2,
  start = 'top 80%',
  end = 'bottom 20%',
  scrub = true,
  markers = false,
  triggerTarget,
  showMarker = false,
  markerType = 'arrow',
  markerColor = '#FF8092',
  markerSize = 10,
  trailRatio,
  markerOffset = 0,
  markerOffsetAlong = 0,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return
    const svg = wrapper.querySelector('svg') as SVGSVGElement | null
    if (!svg) return

    const paths = Array.from(svg.querySelectorAll('path')) as SVGPathElement[]
    if (paths.length === 0) return

    // prepare: set stroke styles and dasharray
    const pathLengths = paths.map((path) => {
      const length = path.getTotalLength()
      path.style.stroke = strokeColor
      path.style.fill = 'transparent'
      path.style.strokeWidth = String(strokeWidth)
      path.style.strokeDasharray = `${length}`
      path.style.strokeDashoffset = `${length}`
      path.style.strokeLinecap = 'round'
      path.style.strokeLinejoin = 'round'
      path.style.vectorEffect = 'non-scaling-stroke'
      return length
    })

    // Optional: marker that follows first path
    let markerEl: SVGGraphicsElement | null = null
    const mainPath = paths[0]
    const mainLength = pathLengths[0] ?? 0
    if (showMarker && mainPath && mainLength > 0) {
      const ns = 'http://www.w3.org/2000/svg'
      if (markerType === 'dot') {
        const circle = document.createElementNS(ns, 'circle')
        circle.setAttribute('r', String(markerSize))
        circle.setAttribute('fill', markerColor)
        circle.setAttribute('opacity', '0.95')
        circle.style.pointerEvents = 'none'
        svg.appendChild(circle)
        markerEl = circle
      } else {
        // arrow (tip at 0,0; centered vertically around Y=0)
        const g = document.createElementNS(ns, 'g')
        const path = document.createElementNS(ns, 'path')
        // triangle pointing to +X with center on the stroke midline
        path.setAttribute('d', 'M0 0 L-1 0.6 L-1 -0.6 Z')
        path.setAttribute('fill', markerColor)
        g.appendChild(path)
        g.setAttribute('opacity', '0.95')
        g.style.pointerEvents = 'none'
        // initial scale (unit -> px)
        g.setAttribute('transform', `translate(0,0) scale(${markerSize})`)
        svg.appendChild(g)
        markerEl = g
      }
    }

    const st = ScrollTrigger.create({
      trigger: triggerTarget ? document.querySelector(triggerTarget) || wrapper : wrapper,
      start,
      end,
      scrub,
      markers,
      onUpdate: (self) => {
        const p = Math.min(Math.max(self.progress, 0), 1)
        // reveal stroke based on progress
        paths.forEach((path, i) => {
          const L = pathLengths[i]
          if (trailRatio && trailRatio > 0 && trailRatio <= 1) {
            const visible = Math.max(1, L * trailRatio)
            // single moving dash: set dasharray to [visible, L] and offset so that only a segment behind marker shows
            path.style.strokeDasharray = `${visible} ${L}`
            const len = p * L
            // offset so the visible segment ends at current len
            path.style.strokeDashoffset = `${L - len}`
          } else {
            // cumulative reveal: dashoffset shrinks from full to 0
            const dash = (1 - p) * L
            path.style.strokeDashoffset = `${dash}`
          }
          path.style.opacity = '1'
        })

        if (!markerEl || !mainPath) return
        const len = p * mainLength
        const pt = mainPath.getPointAtLength(len)
        const delta = 1
        const ptNext = mainPath.getPointAtLength(Math.min(len + delta, mainLength))
        const rad = Math.atan2(ptNext.y - pt.y, ptNext.x - pt.x)
        const angle = rad * (180 / Math.PI)
        if (markerType === 'dot') {
          const circle = markerEl as SVGCircleElement
          const nx = -Math.sin(rad)
          const tx = Math.cos(rad)
          const ny = Math.cos(rad)
          const ty = Math.sin(rad)
          const x = pt.x + tx * markerOffsetAlong + nx * markerOffset
          const y = pt.y + ty * markerOffsetAlong + ny * markerOffset
          circle.setAttribute('cx', String(x))
          circle.setAttribute('cy', String(y))
        } else {
          const g = markerEl as SVGGElement
          const nx = -Math.sin(rad)
          const tx = Math.cos(rad)
          const ny = Math.cos(rad)
          const ty = Math.sin(rad)
          const x = pt.x + tx * markerOffsetAlong + nx * markerOffset
          const y = pt.y + ty * markerOffsetAlong + ny * markerOffset
          g.setAttribute('transform', `translate(${x}, ${y}) rotate(${angle}) scale(${markerSize})`)
        }
      },
    })

    return () => {
      st.kill()
      if (markerEl && markerEl.parentNode) {
        markerEl.parentNode.removeChild(markerEl)
      }
    }
  }, [strokeColor, strokeWidth, start, end, scrub, markers, triggerTarget, showMarker, markerType, markerColor, markerSize, trailRatio, markerOffset, markerOffsetAlong])

  return (
    <div ref={wrapperRef} className={className}>
      {children}
    </div>
  )
}

export default SvgScrollDraw


