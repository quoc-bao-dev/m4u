'use client'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import Button from '@/core/components/ui/button'
import ScrollRevealCard from '@/modules/trial-registration/components/product/ScrollRevealCard'
import { useTranslations } from 'next-intl'
import React, { useCallback, useEffect, useRef } from 'react'
import InfoKolModal, { type KolInfo } from './components/InfoKolModal'
import { KOLCard } from './components/KOLCard'

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


interface KOLsProps {
  data: any
  isLoading: boolean
  hasNextPage?: boolean
  isFetchingNextPage?: boolean
  fetchNextPage?: () => void
}

const KOLs = ({
  data,
  isLoading,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage
}: KOLsProps) => {
  console.log(data)
  const tCommon = useTranslations('common')
  const t = useTranslations('reviewHub.kols')
  const [isOpen, setIsOpen] = React.useState(false)
  const [selectedKol, setSelectedKol] = React.useState<KolInfo>(null)
  const loadMoreRef = useRef<HTMLDivElement>(null)

  const handleOpen = (kol: KolInfo) => {
    setSelectedKol(kol)
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  // Infinite scroll logic
  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const target = entries[0]
    if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage?.()
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0.1,
    })

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current)
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current)
      }
    }
  }, [handleObserver])

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
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
        {isLoading ? (
          <>
            {Array.from({ length: 8 }).map((_, index) => (
              <Skeleton key={index} className="w-full aspect-square rounded-3xl" />
            ))}
          </>
        ) : (
          data?.pages?.map((page: any, pageIndex: number) =>
            page?.review?.data?.map((review: any, index: number) => (
              <ScrollRevealCard
                key={`${pageIndex}-${review.id}`}
                delay={(pageIndex * 8 + index) * 0.1}
                duration={0.6}
              >
                <KOLCard
                  data={review}
                  onClick={() => handleOpen(review)}
                />
              </ScrollRevealCard>
            ))
          ).flat()
        )}
      </div>

      {/* Load More Trigger */}
      {hasNextPage && (
        <div ref={loadMoreRef} className="flex justify-center py-4">
          {isFetchingNextPage ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
              <span className="text-gray-600">Đang tải thêm...</span>
            </div>
          ) : (
            <Button
              onClick={() => fetchNextPage?.()}
            >
              {tCommon('loadMore')}
            </Button>
          )}
        </div>
      )}

      <InfoKolModal isOpen={isOpen} onClose={handleClose} kol={selectedKol} />
    </div>
  )
}

export default KOLs
