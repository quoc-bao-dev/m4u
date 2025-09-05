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
      <img
        src="/image/reviewer-carousel/carousel.gif"
        className="h-full w-auto object-cover absolute top-0 left-0"
        alt=""
      />
      <div className="relative mx-auto aspect-[16/4] bg-red-100/0 w-[300px] md:w-[700px] lg:w-[1000px] xl:w-[1200px] 2xl:w-[1500px] h-full flex items-center justify-center">
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
          className={`absolute left-[-5.4%] top-[7.87%] md:left-[2.1%] md:top-[10.87%] lg:left-[5%] lg:top-[12.87%] xl:left-[6%] xl:top-[14.87%] 2xl:left-[8%] 2xl:top-[14.87%]`}
        >
          <ReviewerAvatar
            className=""
            imageClassName="md:size-[80px] lg:size-[110px] size-[40px] xl:size-[120px] border-2"
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
          className={`absolute left-[12.1%] top-[-6.87%] md:left-[16.7%] md:top-[18.87%] lg:left-[18.7%] lg:top-[18.87%] xl:left-[18.5%] xl:top-[18.87%] 2xl:left-[19.5%] 2xl:top-[26.87%]`}
        >
          <ReviewerAvatar
            className=""
            imageClassName="size-[45px] md:size-[95px] lg:size-[125px] xl:size-[165px] 2xl:size-[185px] border-4"
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
          className={`absolute left-[28.9%] top-[1.05%] md:left-[30.9%] md:top-[6.05%] lg:left-[32.7%] lg:top-[8.05%] xl:left-[32.8%] xl:top-[9.05%] 2xl:left-[33%] 2xl:top-[9.05%]`}
        >
          <ReviewerAvatar
            className=""
            imageClassName="size-[38px] md:size-[75px] lg:size-[100px] xl:size-[120px]  2xl:size-[147px]  border-2"
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
          className={`absolute md:left-[43.5%] md:top-[2.94%] lg:left-[45%] lg:top-[4.94%] xl:left-[44.9%] xl:top-[6.94%] 2xl:left-[45%] 2xl:top-[11.94%]`}
        >
          <ReviewerAvatar
            className=""
            imageClassName="md:size-[85px] lg:size-[110px] xl:size-[135px] size-[40px] 2xl:size-[165px]  border-2"
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
          className={`absolute left-[61.4%] top-[3.0%] md:left-[58.5%] md:top-[8.0%] lg:left-[58.7%] lg:top-[9.0%] xl:left-[59.2%] xl:top-[11.0%] 2xl:left-[59%] 2xl:top-[12.10%]`}
        >
          <ReviewerAvatar
            className=""
            imageClassName="md:size-[90px] lg:size-[130px] xl:size-[140px] size-[40px] 2xl:size-[165px]  border-2"
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
          className={`absolute  left-[76.8%] top-[11.08%] md:left-[72.5%] md:top-[31.08%] lg:left-[72.8%] lg:top-[31.08%] xl:left-[72.4%] xl:top-[33.08%] 2xl:left-[72.2%] 2xl:top-[38.08%]`}
        >
          <ReviewerAvatar
            className=""
            imageClassName="md:size-[75px] lg:size-[100px] size-[40px] 2xl:size-[140px] xl:size-[120px] border-4"
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
          className={`absolute right-[-3.9%] md:right-auto top-[8.1%] md:left-[83.5%] md:top-[9.1%] lg:left-[83.5%] lg:top-[13.1%] xl:left-[80%] xl:top-[13.1%] 2xl:left-[82.5%] 2xl:top-[14.1%]`}
        >
          <ReviewerAvatar
            className=""
            imageClassName="size-[40px] md:size-[87px] lg:size-[113px] 2xl:size-[163px] xl:size-[133px] border-2"
            src={reviewers[(6 + offset) % reviewers.length].src}
            name={reviewers[(6 + offset) % reviewers.length].name}
            jobTitle={reviewers[(6 + offset) % reviewers.length].jobTitle}
            labelPosition="bottom"
          />
        </motion.div>
      </div>
    </div>
  )
}

export default ReviewerCarousel
