'use client'

import { useGetEventArticleList } from '@/services/event-articles'
import useEmblaCarousel from 'embla-carousel-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import EventCard from '@/modules/event/components/event/EventCard'
import { useDonationCharityStore } from './stores'
import { cloneEventsForCarousel } from './utils'

type EventItem = {
  id: string
  status: 'happening' | 'coming' | 'ended'
  date: string
  title: string
  productCount: number | string
  fundAmount: string
  imageSrc: string
  slug?: string
  typeSponsor?: number
  idStatus?: number
  serverBadgeName?: string
  serverBadgeColor?: string
  useServerBadge?: boolean
  key?: string
}

const EventCarouselEmbla = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true,
    slidesToScroll: 1,
    duration: 40,
  })

  const [, setSelectedIndex] = useState(0)
  const { activeProductId, setHasEvent } = useDonationCharityStore()
  const { data: eventArticles, isLoading } = useGetEventArticleList({
    id_product: Number(activeProductId),
  })

  // Map dữ liệu từ API sang EventItem
  const events: EventItem[] = useMemo(() => {
    if (!eventArticles?.data) return []

    const mappedEvents = eventArticles.data.map((item: any) => {
      // Xác định status dựa trên status_now
      let status: 'happening' | 'coming' | 'ended' = 'coming'
      if (item.status_now?.name?.toLowerCase().includes('happening')) {
        status = 'happening'
      } else if (item.status_now?.name?.toLowerCase().includes('ended')) {
        status = 'ended'
      }

      // Format date
      const formatDate = (dateString: string) => {
        if (!dateString) return ''
        const date = new Date(dateString)
        return date.toLocaleDateString('vi-VN', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        })
      }

      // Format fund amount
      const formatFundAmount = (amount: number) => {
        if (!amount) return '0'
        return amount.toLocaleString('vi-VN')
      }

      return {
        id: String(item.id),
        status,
        date: formatDate(item.date_start_event),
        title: item.name || '',
        productCount: item.total_product || 0,
        fundAmount: formatFundAmount(item.total_money_prizes),
        imageSrc: item.image || '/image/donation/event.jpg',
        slug: item.slug,
        typeSponsor: item.type_sponsor,
        idStatus: item.status_now?.id,
        serverBadgeName: item.name_sponsor,
        serverBadgeColor: item.status_now?.color,
        useServerBadge: Boolean(item.name_sponsor && item.status_now?.color),
      }
    })

    // Sử dụng utils để clone mảng cho carousel
    return cloneEventsForCarousel(mappedEvents, 1)
  }, [eventArticles])

  // Set hasEvent dựa trên dữ liệu events
  useEffect(() => {
    setHasEvent(events.length > 0)
  }, [events.length, setHasEvent])

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index)
    },
    [emblaApi]
  )

  const onInit = useCallback(() => {
    // no-op
  }, [])

  const onSelect = useCallback((api: any) => {
    setSelectedIndex(api.selectedScrollSnap())
  }, [])

  useEffect(() => {
    if (!emblaApi) return
    onInit()
    onSelect(emblaApi)
    emblaApi.on('reInit', onInit)
    emblaApi.on('select', onSelect)
    return () => {
      emblaApi.off('reInit', onInit)
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi, onInit, onSelect])

  return (
    <div className="w-full flex items-stretch will-change-transform transform-gpu overflow-hidden">
      <div className="flex-1 overflow-hidden xl:overflow-visible will-change-transform transform-gpu">
        <div
          className="embla will-change-transform transform-gpu"
          ref={emblaRef}
        >
          <div className="embla__container flex will-change-transform transform-gpu pl-2">
            {isLoading
              ? // Loading skeleton
                Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={`skeleton-${index}`}
                    className="embla__slide mr-4 pb-5 flex-shrink-0 flex-[0_0_auto] basis-[66.666%] sm:basis-[60%] md:basis-1/2 xl:basis-[calc(100%/3-14px)]"
                  >
                    <div className="flex flex-col gap-4 shadow-lg/5 rounded-xl pb-4 h-full">
                      <div className="relative w-full h-48 bg-gray-200 animate-pulse rounded-xl" />
                      <div className="px-4 flex flex-col gap-4 flex-1">
                        <div className="flex items-center justify-between gap-4">
                          <div className="w-20 h-6 bg-gray-200 animate-pulse rounded" />
                          <div className="w-16 h-4 bg-gray-200 animate-pulse rounded" />
                        </div>
                        <div className="w-full h-6 bg-gray-200 animate-pulse rounded" />
                        <div className="grid grid-cols-2 gap-4">
                          <div className="w-full h-8 bg-gray-200 animate-pulse rounded" />
                          <div className="w-full h-8 bg-gray-200 animate-pulse rounded" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              : events.map((e, index) => (
                  <div
                    key={e.key}
                    className="embla__slide mr-4 pb-5 flex-shrink-0 flex-[0_0_auto] basis-[66.666%] sm:basis-[60%] md:basis-1/2 xl:basis-[calc(100%/3-14px)]"
                    onClick={() => scrollTo(index)}
                  >
                    <EventCard
                      status={e.status}
                      date={e.date}
                      title={e.title}
                      productCount={e.productCount}
                      fundAmount={e.fundAmount}
                      imageSrc={e.imageSrc}
                      slug={e.slug}
                      typeSponsor={e.typeSponsor}
                      idStatus={e.idStatus}
                      serverBadgeName={e.serverBadgeName}
                      serverBadgeColor={e.serverBadgeColor}
                      useServerBadge={e.useServerBadge}
                    />
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventCarouselEmbla
