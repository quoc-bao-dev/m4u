'use client'
import { IMAGES } from '@/core/constants/IMAGES'
import { ArrowLeftIcon, ArrowRightIcon } from '@phosphor-icons/react'
import { gsap } from 'gsap'
import React, {
  UIEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import ReviewCard from './ReviewCard'
import Button from '@/core/components/ui/button'
import { useGetHomePage } from '@/services/home/queries'
import { Skeleton } from '@/components/ui/skeleton'
import { Link } from '@/locale'

const SNAP_DELAY = 150 // ms

const Reviewer = () => {
  const { isLoading, data: homePage } = useGetHomePage()
  const data = homePage?.section6
  const dataReviewer = homePage?.list_review_new

  const [activeLoopIndex, setActiveLoopIndex] = useState<number>(0)
  const scrollRef = useRef<HTMLDivElement | null>(null)

  const baseItems = useMemo(() => dataReviewer ?? [], [dataReviewer])
  const LOOP_TIMES = 3
  const loopedItems = useMemo(
    () => Array.from({ length: LOOP_TIMES }).flatMap(() => baseItems),
    [baseItems]
  )

  const baseLength = baseItems.length
  const middleStart = baseLength * Math.floor(LOOP_TIMES / 2)

  // ---- helper: index gần tâm container
  const getClosestIndex = useCallback(() => {
    const container = scrollRef.current
    if (!container) return 0
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
    return closestIndex
  }, [])

  const computeActiveIndex = useCallback(() => {
    setActiveLoopIndex(getClosestIndex())
  }, [getClosestIndex])

  useEffect(() => {
    computeActiveIndex()
    const onResize = () => computeActiveIndex()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [computeActiveIndex])

  const scrollTween = useRef<gsap.core.Tween | null>(null)
  const activeDelayTimer = useRef<number | null>(null)
  const scrollIdleTimer = useRef<number | null>(null)

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
    if (baseLength === 0) return indexInLoop
    const relative = ((indexInLoop % baseLength) + baseLength) % baseLength
    const normalizedIndex = middleStart + relative
    if (normalizedIndex === indexInLoop) return indexInLoop
    el.scrollLeft = getScrollLeftForIndex(normalizedIndex)
    return normalizedIndex
  }

  const scrollToIndex = (indexInLoop: number) => {
    const el = scrollRef.current
    if (!el) return
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

  // ---- Auto snap khi ngừng cuộn kéo ngang
  const scheduleAutoSnap = useCallback(() => {
    if (scrollIdleTimer.current) {
      window.clearTimeout(scrollIdleTimer.current)
    }
    scrollIdleTimer.current = window.setTimeout(() => {
      if (dragState.current.isDown) return
      const closest = getClosestIndex()
      scrollToIndex(closest)
    }, SNAP_DELAY)
  }, [getClosestIndex])

  const handleScroll: UIEventHandler<HTMLDivElement> = () => {
    scheduleAutoSnap()
  }

  // ---- Wheel: CHỈ xử lý khi có cuộn ngang; cuộn dọc thì để trang xử lý
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const el = scrollRef.current
    if (!el) return
    const absX = Math.abs(e.deltaX)
    const absY = Math.abs(e.deltaY)

    // Chỉ khi deltaX trội hơn deltaY mới cuộn slider
    if (absX > absY + 2 && e.deltaX !== 0) {
      e.preventDefault() // ngăn trang cuộn khi thao tác ngang
      scrollTween.current?.kill()
      el.scrollLeft += e.deltaX
      scheduleAutoSnap()
    }
    // Ngược lại: KHÔNG preventDefault -> để trang cuộn dọc bình thường
  }

  // ---- Drag ngang có khoá hướng; drag dọc -> để trang cuộn
  const dragState = useRef({
    isDown: false,
    startX: 0,
    startY: 0,
    startScrollLeft: 0,
    lastX: 0,
    lastTime: 0,
    velocity: 0,
    moved: false,
    pointerId: -1,
    lock: 'none' as 'none' | 'h' | 'v',
  })

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollRef.current
    if (!el) return
    scrollTween.current?.kill()
    dragState.current.isDown = true
    dragState.current.startX = e.clientX
    dragState.current.startY = e.clientY
    dragState.current.startScrollLeft = el.scrollLeft
    dragState.current.lastX = e.clientX
    dragState.current.lastTime = performance.now()
    dragState.current.velocity = 0
    dragState.current.moved = false
    dragState.current.pointerId = e.pointerId
    dragState.current.lock = 'none'
    // KHÔNG capture ngay, chờ xác định hướng để không chặn scroll dọc
  }

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragState.current.isDown) return
    const el = scrollRef.current
    if (!el) return

    const dx = e.clientX - dragState.current.startX
    const dy = e.clientY - dragState.current.startY

    // Xác định hướng nếu chưa khoá
    if (dragState.current.lock === 'none') {
      const move = Math.hypot(dx, dy)
      if (move < 6) return
      if (Math.abs(dx) > Math.abs(dy) + 2) {
        dragState.current.lock = 'h'
        try {
          ;(e.target as Element)?.setPointerCapture?.(
            dragState.current.pointerId
          )
        } catch {}
      } else {
        dragState.current.lock = 'v'
        // Không capture -> để trình duyệt cuộn dọc trang
        return
      }
    }

    if (dragState.current.lock === 'h') {
      el.scrollLeft = dragState.current.startScrollLeft - dx

      const now = performance.now()
      const dt = Math.max(1, now - dragState.current.lastTime)
      const instV = (e.clientX - dragState.current.lastX) / dt // px/ms
      dragState.current.velocity =
        dragState.current.velocity * 0.8 + instV * 0.2
      dragState.current.lastX = e.clientX
      dragState.current.lastTime = now

      if (Math.abs(dx) > 3) dragState.current.moved = true
    }
    // lock === 'v' -> bỏ qua, để trang cuộn
  }

  const inertialScroll = () => {
    const el = scrollRef.current
    if (!el) return
    const v = dragState.current.velocity // px/ms
    const distance = -v * 500
    scrollTween.current?.kill()
    if (Math.abs(distance) < 1) {
      const closest = getClosestIndex()
      scrollToIndex(closest)
      return
    }
    scrollTween.current = gsap.to(el, {
      scrollLeft: el.scrollLeft + distance,
      duration: 0.6,
      ease: 'power3.out',
      onComplete: () => {
        const closest = getClosestIndex()
        scrollToIndex(closest)
      },
    })
  }

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragState.current.isDown) return
    const wasHorizontal = dragState.current.lock === 'h'
    dragState.current.isDown = false
    try {
      ;(e.target as Element)?.releasePointerCapture?.(
        dragState.current.pointerId
      )
    } catch {}
    if (wasHorizontal) inertialScroll()
    dragState.current.lock = 'none'
  }

  // Cuộn tới cụm giữa khi mount
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    if (baseLength === 0) return
    const children = Array.from(el.children) as HTMLElement[]
    const target = children[middleStart]
    if (!target) return
    const containerCenter = el.clientWidth / 2
    const targetCenter = target.offsetLeft + target.clientWidth / 2
    el.scrollLeft = targetCenter - containerCenter
    setActiveLoopIndex(middleStart)
  }, [middleStart, baseLength])

  useEffect(() => {
    return () => {
      scrollTween.current?.kill()
      if (activeDelayTimer.current)
        window.clearTimeout(activeDelayTimer.current)
      if (scrollIdleTimer.current) window.clearTimeout(scrollIdleTimer.current)
    }
  }, [])

  if (!isLoading && dataReviewer?.length === 0) return null

  const handleCardClick = (idx: number) => {
    // Chỉ center nếu không vừa kéo ngang
    if (dragState.current.moved && dragState.current.lock === 'h') return
    centerToIndex(idx)
  }

  return (
    <div className="py-12 xl:py-24 flex flex-col items-center justify-center gap-4 xl:gap-10">
      <div className="flex justify-between items-center w-full px-3 xl:px-24">
        <div className="flex flex-col gap-2 xl:gap-4 w-full">
          {isLoading ? (
            <Skeleton className="w-2/5 h-12" />
          ) : (
            <div
              className="2xl:text-6xl xl:text-5xl text-2xl text-center lg:text-left font-bold capitalize text-greyscale-700"
              dangerouslySetInnerHTML={{ __html: data?.title }}
            ></div>
          )}
          {isLoading ? (
            <Skeleton className="w-4/5 h-7" />
          ) : (
            <p className="2xl:text-2xl xl:text-xl text-base text-center xl:text-left text-greyscale-700">
              {data?.subtitle}
            </p>
          )}
        </div>
        {/* Desktop Content */}
        <div className="hidden xl:flex gap-4 items-center">
          <button
            onClick={() => scrollByCard(-1)}
            className="p-5 rounded-full bg-white border border-greyscale-200 hover:bg-greyscale-200 transition-all duration-300 cursor-pointer group"
          >
            <ArrowLeftIcon
              weight="bold"
              className="text-greyscale-700 size-7 group-hover:scale-110 transition-all duration-300"
            />
          </button>
          <button
            onClick={() => scrollByCard(1)}
            className="p-5 rounded-full bg-white border border-greyscale-200 hover:bg-greyscale-200 transition-all duration-300 cursor-pointer group"
          >
            <ArrowRightIcon
              weight="bold"
              className="text-greyscale-700 size-7 group-hover:scale-110 transition-all duration-300"
            />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex items-center gap-4 w-full max-w-full overflow-x-hidden cursor-default select-none h-[450px] md:h-[630px]"
        style={{ touchAction: 'pan-y' }} // cho phép cuộn dọc trang
        onScroll={handleScroll}
        onWheel={handleWheel} // chỉ xử lý khi có deltaX
        onPointerDown={onPointerDown} // kéo ngang khi khoá 'h'
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {isLoading ? (
          <>
            <Skeleton className="w-full h-full" />
            <Skeleton className="w-full h-full" />
            <Skeleton className="w-full h-full" />
          </>
        ) : (
          loopedItems.map((item, idx) => (
            <ReviewCard
              key={`review-${idx}`}
              data={item}
              isActive={activeLoopIndex === idx}
              className="cursor-pointer select-none"
              onClick={() => handleCardClick(idx)}
            />
          ))
        )}
      </div>

      {/* Tablet Content */}
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

      <Link href="/review-hub">
        <Button>{data?.title_button}</Button>
      </Link>
    </div>
  )
}

export default Reviewer
