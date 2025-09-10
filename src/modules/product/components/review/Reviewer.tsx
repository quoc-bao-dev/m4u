'use client'

import { MultiSelect } from '@/core/components'
import { Grid } from '@/core/components/common/group'
import Button from '@/core/components/ui/button'
import { Play } from '@phosphor-icons/react'
import Image from 'next/image'
import { useDevice } from '@/core/hooks/useDevice'
import { ScrollRevealCard } from '@/modules/trial-registration'

// Mock data for reviewers
const mockReviewers = [
  {
    id: 1,
    name: 'Đào Bùi',
    avatar: '/image/reviewer-carousel/image-01.jpg',
    videoThumbnail: '/image/reviewer-carousel/image-01.jpg',
    views: 88,
    rating: 4.9,
  },
  {
    id: 2,
    name: 'Loan Đỗ',
    avatar: '/image/reviewer-carousel/image-02.jpg',
    videoThumbnail: '/image/reviewer-carousel/image-02.jpg',
    views: 69,
    rating: 5.0,
  },
  {
    id: 3,
    name: 'Phượng Võ',
    avatar: '/image/reviewer-carousel/image-03.jpg',
    videoThumbnail: '/image/reviewer-carousel/image-03.jpg',
    views: 88,
    rating: 4.8,
  },
  {
    id: 4,
    name: 'Vy Lê',
    avatar: '/image/reviewer-carousel/image-04.jpg',
    videoThumbnail: '/image/reviewer-carousel/image-04.jpg',
    views: 88,
    rating: 4.9,
  },
  {
    id: 5,
    name: 'Đào Bùi',
    avatar: '/image/reviewer-carousel/image-01.jpg',
    videoThumbnail: '/image/reviewer-carousel/image-01.jpg',
    views: 88,
    rating: 4.9,
  },
  {
    id: 6,
    name: 'Loan Đỗ',
    avatar: '/image/reviewer-carousel/image-02.jpg',
    videoThumbnail: '/image/reviewer-carousel/image-02.jpg',
    views: 69,
    rating: 5.0,
  },
  {
    id: 7,
    name: 'Phượng Võ',
    avatar: '/image/reviewer-carousel/image-03.jpg',
    videoThumbnail: '/image/reviewer-carousel/image-03.jpg',
    views: 88,
    rating: 4.8,
  },
  {
    id: 8,
    name: 'Vy Lê',
    avatar: '/image/reviewer-carousel/image-04.jpg',
    videoThumbnail: '/image/reviewer-carousel/image-04.jpg',
    views: 88,
    rating: 4.9,
  },
]

const options = [
  { label: 'Đặt lịch', value: 'dat-lich' },
  { label: 'Khiếu nại', value: 'khieu-nai' },
  { label: 'Tư vấn', value: 'tu-van' },
  { label: 'Khác', value: 'khac' },
]

const Reviewer = () => {
  const { isMobile } = useDevice()

  const reviewersToRender = isMobile ? mockReviewers.slice(0, 3) : mockReviewers

  return (
    <div className="pt-[20px] md:pt-[48px]">
      {/* Filter Section */}
      <div className="flex justify-end">
        <div className="flex items-center gap-4 mb-4 md:mb-8">
          <span className="text-gray-700 font-medium truncate">Filter by:</span>

          {/* Filter Dropdown */}
          <MultiSelect
            options={options}
            defaultValue={['dat-lich']}
            onChange={(vals) => console.log(vals)}
            className="md:min-w-[150px]"
            placeholder="Chọn bộ lọc"
          />
          <MultiSelect
            options={options}
            defaultValue={['dat-lich']}
            onChange={(vals) => console.log(vals)}
            className="md:min-w-[150px]"
            placeholder="Chọn bộ lọc"
          />
        </div>
      </div>

      {/* Review Cards Grid */}
      <Grid className="grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {reviewersToRender.map((reviewer, index) => (
          <ScrollRevealCard
            key={reviewer.id}
            delay={index * 0.05}
            duration={0.6}
          >
            <ReviewCard reviewer={reviewer} />
          </ScrollRevealCard>
        ))}
      </Grid>

      {/* View All CTA */}
      <div className="flex justify-center">
        <Button size="md" variant="primary">
          View all
        </Button>
      </div>
    </div>
  )
}

// Review Card Component
const ReviewCard = ({ reviewer }: { reviewer: (typeof mockReviewers)[0] }) => {
  return (
    <div className="bg-orange-100 rounded-2xl overflow-hidden shadow-xl/3 hover:shadow-xl/5 transition-shadow duration-300">
      {/* Video Thumbnail */}
      <div className="relative bg-gray-100 w-full aspect-[410/342]">
        <Image
          src={reviewer.videoThumbnail}
          alt={`${reviewer.name} review`}
          fill
          className="object-cover  w-full aspect-[410/342]"
        />
        {/* Play Button */}
        <div className="absolute top-3 left-3 bg-black/50 rounded-full p-2">
          <Play className="w-4 h-4 text-white" weight="fill" />
        </div>
      </div>

      {/* User Info */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="relative w-10 h-10 rounded-full overflow-hidden">
              <Image
                src={reviewer.avatar}
                alt={reviewer.name}
                fill
                className="object-cover"
              />
            </div>

            {/* User Details */}
            <div>
              <h3 className="font-semibold text-gray-900">{reviewer.name}</h3>
              <p className="text-sm text-gray-700">{reviewer.views} views</p>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 bg-white rounded-full p-2">
            <StartIcon />
            <span className="text-[18px] font-medium text-gray-900 ml-1">
              {reviewer.rating.toFixed(1)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

const StartIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="size-[24px]"
    >
      <path
        d="M21.9843 10.7232L17.7561 14.4132L19.0227 19.9069C19.0897 20.1941 19.0706 20.4947 18.9677 20.7711C18.8648 21.0475 18.6828 21.2874 18.4443 21.4609C18.2058 21.6344 17.9214 21.7337 17.6268 21.7464C17.3321 21.7592 17.0403 21.6848 16.7877 21.5326L11.9961 18.6263L7.21489 21.5326C6.9623 21.6848 6.67044 21.7592 6.3758 21.7464C6.08116 21.7337 5.79682 21.6344 5.55832 21.4609C5.31982 21.2874 5.13775 21.0475 5.03487 20.7711C4.93199 20.4947 4.91286 20.1941 4.97989 19.9069L6.24457 14.4188L2.01551 10.7232C1.79183 10.5303 1.63009 10.2756 1.55056 9.99113C1.47104 9.70666 1.47727 9.40504 1.56849 9.1241C1.6597 8.84315 1.83183 8.59539 2.06328 8.41189C2.29474 8.22838 2.57523 8.11729 2.86957 8.09256L8.44395 7.60974L10.6199 2.41974C10.7335 2.14742 10.9252 1.9148 11.1707 1.75117C11.4163 1.58755 11.7048 1.50024 11.9999 1.50024C12.295 1.50024 12.5835 1.58755 12.829 1.75117C13.0746 1.9148 13.2663 2.14742 13.3799 2.41974L15.5624 7.60974L21.1349 8.09256C21.4292 8.11729 21.7097 8.22838 21.9412 8.41189C22.1726 8.59539 22.3448 8.84315 22.436 9.1241C22.5272 9.40504 22.5334 9.70666 22.4539 9.99113C22.3744 10.2756 22.2126 10.5303 21.9889 10.7232H21.9843Z"
        fill="#FACA4A"
      />
    </svg>
  )
}

export default Reviewer
