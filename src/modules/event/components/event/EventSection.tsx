'use client'

import { Container, Nodata } from '@/core/components'
import { Link } from '@/locale'
import { useInfiniteEventList } from '@/services/event'
import { useEffect, useMemo, useRef } from 'react'
import { useFilterStore } from '../../stores/filterStore'
import EventCard from './EventCard'
import EventCardSkeleton from './EventCardSkeleton'
import FilterBar from './FilterBar'

const EventSection = () => {
  const { activeTab, search, filterBy } = useFilterStore()
  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useInfiniteEventList(
    {
      type_event_articles: activeTab,
      search: search,
      status: filterBy,
      per_page: 6,
    },
    { enabled: !!filterBy }
  )

  // Merge pages
  const allEvents = useMemo(() => {
    if (!data?.pages) return []
    return data.pages.flatMap((page) => page.data)
  }, [data?.pages])

  // Reset to first page when filters change
  useEffect(() => {
    refetch()
  }, [activeTab, search, filterBy, refetch])

  // Intersection Observer for infinite scroll
  const sentinelRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return
    if (!hasNextPage) return

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0]
        if (first.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
      },
      { root: null, rootMargin: '200px', threshold: 0 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, data?.pages])

  // Hook useMemo để map dữ liệu từ API thành props cho EventCard
  const mappedEventCards = useMemo(() => {
    if (!allEvents) return []

    return allEvents.map((event) => {
      // Format ngày từ API (YYYY-MM-DD HH:mm:ss) thành DD/MM/YYYY
      const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('vi-VN', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        })
      }

      // Format số tiền với dấu phẩy
      const formatAmount = (amount: number) => {
        return amount.toLocaleString('vi-VN')
      }

      // Xác định status dựa trên status_now.id từ API
      const getEventStatus = (statusNow: {
        id: number
        name: string
        color: string
      }): 'happening' | 'coming' => {
        // Map theo id:
        // 1 = chưa đến -> coming
        // 2 = đang diễn ra -> happening
        // 3 = kết thúc -> coming

        switch (statusNow.id) {
          case 1:
            return 'coming' // chưa đến
          case 2:
            return 'happening' // đang diễn ra
          case 3:
            return 'coming' // kết thúc
          default:
            return 'happening' // mặc định
        }
      }

      return {
        id: event.id,
        slug: event.slug,
        status: getEventStatus(event.status_now),

        date: formatDate(event.date_start_event),
        title: event.name,
        // TODO: map theo type_sponsor
        productCount:
          event.type_sponsor === 1
            ? '-'
            : event.type_sponsor === 2
            ? event.total_product
            : 0,
        fundAmount: formatAmount(event.prizes),
        imageSrc: event.image,
        background_color: event.background_color,
        sponsor: event.sponsor,
        type_sponsor: event.type_sponsor,
        name_sponsor: event.name_sponsor,
        image_sponsor: event.image_sponsor,
        count_join: event.count_join,
        count_view: event.count_view,
        status_now: event.status_now,
      }
    })
  }, [allEvents])

  return (
    <section className="py-[60px]">
      <Container>
        {/* Filter */}
        <FilterBar />
        <div className="pt-8"></div>

        {isLoading ? (
          // Show skeleton loading state
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <EventCardSkeleton key={index} />
            ))}
          </div>
        ) : mappedEventCards.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mappedEventCards.map((event) => (
              <Link key={event.id} href={`/event/${event.slug}`}>
                <EventCard
                  status={event.status}
                  idStatus={event.status_now.id}
                  date={event.date}
                  title={event.title}
                  productCount={event.productCount}
                  typeSponsor={event.type_sponsor}
                  fundAmount={event.fundAmount}
                  imageSrc={event.imageSrc}
                  useServerBadge={true}
                  serverBadgeName={event.status_now.name}
                  serverBadgeColor={event.status_now.color}
                />
              </Link>
            ))}
            {/* Sentinel for infinite scroll */}
            <div ref={sentinelRef} className="col-span-full h-4" />
            {isFetchingNextPage && (
              <div className="col-span-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, index) => (
                  <EventCardSkeleton key={`skeleton-${index}`} />
                ))}
              </div>
            )}
          </div>
        ) : (
          // Show no data component
          <Nodata
            title="Không có sự kiện nào"
            description="Hiện tại chưa có sự kiện nào phù hợp với bộ lọc của bạn. Hãy thử thay đổi bộ lọc hoặc tìm kiếm khác."
          />
        )}
      </Container>
    </section>
  )
}

export default EventSection
