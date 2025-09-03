'use client'

import { useEffect, useState } from 'react'
import ReviewerAvatar from './ReviewerAvatar'

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

const ReviewerCarousel = () => {
  const [offset, setOffset] = useState(0)
  const [isFading, setIsFading] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true)
      const timeout = setTimeout(() => {
        setOffset((prev) => (prev + 1) % reviewers.length)
        setIsFading(false)
      }, 400)
      return () => clearTimeout(timeout)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="py-3 relative">
      <img src="/image/reviewer-carousel/reviewer-carousel-01.svg" alt="" />
      <ReviewerAvatar
        className={`absolute 2xl:top-[14.87%]  2xl:left-[11.86%]  xl:top-[13.87%]  xl:left-[10.86%] transition-all duration-500 ${
          isFading ? 'opacity-0 scale-75' : 'opacity-100 scale-100'
        }`}
        imageClassName="size-[120px] border-2 transition-all duration-500"
        src={reviewers[(0 + offset) % reviewers.length].src}
        name={reviewers[(0 + offset) % reviewers.length].name}
        jobTitle={reviewers[(0 + offset) % reviewers.length].jobTitle}
        labelPosition="bottom"
      />
      <ReviewerAvatar
        className={`absolute 2xl:top-[34.76%] 2xl:left-[23.43%]  xl:top-[20.76%]  xl:left-[22.43%] transition-all duration-500 ${
          isFading ? 'opacity-0 scale-75' : 'opacity-100 scale-100'
        }`}
        imageClassName="size-[165px] border-4 transition-all duration-500"
        src={reviewers[(1 + offset) % reviewers.length].src}
        name={reviewers[(1 + offset) % reviewers.length].name}
        jobTitle={reviewers[(1 + offset) % reviewers.length].jobTitle}
        labelPosition="top"
      />
      <ReviewerAvatar
        className={`absolute 2xl:top-[10.05%] 2xl:left-[35.4%]  xl:top-[9.05%]  xl:left-[34.4%] transition-all duration-500 ${
          isFading ? 'opacity-0 scale-75' : 'opacity-100 scale-100'
        }`}
        imageClassName="2xl:size-[147px] xl:size-[130px] border-2 transition-all duration-500"
        src={reviewers[(2 + offset) % reviewers.length].src}
        name={reviewers[(2 + offset) % reviewers.length].name}
        jobTitle={reviewers[(2 + offset) % reviewers.length].jobTitle}
        labelPosition="bottom"
      />
      <ReviewerAvatar
        className={`absolute 2xl:top-[16.94%] 2xl:left-[46.19%]  xl:top-[7.94%]  xl:left-[45.49%] transition-all duration-500 ${
          isFading ? 'opacity-0 scale-75' : 'opacity-100 scale-100'
        }`}
        imageClassName="size-[165px] xl:size-[145px] border-2 transition-all duration-500"
        src={reviewers[(3 + offset) % reviewers.length].src}
        name={reviewers[(3 + offset) % reviewers.length].name}
        jobTitle={reviewers[(3 + offset) % reviewers.length].jobTitle}
        labelPosition="top"
      />
      <ReviewerAvatar
        className={`absolute 2xl:top-[14.10%] 2xl:left-[59.11%]  xl:top-[12.10%]  xl:left-[58.31%] transition-all duration-500 ${
          isFading ? 'opacity-0 scale-75' : 'opacity-100 scale-100'
        }`}
        imageClassName="2xl:size-[165px] xl:size-[149px] border-2 transition-all duration-500"
        src={reviewers[(4 + offset) % reviewers.length].src}
        name={reviewers[(4 + offset) % reviewers.length].name}
        jobTitle={reviewers[(4 + offset) % reviewers.length].jobTitle}
        labelPosition="bottom"
      />
      <ReviewerAvatar
        className={`absolute 2xl:top-[44.08%] 2xl:left-[70.67%]  xl:top-[34.08%]  xl:left-[69.67%] transition-all duration-500 ${
          isFading ? 'opacity-0 scale-75' : 'opacity-100 scale-100'
        }`}
        imageClassName="2xl:size-[140px] xl:size-[120px] border-4 transition-all duration-500"
        src={reviewers[(5 + offset) % reviewers.length].src}
        name={reviewers[(5 + offset) % reviewers.length].name}
        jobTitle={reviewers[(5 + offset) % reviewers.length].jobTitle}
        labelPosition="top"
      />

      <ReviewerAvatar
        className={`absolute 2xl:top-[15.61%] 2xl:left-[80.83%]  xl:top-[14.61%]  xl:left-[79.83%] transition-all duration-500 ${
          isFading ? 'opacity-0 scale-75' : 'opacity-100 scale-100'
        }`}
        imageClassName="2xl:size-[143px] xl:size-[133px] border-2 transition-all duration-500"
        src={reviewers[(6 + offset) % reviewers.length].src}
        name={reviewers[(6 + offset) % reviewers.length].name}
        jobTitle={reviewers[(6 + offset) % reviewers.length].jobTitle}
        labelPosition="bottom"
      />
    </div>
  )
}

export default ReviewerCarousel
