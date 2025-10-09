'use client'
import { Container } from '@/core/components'
import { Link } from '@/locale'
import { useGetEventDetail, useGetEventList } from '@/services/event'
import useEmblaCarousel from 'embla-carousel-react'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'
import EventCard from '../event/EventCard'
import EventRelativeSectionSkeleton from '../event/EventCardSkeleton'

const EventRelativeSection = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: 'start' })
  const params = useParams()
  const slug = (params as any)?.slug as string | undefined
  const t = useTranslations('event.relative')

  // Fetch event detail to derive ID from slug
  const { data: detailData, isLoading: isDetailLoading } = useGetEventDetail(
    slug || ''
  )

  const eventId = detailData?.data?.id

  // Lấy danh sách sự kiện liên quan (only when eventId available)
  const { data: relatedEvents, isLoading } = useGetEventList(
    {
      id: eventId,
      per_page: 3,
    },
    { enabled: !!eventId }
  )

  // Map dữ liệu cho EventCard
  const mappedEvents = useMemo(() => {
    if (!relatedEvents?.data) return []

    return relatedEvents.data.map((event) => ({
      id: event.id,
      status: event.status_now.name.toLowerCase() as
        | 'coming'
        | 'happening'
        | 'ended',
      date: new Date(event.date_start_event).toLocaleDateString('en-GB'),
      title: event.name,
      productCount:
        event.type_sponsor === 1 ? event.prizes : event.total_product,
      fundAmount: event.total_money_prizes.toLocaleString(),
      imageSrc: event.image,
      slug: event.slug,
      // Server badge props
      idStatus: event.status_now.id,
      serverBadgeName: event.status_now.name,
      serverBadgeColor: event.status_now.color,
      useServerBadge: true,
    }))
  }, [relatedEvents])

  if (isDetailLoading || isLoading) {
    return <EventRelativeSectionSkeleton />
  }

  if (!mappedEvents.length) {
    return null
  }
  return (
    <section className="py-10 ">
      <Container className="max-w-[1440px]">
        <h3 className="text-[32px] md:text-[40px] font-extrabold text-greyscale-900 text-center">
          {t('title')}
        </h3>
        {/* Mobile carousel */}
        <div className="pt-6 md:hidden">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4">
              {mappedEvents.map((event) => (
                <div key={event.id} className="min-w-0 flex-[0_0_85%]">
                  <Link href={`/event/${event.slug}`}>
                    <EventCard
                      status={event.status}
                      date={event.date}
                      title={event.title}
                      productCount={event.productCount}
                      fundAmount={event.fundAmount}
                      imageSrc={event.imageSrc}
                      slug={event.slug}
                      idStatus={event.idStatus}
                      serverBadgeName={event.serverBadgeName}
                      serverBadgeColor={event.serverBadgeColor}
                      useServerBadge={event.useServerBadge}
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tablet/Desktop grid */}
        <div className="pt-6 hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mappedEvents.map((event) => (
            <Link key={event.id} href={`/event/${event.slug}`}>
              <EventCard
                status={event.status}
                date={event.date}
                title={event.title}
                productCount={event.productCount}
                fundAmount={event.fundAmount}
                imageSrc={event.imageSrc}
                slug={event.slug}
                idStatus={event.idStatus}
                serverBadgeName={event.serverBadgeName}
                serverBadgeColor={event.serverBadgeColor}
                useServerBadge={event.useServerBadge}
              />
            </Link>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default EventRelativeSection
