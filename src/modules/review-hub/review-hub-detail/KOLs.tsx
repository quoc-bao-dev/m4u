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
import { useTranslations } from 'next-intl'

const filterOptions = {
  sortBy: [
    { value: 'latest', label: 'latest' },
    { value: 'oldest', label: 'oldest' },
    { value: 'most-viewed', label: 'mostViewed' },
    { value: 'highest-rated', label: 'highestRated' },
    { value: 'most-liked', label: 'mostLiked' },
  ],
  mostViewed: [
    { value: 'all', label: 'all' },
    { value: 'today', label: 'today' },
    { value: 'week', label: 'week' },
    { value: 'month', label: 'month' },
    { value: 'year', label: 'year' },
    { value: 'all-time', label: 'allTime' },
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
  const t = useTranslations('reviewHub.kols')
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
        <h3 className="text-lg font-normal text-greyscale-600">
          {t('filterBy')}
        </h3>
        <Select defaultValue="latest">
          <SelectTrigger className="w-30 lg:w-[180px] bg-white">
            <SelectValue placeholder={t('sortBy')} />
          </SelectTrigger>
          <SelectContent>
            {filterOptions.sortBy.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {t(`options.${option.label}`)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-30 lg:w-[180px] bg-white">
            <SelectValue placeholder={t('mostViewed')} />
          </SelectTrigger>
          <SelectContent>
            {filterOptions.mostViewed.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {t(`period.${option.label}`)}
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
