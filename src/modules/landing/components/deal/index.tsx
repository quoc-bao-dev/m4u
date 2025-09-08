'use client'

import { IMAGES } from '@/core/constants/IMAGES'
import { Lightning } from '@/icons'
import { ArrowLeftIcon, ArrowRightIcon, StarIcon } from '@phosphor-icons/react'
import Image from 'next/image'
import React, {
  UIEventHandler,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { gsap } from 'gsap'

const deals = [
  {
    id: 1,
    title: 'MANYO',
    description: 'Panthetoin Deep Moisture Mask',
    participation: '70/100 participation',
    image: IMAGES.deal1,
    bgColor: '#FFE1F1',
    hex: '#FE6BBA',
  },
  {
    id: 2,
    title: 'MANYO',
    description: 'Panthetoin Deep Moisture Mask',
    participation: '70/100 participation',
    image: IMAGES.deal2,
    bgColor: '#FDEAB7',
    hex: '#FACA4A',
  },
  {
    id: 3,
    title: 'MANYO',
    description: 'Panthetoin Deep Moisture Mask',
    participation: '70/100 participation',
    image: IMAGES.deal3,
    bgColor: '#D1F7EA',
    hex: '#10805B',
  },
  {
    id: 4,
    title: 'MANYO',
    description: 'Panthetoin Deep Moisture Mask',
    participation: '70/100 participation',
    image: IMAGES.deal1,
    bgColor: '#FFE1F1',
    hex: '#FE6BBA',
  },
  {
    id: 5,
    title: 'MANYO',
    description: 'Panthetoin Deep Moisture Mask',
    participation: '70/100 participation',
    image: IMAGES.deal2,
    bgColor: '#FDEAB7',
    hex: '#FACA4A',
  },
]

const Deal: React.FC = () => {
  const [activeLoopIndex, setActiveLoopIndex] = useState<number>(0)
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const bgRef = useRef<HTMLDivElement | null>(null)
  const baseItems = useMemo(() => deals, [])
  const LOOP_TIMES = 3
  const loopedItems = useMemo(
    () => Array.from({ length: LOOP_TIMES }).flatMap(() => baseItems),
    [baseItems]
  )
  const baseLength = baseItems.length
  const middleStart = baseLength * Math.floor(LOOP_TIMES / 2)

  const getScrollLeftForIndex = (index: number) => {
    const el = scrollRef.current
    if (!el) return 0
    const children = Array.from(el.children) as HTMLElement[]
    const target = children[index]
    if (!target) return el.scrollLeft
    const containerCenter = el.clientWidth / 2
    const targetCenter = target.offsetLeft + target.clientWidth / 2
    return targetCenter - containerCenter
  }

  const normalizeToMiddle = (indexInLoop: number) => {
    const el = scrollRef.current
    if (!el) return indexInLoop
    const relative = ((indexInLoop % baseLength) + baseLength) % baseLength
    const normalizedIndex = middleStart + relative
    if (normalizedIndex === indexInLoop) return indexInLoop
    el.scrollLeft = getScrollLeftForIndex(normalizedIndex)
    return normalizedIndex
  }

  const scrollTween = useRef<gsap.core.Tween | null>(null)

  const getRelativeIndex = (indexInLoop: number) => {
    return ((indexInLoop % baseLength) + baseLength) % baseLength
  }

  const tweenBgToHex = (hex: string) => {
    if (!bgRef.current) return
    gsap.to(bgRef.current, {
      backgroundColor: hex,
      duration: 0.6,
      ease: 'power2.out',
    })
  }

  const updateCardVisuals = () => {
    const el = scrollRef.current
    if (!el) return
    const containerCenter = el.clientWidth / 2
    const maxEffectDistance = el.clientWidth * 0.35
    const wrappers = Array.from(el.children) as HTMLElement[]
    wrappers.forEach((wrapper) => {
      const inner =
        (wrapper.querySelector('.deal-card') as HTMLElement) || wrapper
      const rectLeft = wrapper.offsetLeft - el.scrollLeft
      const childCenter = rectLeft + wrapper.clientWidth / 2
      const distance = Math.abs(childCenter - containerCenter)
      const t = Math.min(1, distance / maxEffectDistance)
      const scale = 0.96 + (1 - t) * 0.24
      const shadowStrength = 0.06 + (1 - t) * 0.1
      inner.style.transform = `scale(${scale}) translateZ(0)`
      inner.style.boxShadow = `0px 12px 28px rgba(0,0,0,${shadowStrength})`
      wrapper.style.zIndex = String(1 + Math.round((1 - t) * 2))
      wrapper.style.visibility = 'visible'
      wrapper.style.pointerEvents = 'auto'
    })
  }

  const scrollToIndex = (indexInLoop: number) => {
    const el = scrollRef.current
    if (!el) return
    // Cố định active về cụm giữa để tránh nhảy phần tử khi normalize
    const relative = ((indexInLoop % baseLength) + baseLength) % baseLength
    const normalizedTarget = middleStart + relative
    setActiveLoopIndex(normalizedTarget)
    const scrollLeft = getScrollLeftForIndex(indexInLoop)
    // Tween nền tới màu của mục tiêu
    const targetHex = baseItems[getRelativeIndex(indexInLoop)].hex
    tweenBgToHex(targetHex)
    scrollTween.current?.kill()
    scrollTween.current = gsap.to(el, {
      scrollLeft,
      duration: 0.7,
      ease: 'power4.out',
      onUpdate: updateCardVisuals,
      onComplete: () => {
        normalizeToMiddle(indexInLoop)
        updateCardVisuals()
      },
    })
  }

  const scrollByCard = (direction: -1 | 1) => {
    const next = activeLoopIndex + direction
    scrollToIndex(next)
  }

  const centerToIndex = (index: number) => {
    scrollToIndex(index)
  }

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const children = Array.from(el.children) as HTMLElement[]
    const target = children[middleStart]
    if (!target) return
    const containerCenter = el.clientWidth / 2
    const targetCenter = target.offsetLeft + target.clientWidth / 2
    el.scrollLeft = targetCenter - containerCenter
    setActiveLoopIndex(middleStart)
    // Khởi tạo màu nền theo item ở giữa cụm giữa
    const initHex = baseItems[getRelativeIndex(middleStart)].hex
    if (bgRef.current) {
      bgRef.current.style.backgroundColor = initHex
    }
    // Cập nhật scale/đổ bóng ban đầu
    requestAnimationFrame(updateCardVisuals)
  }, [middleStart])

  const handleScroll: UIEventHandler<HTMLDivElement> = () => {
    updateCardVisuals()
  }

  const getCardVisualState = (idx: number) => {
    const distance = Math.abs(idx - activeLoopIndex)
    if (distance === 0) {
      return {
        scale: 1.2,
        shadow: '0px 2px 6px rgba(0,0,0,0.05)',
        zIndex: 3,
      }
    }
    if (distance === 1) {
      return {
        scale: 0.8,
        shadow: '0px 12px 12px rgba(0,0,0,0.12)',
        zIndex: 2,
      }
    }
    return {
      scale: 0.8,
      shadow: '0px 4px 16px rgba(0,0,0,0.08)',
      zIndex: 1,
    }
  }

  return (
    <div className="relative py-12 xl:py-24 flex flex-col items-center justify-center gap-4 xl:gap-10">
      {/* Vòng tròn mờ đổi màu */}
      <div
        ref={bgRef}
        className="z-[2] absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] rounded-full opacity-20 blur-[140px] pointer-events-none"
      />

      <div className="z-[3] flex justify-between items-center w-full px-3 lg:px-10 xl:px-24">
        <div className="flex flex-col gap-2 xl:gap-4">
          <h2 className="2xl:text-6xl xl:text-5xl text-2xl text-center lg:text-left font-bold text-greyscale-700">
            Cơ hội độc quyền <br className="lg:hidden" />
            <span className="text-greyscale-400">dành cho bạn</span>
          </h2>
          <p className="2xl:text-2xl xl:text-xl text-base text-center xl:text-left text-greyscale-700">
            Ưu đãi độc quyền trong ngày. Số lượng giới hạn, đăng ký ngay trước
            khi hết!
          </p>
        </div>
        <div className="hidden xl:flex gap-4 items-center">
          <button
            onClick={() => scrollByCard(-1)}
            className="p-5 rounded-full bg-white border border-greyscale-200 hover:bg-greyscale-200"
          >
            <ArrowLeftIcon
              weight="bold"
              className="text-greyscale-700 size-7"
            />
          </button>
          <button
            onClick={() => scrollByCard(1)}
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
      <div className="z-[3] w-full h-[560px] xl:h-[680px] px-0 lg:px-10 xl:px-32 cursor-default select-none">
        <div
          ref={scrollRef}
          className="flex items-center gap-4 lg:gap-3 h-full overflow-x-hidden snap-x snap-mandatory"
          onScroll={handleScroll}
        >
          {loopedItems.map((deal, index) => {
            const { scale, shadow, zIndex } = getCardVisualState(index)
            return (
              <div
                key={`wrapper-${index}-${deal.id}`}
                className="shrink-0 px-2 lg:px-3 xl:px-3 lg:basis-1/3 snap-center"
              >
                <div
                  key={`deal-${index}-${deal.id}`}
                  className={`deal-card relative rounded-3xl h-fit w-full
                ${
                  activeLoopIndex === index
                    ? 'cursor-default'
                    : 'cursor-pointer'
                } select-none`}
                  style={{
                    transform: `scale(${scale})`,
                    boxShadow: shadow,
                    zIndex,
                    transformOrigin: 'center center',
                    transition: 'transform 500ms ease, box-shadow 500ms ease',
                  }}
                  role="button"
                  tabIndex={activeLoopIndex === index ? -1 : 0}
                  aria-current={activeLoopIndex === index ? 'true' : 'false'}
                  onClick={() => centerToIndex(index)}
                >
                  <div className="rounded-t-3xl relative overflow-hidden">
                    <div
                      className="absolute inset-0 -z-10"
                      style={{
                        background: `radial-gradient(circle, white 0%, ${deal.hex}26 )`,
                      }}
                    />
                    <div className="absolute top-3 xl:top-4 left-3 xl:left-4 flex items-center gap-1 bg-white rounded-full py-0.5 px-1.5 text-xs xl:text-base font-medium text-greyscale-900">
                      <StarIcon
                        weight="fill"
                        className="size-3 xl:size-5 text-yellow-600"
                      />
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
                    className="p-3 xl:p-5 flex flex-col gap-1 rounded-b-3xl"
                    style={{ backgroundColor: `${deal.bgColor}` }}
                  >
                    <h3 className="text-xs xl:text-sm font-bold text-greyscale-900">
                      {deal.title}
                    </h3>
                    <h3 className="text-greyscale-900 text-sm xl:text-lg truncate">
                      {deal.description}
                    </h3>
                    <div className="py-1">
                      <div className="relative w-full h-1.5">
                        <div className="relative" style={{ width: `70%` }}>
                          <div className="h-1.5 w-full rounded-full bg-gradient-to-r from-[#FF9800] via-[#EF6C00] to-[#FF8500]" />
                          <Lightning className="size-5 xl:size-6 absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2" />
                        </div>
                        <div className="opacity-20 absolute top-0 left-0 h-1.5 w-full rounded-full bg-gradient-to-r from-[#FF9800] via-[#EF6C00] to-[#FF8500]" />
                      </div>
                    </div>
                    <p className="text-xs xl:text-sm text-greyscale-700">
                      {deal.participation}
                    </p>
                    <button
                      className="w-fit mt-3 xl:mt-4 py-2 xl:py-4 px-3 xl:px-5 rounded-full cursor-pointer text-sm xl:text-base"
                      style={{
                        border: `1px solid ${deal.hex}`,
                        color: deal.hex,
                        backgroundColor: 'transparent',
                        transition: 'all 300ms ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = deal.hex
                        e.currentTarget.style.color = '#000'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent'
                        e.currentTarget.style.color = deal.hex
                      }}
                    >
                      Đăng ký dùng thử
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Mobile navigation buttons */}
      <div className="xl:hidden flex gap-4 items-center">
        <button
          onClick={() => scrollByCard(-1)}
          className="p-4 xl:p-5 rounded-full bg-white border border-greyscale-200 hover:bg-greyscale-200 transition-all duration-300 cursor-pointer group"
        >
          <ArrowLeftIcon
            weight="bold"
            className="text-greyscale-700 size-7 group-hover:scale-110 transition-all duration-300"
          />
        </button>
        <button
          onClick={() => scrollByCard(1)}
          className="p-4 xl:p-5 rounded-full bg-white border border-greyscale-200 hover:bg-greyscale-200 transition-all duration-300 cursor-pointer group"
        >
          <ArrowRightIcon
            weight="bold"
            className="text-greyscale-700 size-7 group-hover:scale-110 transition-all duration-300"
          />
        </button>
      </div>
    </div>
  )
}

export default Deal
