'use client'

import { Container } from '@/core/components'
import { useGetEventDetail } from '@/services/event'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'
import { HeaderEvent } from '../head'
import EventContent from './EventContent'
import EventDetailSkeleton from './EventDetailSkeleton'
import EventInfoTabs from './EventInfoTabs'
import EventSidebar from './EventSidebar'

const EventDetailSection = () => {
  const t = useTranslations('event.sidebar')
  const { slug } = useParams()

  const { data: eventDetail, isLoading } = useGetEventDetail(slug as string)

  // Hook useMemo để map dữ liệu từ event detail
  const mappedEventData = useMemo(() => {
    if (!eventDetail?.result || !eventDetail.data) return null

    const event = eventDetail.data

    // Format ngày tháng
    const formatDate = (dateString: string) => {
      const date = new Date(dateString)
      return date.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    }

    // Format số tiền
    const formatAmount = (amount: number) => {
      return amount.toLocaleString('vi-VN')
    }

    // Xác định status dựa trên status_now.id
    const getEventStatus = (statusNow: {
      id: number
      name: string
      color: string
    }) => {
      switch (statusNow.id) {
        case 1:
          return 'coming' // chưa đến
        case 2:
          return 'happening' // đang diễn ra
        case 3:
          return 'ended' // kết thúc
        default:
          return 'happening'
      }
    }

    // Map info_event thành format phù hợp cho tabs
    const mappedInfoEvent = event.info_event
      .sort((a, b) => a.key_index - b.key_index)
      .map((info) => ({
        title: info.title,
        content: info.content,
        keyIndex: info.key_index,
        language: info.language,
      }))

    // Map list_images thành format phù hợp
    const mappedImages = event.list_images
      .sort((a, b) => a.order_by - b.order_by)
      .map((img) => ({
        id: img.id,
        image: img.image,
        orderBy: img.order_by,
      }))

    // Map list_product thành format phù hợp
    const mappedProducts = event.list_product?.map((product) => ({
      id: product.id,
      code: product.code,
      name: product.name,
      image: product.image,
      slug: product.slug,
    }))

    return {
      // Thông tin cơ bản
      id: event.id,
      code: event.code,
      name: event.name,
      content: event.content,
      slug: event.slug,
      background_color: event.background_color,

      // Hình ảnh
      mainImage: event.image,
      images: mappedImages,

      // Thông tin tài trợ
      sponsor: {
        hasSponsor: event.sponsor === 1,
        name: event.name_sponsor,
        image: event.image_sponsor,
      },

      // Thông tin tài chính
      prizes: {
        amount: event.total_money_prizes,
        type_sponsor: event.type_sponsor,
        formattedAmount: formatAmount(event.prizes),
      },

      // Thống kê
      stats: {
        totalProduct:
          event.type_sponsor === 1 ? event.prizes : event.total_product,
        countJoin: event.count_join,
        countView: event.count_view,
      },

      // Thời gian
      time: {
        startDate: event.date_start_event,
        endDate: event.date_end_event,
        formattedStartDate: formatDate(event.date_start_event),
        formattedEndDate: formatDate(event.date_end_event),
        timeLeft: event.time_left_dd_hh_mm_ss,
      },

      // Trạng thái
      status: {
        id: event.status_now.id,
        name: event.status_now.name,
        color: event.status_now.color,
        type: getEventStatus(event.status_now),
      },

      // Nội dung chi tiết
      infoEvent: mappedInfoEvent,
      products: mappedProducts,

      // Metadata
      typeEventArticles: event.type_event_articles,
    }
  }, [eventDetail])

  // Show skeleton when loading
  if (isLoading) {
    return (
      <Container className="max-w-[1440px]">
        <EventDetailSkeleton />
      </Container>
    )
  }

  return (
    <Container className="max-w-[1440px] pt-[100px]">
      {/* ===== Header Event ===== */}
      {mappedEventData && (
        <HeaderEvent
          name={mappedEventData.name}
          content={mappedEventData.content}
          date={mappedEventData.time.formattedStartDate}
          status={{
            id: mappedEventData.status.id,
            name: mappedEventData.status.name,
            color: mappedEventData.status.color,
            type: mappedEventData.status.type as
              | 'coming'
              | 'happening'
              | 'ended',
          }}
        />
      )}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-8 ">
        <div className="col-span-1 lg:col-span-8">
          {/* ===== Event Content ===== */}
          {mappedEventData && (
            <EventContent
              mainImage={mappedEventData.mainImage}
              images={mappedEventData.images}
            />
          )}
          <div className="lg:hidden pt-5">
            {/* ===== Event Sidebar Mobile ===== */}
            {mappedEventData && (
              <EventSidebar
                sponsorName={
                  mappedEventData.sponsor.hasSponsor
                    ? mappedEventData.sponsor.name || 'M4U charity fund'
                    : 'M4U charity fund'
                }
                sponsorLogo={
                  mappedEventData.sponsor.hasSponsor
                    ? mappedEventData.sponsor.image ||
                      '/image/avatar/image-02.png'
                    : '/image/avatar/image-02.png'
                }
                products={mappedEventData.products?.map((product) => ({
                  image: product.image,
                  name: product.name,
                }))}
                totalPrizes={mappedEventData.stats.totalProduct}
                typeSponsor={mappedEventData.prizes.type_sponsor}
                totalPrizePool={mappedEventData.prizes.amount}
                time={mappedEventData.time.endDate}
                title={
                  mappedEventData.status.type === 'happening'
                    ? t('titles.eventHappening')
                    : mappedEventData.status.type === 'coming'
                    ? t('titles.eventComing')
                    : t('titles.eventEnded')
                }
                status={
                  mappedEventData.status.type === 'happening'
                    ? 'active'
                    : mappedEventData.status.type === 'coming'
                    ? 'coming_soon'
                    : 'expired'
                }
                registrationDate={mappedEventData.time.startDate}
                endDate={mappedEventData.time.endDate}
                onJoin={() => {
                  if (mappedEventData.status.type === 'happening') {
                    // Logic tham gia sự kiện đang diễn ra
                    console.log('Tham gia sự kiện:', mappedEventData.name)
                  } else if (mappedEventData.status.type === 'coming') {
                    // Logic đăng ký nhận thông báo
                    console.log('Đăng ký nhận thông báo:', mappedEventData.name)
                  } else {
                    // Sự kiện đã kết thúc - không làm gì
                    console.log('Sự kiện đã kết thúc')
                  }
                }}
              />
            )}
          </div>
          <div className="pt-5">
            {/* ===== Event Info Tabs ===== */}
            {mappedEventData && (
              <EventInfoTabs infoEvent={mappedEventData.infoEvent} />
            )}
            {/* gắn blog vào đây */}
            {/* <div className="pt-6">
              <EventBlog />
            </div> */}
          </div>
        </div>
        <div className="col-span-1 hidden lg:block lg:col-span-4 ">
          <div className="sticky lg:top-10 2xl:top-20 pb-10">
            {/* ===== Event Sidebar Desktop ===== */}
            {mappedEventData && (
              <EventSidebar
                sponsorName={
                  mappedEventData.sponsor.hasSponsor
                    ? mappedEventData.sponsor.name || 'M4U charity fund'
                    : 'M4U charity fund'
                }
                sponsorLogo={
                  mappedEventData.sponsor.hasSponsor
                    ? mappedEventData.sponsor.image ||
                      '/image/avatar/image-02.png'
                    : '/image/avatar/image-02.png'
                }
                products={mappedEventData.products?.map((product) => ({
                  image: product.image,
                  name: product.name,
                }))}
                totalPrizes={mappedEventData.stats.totalProduct}
                typeSponsor={mappedEventData.prizes.type_sponsor}
                totalPrizePool={mappedEventData.prizes.amount}
                time={mappedEventData.time.endDate}
                title={
                  mappedEventData.status.type === 'happening'
                    ? t('titles.eventHappening')
                    : mappedEventData.status.type === 'coming'
                    ? t('titles.eventComing')
                    : t('titles.eventEnded')
                }
                status={
                  mappedEventData.status.type === 'happening'
                    ? 'active'
                    : mappedEventData.status.type === 'coming'
                    ? 'coming_soon'
                    : 'expired'
                }
                registrationDate={mappedEventData.time.startDate}
                endDate={mappedEventData.time.endDate}
                onJoin={() => {
                  if (mappedEventData.status.type === 'happening') {
                    // Logic tham gia sự kiện đang diễn ra
                    console.log('Tham gia sự kiện:', mappedEventData.name)
                  } else if (mappedEventData.status.type === 'coming') {
                    // Logic đăng ký nhận thông báo
                    console.log('Đăng ký nhận thông báo:', mappedEventData.name)
                  } else {
                    // Sự kiện đã kết thúc - không làm gì
                    console.log('Sự kiện đã kết thúc')
                  }
                }}
              />
            )}
          </div>
        </div>
      </div>
    </Container>
  )
}

export default EventDetailSection
