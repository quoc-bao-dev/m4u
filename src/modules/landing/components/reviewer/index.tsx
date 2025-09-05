'use client'
import { IMAGES } from '@/core/constants/IMAGES'
import { ArrowLeftIcon, ArrowRightIcon } from '@phosphor-icons/react'
import { gsap } from 'gsap'
import React, { UIEventHandler, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import ReviewCard from './ReviewCard'
import Button from '@/core/components/ui/button'

// Dữ liệu mẫu cho ReviewCard
const reviewerData = [
  {
    reviewerImage: IMAGES.reviewer1,
    reviewerAlt: 'reviewer',
    reviewerVideo: 'https://cdn2.videowise.com/converted/videos/1747066892278_wid_NjgyMjIwMGMzZjJiOTAwMDU4OGMxZTNm_h264cmobile.mp4',
    productImage: IMAGES.product1,
    productAlt: 'product',
    brandName: 'MANYO',
    productName: 'Panthetoin Deep Moisture Mask',
    timeInfo: '09h 16m 30s',
    progressPercentage: 70,
    participationText: '70/100 participation',
    buttonText: 'Đăng ký dùng thử'
  },
  {
    reviewerImage: IMAGES.reviewer1,
    reviewerAlt: 'reviewer',
    reviewerVideo: 'https://cdn2.videowise.com/custom-videos/videos/1747066892926_wid_NjgyMjIwMGMzZjJiOTAwMDU4OGMxZWE4.mp4',
    productImage: IMAGES.product1,
    productAlt: 'product',
    brandName: 'COSRX',
    productName: 'Advance Snail 96 Mucin Power Essence',
    timeInfo: '02h 45m 10s',
    progressPercentage: 45,
    participationText: '45/100 participation',
    buttonText: 'Đăng ký dùng thử'
  },
  {
    reviewerImage: IMAGES.reviewer1,
    reviewerAlt: 'reviewer',
    reviewerVideo: 'https://cdn2.videowise.com/custom-videos/videos/1747066889667_wid_NjgyMjIwMDkzZjJiOTAwMDU4OGMxYzJi.mp4',
    productImage: IMAGES.product1,
    productAlt: 'product',
    brandName: 'INNISFREE',
    productName: 'Green Tea Seed Serum',
    timeInfo: '15h 02m 00s',
    progressPercentage: 82,
    participationText: '82/120 participation',
    buttonText: 'Đăng ký dùng thử'
  },
  {
    reviewerImage: IMAGES.reviewer1,
    reviewerAlt: 'reviewer',
    reviewerVideo: 'https://cdn2.videowise.com/custom-videos/videos/1747067655414_wid_NjgyMjIzMDczZjJiOTAwMDU4OGQ5ODRk.mp4',
    productImage: IMAGES.product1,
    productAlt: 'product',
    brandName: 'LANEIGE',
    productName: 'Water Sleeping Mask EX',
    timeInfo: '01h 12m 20s',
    progressPercentage: 30,
    participationText: '30/80 participation',
    buttonText: 'Đăng ký dùng thử'
  },
  {
    reviewerImage: IMAGES.reviewer1,
    reviewerAlt: 'reviewer',
    reviewerVideo: 'https://cdn2.videowise.com/custom-videos/videos/1747067655414_wid_NjgyMjIzMDczZjJiOTAwMDU4OGQ5ODRk.mp4',
    productImage: IMAGES.product1,
    productAlt: 'product',
    brandName: 'SOME BY MI',
    productName: 'AHA-BHA-PHA 30 Days Miracle Toner',
    timeInfo: '20h 00m 00s',
    progressPercentage: 96,
    participationText: '96/100 participation',
    buttonText: 'Đăng ký dùng thử'
  }
]

const Reviewer = () => {
  // Theo dõi item đang ở giữa vùng nhìn của thanh cuộn ngang
  const [activeLoopIndex, setActiveLoopIndex] = useState<number>(0)
  const scrollRef = useRef<HTMLDivElement | null>(null)

  // Hàm tìm phần tử con nằm gần tâm viewport của container nhất
  // Dữ liệu cơ bản của các thẻ (có thể thay bằng dữ liệu thật)
  const baseItems = useMemo(() => reviewerData, [])

  const LOOP_TIMES = 3
  const loopedItems = useMemo(
    () => Array.from({ length: LOOP_TIMES }).flatMap(() => baseItems),
    [baseItems]
  )
  const baseLength = baseItems.length
  const middleStart = baseLength * Math.floor(LOOP_TIMES / 2)

  const computeActiveIndex = useCallback(() => {
    const container = scrollRef.current
    if (!container) return

    const containerRect = container.getBoundingClientRect()
    const containerCenterX = containerRect.left + containerRect.width / 2

    let closestIndex = 0
    let minDistance = Number.POSITIVE_INFINITY

    const children = Array.from(container.children)
    children.forEach((child, index) => {
      const rect = (child as HTMLElement).getBoundingClientRect()
      const childCenterX = rect.left + rect.width / 2
      const distance = Math.abs(childCenterX - containerCenterX)
      if (distance < minDistance) {
        minDistance = distance
        closestIndex = index
      }
    })

    setActiveLoopIndex(closestIndex)
  }, [])

  // Tính toán lần đầu và khi resize
  useEffect(() => {
    computeActiveIndex()
    const onResize = () => computeActiveIndex()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [computeActiveIndex])

  const scrollTween = useRef<gsap.core.Tween | null>(null)
  const activeDelayTimer = useRef<number | null>(null)

  const handleScroll: UIEventHandler<HTMLDivElement> = () => {}

  // Tự động canh giữa item gần trung tâm khi người dùng dừng cuộn
  // Không còn lắng nghe scroll vì đã vô hiệu hóa cuộn tay

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

  const scrollToIndex = (indexInLoop: number) => {
    const el = scrollRef.current
    if (!el) return
    // Đặt active với một độ trễ nhỏ để cảm giác mượt hơn
    if (activeDelayTimer.current) {
      window.clearTimeout(activeDelayTimer.current)
    }
    activeDelayTimer.current = window.setTimeout(() => {
      setActiveLoopIndex(indexInLoop)
    }, 120)
    const scrollLeft = getScrollLeftForIndex(indexInLoop)
    scrollTween.current?.kill()
    scrollTween.current = gsap.to(el, {
      scrollLeft,
      duration: 0.6,
      ease: 'power3.out',
      onComplete: () => {
        const normalized = normalizeToMiddle(indexInLoop)
        setActiveLoopIndex(normalized)
      }
    })
  }

  const scrollByCard = (direction: -1 | 1) => {
    const next = activeLoopIndex + direction
    scrollToIndex(next)
  }

  const centerToIndex = (index: number) => {
    scrollToIndex(index)
  }

  // Cuộn tới cụm giữa khi mount để tránh đụng biên
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
  }, [middleStart])

  return (
    <div className="py-12 xl:py-24 flex flex-col items-center justify-center gap-4 xl:gap-10">
      <div className="flex justify-between items-center w-full px-3 xl:px-24">
        <div className="flex flex-col gap-4">
          <h2 className="2xl:text-6xl xl:text-5xl text-2xl text-center xl:text-left font-bold capitalize text-greyscale-700">
            Reviewer <span className="text-greyscale-400">nói gì?</span>
          </h2>
          <p className="2xl:text-2xl xl:text-xl text-base text-center xl:text-left text-greyscale-700">
            Những video và hình ảnh đánh giá chân thật nhất từ cộng đồng người
            dùng đã trải nghiệm.
          </p>
        </div>
        <div className="hidden xl:flex gap-4 items-center">
          <button onClick={() => scrollByCard(-1)} className="p-5 rounded-full bg-white border border-greyscale-200 hover:bg-greyscale-200 transition-all duration-300 cursor-pointer group">
            <ArrowLeftIcon
              weight="bold"
              className="text-greyscale-700 size-7 group-hover:scale-110 transition-all duration-300"
            />
          </button>
          <button onClick={() => scrollByCard(1)} className="p-5 rounded-full bg-white border border-greyscale-200 hover:bg-greyscale-200 transition-all duration-300 cursor-pointer group">
            <ArrowRightIcon
              weight="bold"
              className="text-greyscale-700 size-7 group-hover:scale-110 transition-all duration-300"
            />
          </button>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="flex items-center gap-4 max-w-full overflow-x-hidden cursor-default select-none h-[620px]"
        onScroll={handleScroll}
      >
        {loopedItems.map((item, idx) => (
          <ReviewCard
            key={`review-${idx}`}
            reviewerImage={item.reviewerImage}
            reviewerVideo={item.reviewerVideo}
            reviewerAlt={item.reviewerAlt}
            productImage={item.productImage}
            productAlt={item.productAlt}
            brandName={item.brandName}
            productName={item.productName}
            timeInfo={item.timeInfo}
            progressPercentage={item.progressPercentage}
            participationText={item.participationText}
            buttonText={item.buttonText}
            isActive={activeLoopIndex === idx}
            onButtonClick={() => {
              console.log('Đăng ký dùng thử clicked')
            }}
            className="cursor-pointer select-none"
            onClick={() => centerToIndex(idx)}
          />
        ))}
      </div>
      <div className="xl:hidden flex gap-4 items-center">
          <button onClick={() => scrollByCard(-1)} className="p-5 rounded-full bg-white border border-greyscale-200 hover:bg-greyscale-200 transition-all duration-300 cursor-pointer group">
            <ArrowLeftIcon
              weight="bold"
              className="text-greyscale-700 size-7 group-hover:scale-110 transition-all duration-300"
            />
          </button>
          <button onClick={() => scrollByCard(1)} className="p-5 rounded-full bg-white border border-greyscale-200 hover:bg-greyscale-200 transition-all duration-300 cursor-pointer group">
            <ArrowRightIcon
              weight="bold"
              className="text-greyscale-700 size-7 group-hover:scale-110 transition-all duration-300"
            />
          </button>
        </div>
      <Button>Xem tất cả</Button>
    </div>
  )
}

export default Reviewer
