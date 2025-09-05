'use client'

import { IMAGES } from '@/core/constants/IMAGES'
import { Lightning } from '@/icons'
import { ArrowLeftIcon, ArrowRightIcon, StarIcon } from '@phosphor-icons/react'
import { gsap } from 'gsap'
import Image from 'next/image'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

const deals = [
  {
    id: 1,
    title: 'MANYO',
    description: 'Panthetoin Deep Moisture Mask',
    participation: '70/100 participation',
    image: IMAGES.deal1,
    bgColor: 'bg-pink-200',
    hex: '#FE6BBA',
  },
  {
    id: 2,
    title: 'MANYO',
    description: 'Panthetoin Deep Moisture Mask',
    participation: '70/100 participation',
    image: IMAGES.deal2,
    bgColor: 'bg-yellow-300',
    hex: '#FDE047',
  },
  {
    id: 3,
    title: 'MANYO',
    description: 'Panthetoin Deep Moisture Mask',
    participation: '70/100 participation',
    image: IMAGES.deal3,
    bgColor: 'bg-green-200',
    hex: '#BBF7D0',
  },
  {
    id: 4,
    title: 'MANYO',
    description: 'Panthetoin Deep Moisture Mask',
    participation: '70/100 participation',
    image: IMAGES.deal1,
    bgColor: 'bg-pink-200',
    hex: '#FBCFE8',
  },
  {
    id: 5,
    title: 'MANYO',
    description: 'Panthetoin Deep Moisture Mask',
    participation: '70/100 participation',
    image: IMAGES.deal2,
    bgColor: 'bg-yellow-300',
    hex: '#FDE047',
  },
]

const GAP_PX = 40
const DURATION = 0.6

const Deal: React.FC = () => {
  // Mảng hiển thị có clone hai đầu: [last, ...deals, first]
  const loopDeals = useMemo(() => {
    const first = deals[0]
    const last = deals[deals.length - 1]
    return [last, ...deals, first]
  }, [])

  // center index bắt đầu ở 1 (item thật đầu tiên)
  const [index, setIndex] = useState(1)
  const viewportRef = useRef<HTMLDivElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const bgRef = useRef<HTMLDivElement | null>(null)

  const tweenRef = useRef<gsap.core.Tween | null>(null)
  const maxCenter = loopDeals.length - 2 // index thật cuối = maxCenter

  // map index trong loop → index trong deals (để set màu active đúng item thật)
  const getRealDealByIndex = (centerIdx: number) => {
    if (centerIdx === 0) return deals[deals.length - 1] // clone last
    if (centerIdx === maxCenter + 1) return deals[0] // clone first
    return deals[centerIdx - 1] // item thật
  }

  const applyLayout = useCallback(
    (centerIdx: number, animate = false, onDone?: () => void) => {
      const vp = viewportRef.current
      const track = trackRef.current
      if (!vp || !track) return

      // bề rộng content (loại padding px-24)
      const cs = getComputedStyle(vp)
      const pl = parseFloat(cs.paddingLeft) || 0
      const pr = parseFloat(cs.paddingRight) || 0
      const contentWidth = vp.clientWidth - pl - pr

      // side + center + side + 2*GAP = contentWidth ; side=0.4k, center=0.6k → 1.4k+2GAP=contentWidth
      const k = (contentWidth - 2 * GAP_PX) / 1.4
      const sideWidth = 0.4 * k
      const centerWidth = 0.6 * k

      // set width card theo center
      const cards = Array.from(track.children) as HTMLElement[]
      cards.forEach((card, i) => {
        const w = i === centerIdx ? centerWidth : sideWidth
        card.style.width = `${w}px`
        card.style.flex = '0 0 auto'
      })

      // tính x để card center nằm ở giữa bố cục [side] [GAP] [center] [GAP] [side]
      const sumLeft = centerIdx * (sideWidth + GAP_PX)
      const targetLeft = sideWidth + GAP_PX
      const x = targetLeft - sumLeft

      // animate hoặc set tức thời
      tweenRef.current?.kill()
      if (animate) {
        tweenRef.current = gsap.to(track, {
          x,
          duration: DURATION,
          ease: 'power3.inOut',
          onComplete: () => {
            onDone?.()
          },
        })
      } else {
        gsap.set(track, { x })
        onDone?.()
      }

      // đổi màu nền theo item thật
      const real = getRealDealByIndex(centerIdx)
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          backgroundColor: real.hex,
          duration: animate ? 0.8 : 0,
          ease: 'power2.inOut',
        })
      }
    },
    [maxCenter]
  )

  // đi tới index (cho phép đi vào clone 0 hoặc maxCenter+1)
  const goTo = (to: number) => {
    setIndex(to)
    // sau khi animate xong, nếu đang ở clone → nhảy về index thật tương ứng (không animate)
    applyLayout(to, true, () => {
      if (to === 0) {
        setIndex(maxCenter)
        applyLayout(maxCenter, false)
      } else if (to === maxCenter + 1) {
        setIndex(1)
        applyLayout(1, false)
      }
    })
  }

  const handlePrev = () => goTo(index - 1)
  const handleNext = () => goTo(index + 1)

  // init + resize
  useEffect(() => {
    applyLayout(index, false)
    const onResize = () => applyLayout(index, false)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [index, applyLayout])

  return (
    <div className="relative py-24 flex flex-col items-center justify-center gap-10">
      {/* Vòng tròn mờ đổi màu */}
      <div
        ref={bgRef}
        className="z-[-1] absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] rounded-full opacity-20 blur-[140px]"
      />

      <div className="flex justify-between items-center w-full px-24">
        <div className="flex flex-col gap-4">
          <h2 className="2xl:text-6xl text-5xl font-bold text-greyscale-700">
            Cơ hội độc quyền{' '}
            <span className="text-greyscale-400">dành cho bạn</span>
          </h2>
          <p className="2xl:text-2xl text-xl text-greyscale-700">
            Ưu đãi độc quyền trong ngày. Số lượng giới hạn, đăng ký ngay trước
            khi hết!
          </p>
        </div>
        <div className="flex gap-4 items-center">
          {/* Infinite → không cần disabled */}
          <button
            onClick={handlePrev}
            className="p-5 rounded-full bg-white border border-greyscale-200 hover:bg-greyscale-200"
          >
            <ArrowLeftIcon
              weight="bold"
              className="text-greyscale-700 size-7"
            />
          </button>
          <button
            onClick={handleNext}
            className="p-5 rounded-full bg-white border border-greyscale-200 hover:bg-greyscale-200"
          >
            <ArrowRightIcon
              weight="bold"
              className="text-greyscale-700 size-7"
            />
          </button>
        </div>
      </div>

      {/* Viewport */}
      <div ref={viewportRef} className="w-full px-24">
        <div
          ref={trackRef}
          className="flex items-center gap-10 will-change-transform"
        >
          {loopDeals.map((deal, i) => (
            <div
              key={`deal-${i}-${deal.id}`}
              className="relative shadow-[0px_4px_24px_0px_#0000000F] rounded-3xl h-fit"
              style={{
                transform: i === index ? 'scale(1.02)' : 'scale(0.98)',
                transition: 'transform 300ms ease',
              }}
            >
              <div className="rounded-t-3xl relative overflow-hidden">
                <div
                  className="absolute inset-0 -z-10"
                  style={{
                    background: `radial-gradient(circle, white 0%, ${deal.hex}4D 50%)`,
                  }}
                />
                <div className="absolute top-4 left-4 flex items-center gap-1 bg-white rounded-full py-0.5 px-1.5 text-base font-medium text-greyscale-900">
                  <StarIcon weight="fill" className="size-5 text-yellow-600" />
                  4.9
                </div>
                <Image
                  src={deal.image}
                  alt="deal"
                  width={500}
                  height={500}
                  className="w-full h-full object-cover rounded-t-3xl"
                />
              </div>
              <div
                className={`p-5 flex flex-col gap-1 ${deal.bgColor} rounded-b-3xl`}
              >
                <h3 className="text-sm font-bold text-greyscale-900">
                  {deal.title}
                </h3>
                <h3 className="text-greyscale-900 text-lg truncate">
                  {deal.description}
                </h3>
                <div className="py-1">
                  <div className="relative w-full h-1.5">
                    <div className="relative" style={{ width: `70%` }}>
                      <div className="h-1.5 w-full rounded-full bg-gradient-to-r from-[#FF9800] via-[#EF6C00] to-[#FF8500]" />
                      <Lightning className="size-6 absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2" />
                    </div>
                    <div className="opacity-20 absolute top-0 left-0 h-1.5 w-full rounded-full bg-gradient-to-r from-[#FF9800] via-[#EF6C00] to-[#FF8500]" />
                  </div>
                </div>
                <p className="text-sm text-greyscale-700">
                  {deal.participation}
                </p>
                <button
                  className="cursor-pointer w-fit mt-4 py-4 px-5 border hover:text-white rounded-full"
                  style={{ borderColor: deal.hex, color: deal.hex }}
                >
                  Đăng ký dùng thử
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Deal
