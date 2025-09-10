'use client'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { IMAGES } from '@/core/constants/IMAGES'
import React from 'react'
import InfoKolModal, { type KolInfo } from './components/InfoKolModal'
import { KOLCard } from './components/KOLCard'
import ScrollRevealCard from '@/modules/trial-registration/components/product/ScrollRevealCard'

const filterOptions = {
  sortBy: [
    { value: 'latest', label: 'Mới nhất' },
    { value: 'oldest', label: 'Cũ nhất' },
    { value: 'most-viewed', label: 'Xem nhiều nhất' },
    { value: 'highest-rated', label: 'Đánh giá cao nhất' },
    { value: 'most-liked', label: 'Thích nhiều nhất' },
  ],
  mostViewed: [
    { value: 'all', label: 'Tất cả' },
    { value: 'today', label: 'Hôm nay' },
    { value: 'week', label: 'Tuần này' },
    { value: 'month', label: 'Tháng này' },
    { value: 'year', label: 'Năm nay' },
    { value: 'all-time', label: 'Mọi thời gian' },
  ],
}

const kolCards = [
  {
    image:
      'https://cdn2.videowise.com/converted/videos/1747066892278_wid_NjgyMjIwMGMzZjJiOTAwMDU4OGMxZTNm_h264cmobile.mp4',
    avatar: IMAGES.kol1,
    name: 'Đào Bùi',
    rating: 4.9,
    reviews: 88,
  },
  {
    image:
      'https://cdn2.videowise.com/converted/videos/1747066892278_wid_NjgyMjIwMGMzZjJiOTAwMDU4OGMxZTNm_h264cmobile.mp4',
    avatar: IMAGES.kol1,
    name: 'Đào Bùi',
    rating: 4.9,
    reviews: 88,
  },
  {
    image:
      'https://cdn2.videowise.com/converted/videos/1747066892278_wid_NjgyMjIwMGMzZjJiOTAwMDU4OGMxZTNm_h264cmobile.mp4',
    avatar: IMAGES.kol1,
    name: 'Đào Bùi',
    rating: 4.9,
    reviews: 88,
  },
  {
    image:
      'https://cdn2.videowise.com/converted/videos/1747066892278_wid_NjgyMjIwMGMzZjJiOTAwMDU4OGMxZTNm_h264cmobile.mp4',
    avatar: IMAGES.kol1,
    name: 'Đào Bùi',
    rating: 4.9,
    reviews: 88,
  },
  {
    image:
      'https://cdn2.videowise.com/converted/videos/1747066892278_wid_NjgyMjIwMGMzZjJiOTAwMDU4OGMxZTNm_h264cmobile.mp4',
    avatar: IMAGES.kol1,
    name: 'Đào Bùi',
    rating: 4.9,
    reviews: 88,
  },
  {
    image:
      'https://cdn2.videowise.com/converted/videos/1747066892278_wid_NjgyMjIwMGMzZjJiOTAwMDU4OGMxZTNm_h264cmobile.mp4',
    avatar: IMAGES.kol1,
    name: 'Đào Bùi',
    rating: 4.9,
    reviews: 88,
  },
  {
    image:
      'https://cdn2.videowise.com/converted/videos/1747066892278_wid_NjgyMjIwMGMzZjJiOTAwMDU4OGMxZTNm_h264cmobile.mp4',
    avatar: IMAGES.kol1,
    name: 'Đào Bùi',
    rating: 4.9,
    reviews: 88,
  },
  {
    image:
      'https://cdn2.videowise.com/converted/videos/1747066892278_wid_NjgyMjIwMGMzZjJiOTAwMDU4OGMxZTNm_h264cmobile.mp4',
    avatar: IMAGES.kol1,
    name: 'Đào Bùi',
    rating: 4.9,
    reviews: 88,
  },
]

const KOLs = () => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [selectedKol, setSelectedKol] = React.useState<KolInfo>(null)

  const handleOpen = (kol: KolInfo) => {
    setSelectedKol(kol)
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <div className="flex flex-col gap-3 lg:gap-6 xl:gap-12 w-full px-3 lg:px-0">
      <div className="flex justify-end items-center gap-2 lg:gap-4 w-full">
        <h3 className="text-lg font-normal text-greyscale-600">Filter by:</h3>
        <Select defaultValue="latest">
          <SelectTrigger className="w-30 lg:w-[180px]">
            <SelectValue placeholder="Sắp xếp theo" />
          </SelectTrigger>
          <SelectContent>
            {filterOptions.sortBy.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-30 lg:w-[180px]">
            <SelectValue placeholder="Most viewed" />
          </SelectTrigger>
          <SelectContent>
            {filterOptions.mostViewed.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {kolCards.map((kol, index) => (
          <ScrollRevealCard key={index} delay={index * 0.1} duration={0.6}>
            <KOLCard
              image={kol.image}
              avatar={kol.avatar}
              name={kol.name}
              rating={kol.rating}
              reviews={kol.reviews}
              onClick={() => handleOpen(kol)}
            />
          </ScrollRevealCard>
        ))}
      </div>

      <InfoKolModal isOpen={isOpen} onClose={handleClose} kol={selectedKol} />
    </div>
  )
}

export default KOLs
