'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import ReviewerAvatar from './ReviewerAvatar'
// Local animation config for this component
// const LOCAL_ANIMATION = {
//   fadeDuration: 0.9,
//   opacity: 0.2,
//   translateX: -10,
//   intervalMs: 5000,
//   ease: 'linear' as const,
// }

const LOCAL_ANIMATION = {
  fadeDuration: 0.9,
  opacity: 0.8,
  translateX: 0,
  intervalMs: 5000,
  ease: 'easeInOut' as const,
}

type Reviewer = {
  src: string
  name: string
  jobTitle: string
}
const reviewers: Reviewer[] = [
  {
    src: '/image/reviewer-carousel/image-01.jpg',
    name: 'Linh Trần',
    jobTitle: 'Giúp việc',
  },
  {
    src: '/image/reviewer-carousel/image-02.jpg',
    name: 'Đào Bùi',
    jobTitle: 'Nội trợ',
  },
  {
    src: '/image/reviewer-carousel/image-03.jpg',
    name: 'Vy Lê',
    jobTitle: 'Giữ trẻ',
  },
  {
    src: '/image/reviewer-carousel/image-04.jpg',
    name: 'Hà Đỗ',
    jobTitle: 'Giáo Viên',
  },
  {
    src: '/image/reviewer-carousel/image-05.jpg',
    name: 'Phượng Võ',
    jobTitle: 'Phục Vụ',
  },
  {
    src: '/image/reviewer-carousel/image-06.jpg',
    name: 'Nhi Phạm',
    jobTitle: 'Sinh Viên',
  },
  {
    src: '/image/reviewer-carousel/image-07.jpg',
    name: 'Loan Đỗ',
    jobTitle: 'Kế Toán',
  },
]

type ReviewerCarouselProps = {
  fadeDuration?: number
  intervalMs?: number
  ease?: 'linear' | 'easeIn' | 'easeOut' | 'easeInOut'
  opacity?: number
  translateX?: number
  appearFromX?: number
}

const ReviewerCarousel = ({
  fadeDuration = LOCAL_ANIMATION.fadeDuration,
  intervalMs = LOCAL_ANIMATION.intervalMs,
  ease = LOCAL_ANIMATION.ease,
  opacity = LOCAL_ANIMATION.opacity,
  translateX = LOCAL_ANIMATION.translateX,
  appearFromX,
}: ReviewerCarouselProps) => {
  const [offset, setOffset] = useState(0)
  const [isFading, setIsFading] = useState(false)
  const [isEntering, setIsEntering] = useState(false)

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null
    let enterTimeoutId: ReturnType<typeof setTimeout> | null = null
    const intervalId = setInterval(() => {
      setIsFading(true)
      if (timeoutId) clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        setOffset((prev) => (prev + 1) % reviewers.length)
        setIsFading(false)
        setIsEntering(true)
        if (enterTimeoutId) clearTimeout(enterTimeoutId)
        enterTimeoutId = setTimeout(() => {
          setIsEntering(false)
        }, fadeDuration * 1000)
      }, fadeDuration * 1000)
    }, intervalMs)
    return () => {
      clearInterval(intervalId)
      if (timeoutId) clearTimeout(timeoutId)
      if (enterTimeoutId) clearTimeout(enterTimeoutId)
    }
  }, [fadeDuration, intervalMs])

  const resolvedAppearFromX =
    typeof appearFromX === 'number' ? appearFromX : -translateX

  return (
    <div className="py-3 relative">
      <img src="/image/reviewer-carousel/Line.gif" className="-mt-5" alt="" />
      <motion.div
        initial={{ opacity: 1, x: 0 }}
        animate={
          isFading
            ? { opacity: [1, opacity], x: [0, translateX] }
            : isEntering
            ? { opacity: [opacity, 1], x: [resolvedAppearFromX, 0] }
            : { opacity: 1, x: 0 }
        }
        transition={
          isFading || isEntering
            ? { duration: fadeDuration, ease }
            : { opacity: { duration: 0 }, x: { duration: 0 } }
        }
        className={`absolute top-[10%] left-[11%] 2xl:top-[14.87%]  2xl:left-[11.86%]  xl:top-[13.87%]  xl:left-[10.86%]`}
      >
        <ReviewerAvatar
          className=""
          imageClassName="size-[40px] xl:size-[120px] border-2"
          src={reviewers[(0 + offset) % reviewers.length].src}
          name={reviewers[(0 + offset) % reviewers.length].name}
          jobTitle={reviewers[(0 + offset) % reviewers.length].jobTitle}
          labelPosition="bottom"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 1, x: 0 }}
        animate={
          isFading
            ? { opacity: [1, opacity], x: [0, translateX] }
            : isEntering
            ? { opacity: [opacity, 1], x: [resolvedAppearFromX, 0] }
            : { opacity: 1, x: 0 }
        }
        transition={
          isFading || isEntering
            ? { duration: fadeDuration, ease }
            : { opacity: { duration: 0 }, x: { duration: 0 } }
        }
        className={`absolute top-[20%] left-[23%] 2xl:top-[34.76%] 2xl:left-[23.43%]  xl:top-[20.76%]  xl:left-[22.43%]`}
      >
        <ReviewerAvatar
          className=""
          imageClassName="size-[45px] xl:size-[165px] border-4"
          src={reviewers[(1 + offset) % reviewers.length].src}
          name={reviewers[(1 + offset) % reviewers.length].name}
          jobTitle={reviewers[(1 + offset) % reviewers.length].jobTitle}
          labelPosition="top"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 1, x: 0 }}
        animate={
          isFading
            ? { opacity: [1, opacity], x: [0, translateX] }
            : isEntering
            ? { opacity: [opacity, 1], x: [resolvedAppearFromX, 0] }
            : { opacity: 1, x: 0 }
        }
        transition={
          isFading || isEntering
            ? { duration: fadeDuration, ease }
            : { opacity: { duration: 0 }, x: { duration: 0 } }
        }
        className={`absolute top-[10%] left-[35%] 2xl:top-[10.05%] 2xl:left-[35.4%]  xl:top-[8.0%]  xl:left-[34.7%]`}
      >
        <ReviewerAvatar
          className=""
          imageClassName="size-[40px] 2xl:size-[147px] xl:size-[130px] border-2"
          src={reviewers[(2 + offset) % reviewers.length].src}
          name={reviewers[(2 + offset) % reviewers.length].name}
          jobTitle={reviewers[(2 + offset) % reviewers.length].jobTitle}
          labelPosition="bottom"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 1, x: 0 }}
        animate={
          isFading
            ? { opacity: [1, opacity], x: [0, translateX] }
            : isEntering
            ? { opacity: [opacity, 1], x: [resolvedAppearFromX, 0] }
            : { opacity: 1, x: 0 }
        }
        transition={
          isFading || isEntering
            ? { duration: fadeDuration, ease }
            : { opacity: { duration: 0 }, x: { duration: 0 } }
        }
        className={`absolute top-[10%] left-[46%] 2xl:top-[16.94%] 2xl:left-[46.19%]  xl:top-[7.94%]  xl:left-[45.49%]`}
      >
        <ReviewerAvatar
          className=""
          imageClassName="size-[40px] 2xl:size-[165px] xl:size-[145px] border-2"
          src={reviewers[(3 + offset) % reviewers.length].src}
          name={reviewers[(3 + offset) % reviewers.length].name}
          jobTitle={reviewers[(3 + offset) % reviewers.length].jobTitle}
          labelPosition="top"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 1, x: 0 }}
        animate={
          isFading
            ? { opacity: [1, opacity], x: [0, translateX] }
            : isEntering
            ? { opacity: [opacity, 1], x: [resolvedAppearFromX, 0] }
            : { opacity: 1, x: 0 }
        }
        transition={
          isFading || isEntering
            ? { duration: fadeDuration, ease }
            : { opacity: { duration: 0 }, x: { duration: 0 } }
        }
        className={`absolute top-[10%] left-[59%] 2xl:top-[14.10%] 2xl:left-[59.11%]  xl:top-[12.10%]  xl:left-[58.31%]`}
      >
        <ReviewerAvatar
          className=""
          imageClassName="size-[40px] 2xl:size-[165px] xl:size-[149px] border-2"
          src={reviewers[(4 + offset) % reviewers.length].src}
          name={reviewers[(4 + offset) % reviewers.length].name}
          jobTitle={reviewers[(4 + offset) % reviewers.length].jobTitle}
          labelPosition="bottom"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 1, x: 0 }}
        animate={
          isFading
            ? { opacity: [1, opacity], x: [0, translateX] }
            : isEntering
            ? { opacity: [opacity, 1], x: [resolvedAppearFromX, 0] }
            : { opacity: 1, x: 0 }
        }
        transition={
          isFading || isEntering
            ? { duration: fadeDuration, ease }
            : { opacity: { duration: 0 }, x: { duration: 0 } }
        }
        className={`absolute top-[20%] left-[70%] 2xl:top-[44.08%] 2xl:left-[70.67%]  xl:top-[34.98%]  xl:left-[70.17%]`}
      >
        <ReviewerAvatar
          className=""
          imageClassName="size-[40px] 2xl:size-[140px] xl:size-[120px] border-4"
          src={reviewers[(5 + offset) % reviewers.length].src}
          name={reviewers[(5 + offset) % reviewers.length].name}
          jobTitle={reviewers[(5 + offset) % reviewers.length].jobTitle}
          labelPosition="top"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 1, x: 0 }}
        animate={
          isFading
            ? { opacity: [1, opacity], x: [0, translateX] }
            : isEntering
            ? { opacity: [opacity, 1], x: [resolvedAppearFromX, 0] }
            : { opacity: 1, x: 0 }
        }
        transition={
          isFading || isEntering
            ? { duration: fadeDuration, ease }
            : { opacity: { duration: 0 }, x: { duration: 0 } }
        }
        className={`absolute top-[20%] left-[80%] 2xl:top-[15.61%] 2xl:left-[80.83%]  xl:top-[14.61%]  xl:left-[79.83%]`}
      >
        <ReviewerAvatar
          className=""
          imageClassName="size-[40px] 2xl:size-[143px] xl:size-[133px] border-2"
          src={reviewers[(6 + offset) % reviewers.length].src}
          name={reviewers[(6 + offset) % reviewers.length].name}
          jobTitle={reviewers[(6 + offset) % reviewers.length].jobTitle}
          labelPosition="bottom"
        />
      </motion.div>
    </div>
  )
}

export default ReviewerCarousel
