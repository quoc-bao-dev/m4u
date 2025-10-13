'use client'

import { Container } from '@/core/components'
import { Link } from '@/locale'
import { useTranslations, useLocale } from 'next-intl'
import AnnouncementCountdownCard from './AnnouncementCountdownCard'
import { useGetInfoBannerEvent } from '@/services/event'
import {
  formatEventDate,
  formatEventDateForCountdown,
  formatBannerHeadline,
} from '../../utils'

const HeroSection = () => {
  const t = useTranslations('event.hero')
  const locale = useLocale() as 'vi' | 'en' | 'kr' | 'th' | 'cn'

  const { data: infoBannerEvent, isLoading, error } = useGetInfoBannerEvent()

  // Extract data from API response
  const bannerEvent = infoBannerEvent?.data?.banner_event
  const infoEvent = infoBannerEvent?.data?.info_event
  const imageBannerEvent =
    infoBannerEvent?.data?.image_banner_event ||
    '/image/event/image-blur-01.png'

  return (
    <>
      <section className="relative h-[100svh] pt-[100px] lg:pt-0 overflow-hidden">
        {/* ===== Background ===== */}
        <div className="absolute inset-0">
          <div className="w-full h-full">
            {/* image from api */}
            <img
              src={imageBannerEvent}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* ===== Content ===== */}
        <Container className="h-full relative flex items-end justify-center">
          <div className="md:absolute md:bottom-[15%] md:right-24 ">
            <Link href={`/event/${infoEvent?.slug || '1'}`}>
              <AnnouncementCountdownCard
                imageUrl="/image/event/image-02.png"
                imageAlt="Megaphone"
                targetDate={formatEventDateForCountdown(
                  infoEvent?.date_end_event || ''
                )}
                dateLabel={formatEventDate(
                  infoEvent?.date_end_event || '',
                  locale,
                  t('dateLabel')
                )}
                headline={formatBannerHeadline(
                  bannerEvent?.title_one,
                  bannerEvent?.title_two,
                  t('headline')
                )}
                buttonText={t('joinNow')}
                onJoin={() => alert('Joined!')}
              />
            </Link>
          </div>
        </Container>
      </section>
    </>
  )
}

export default HeroSection
