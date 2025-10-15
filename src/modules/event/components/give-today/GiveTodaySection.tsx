'use client'
import { Container, Section } from '@/core/components'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useGetInfoBannerEvent } from '@/services/event'

const GiveTodaySection = () => {
  const { data: infoBannerEvent } = useGetInfoBannerEvent()
  const t = useTranslations('donationCharity.giveToday')
  return (
    <Section className=" py-8 md:py-14">
      <Container className="">
        <div className="flex flex-col lg:flex-row items-center gap-6 xl:gap-10 rounded-[48px] overflow-hidden bg-[#FFFAED] pb-10 md:pb-0">
          {/* Left: Image */}
          <div
            className="relative w-full lg:w-1/2 overflow-hidden rounded-3xl max-w-[800px] "
            style={{ aspectRatio: '845/600' }}
          >
            <Image
              src={infoBannerEvent?.data.image_footer_banner_event!}
              alt="influencer"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Right: Content */}
          <div className="w-full md:flex-1 md:max-w-[620px] text-center md:text-left">
            <p
              className="text-[24px] lg:text-[40px] 2xl:text-[64px] font-bold leading-tight text-[#0F172A]"
              dangerouslySetInnerHTML={{
                __html: infoBannerEvent?.data.banner_event.footer_title!,
              }}
            >
              {/* <span className="text-gray-400">{t('titleLead')}</span>{' '}
              {t('titleEnd')} 🫶🏻 */}
            </p>
            <p
              className="mt-4 text-gray-600 text-base sm:text-lg"
              dangerouslySetInnerHTML={{
                __html: infoBannerEvent?.data.banner_event.footer_content!,
              }}
            >
              {/* {t('subtitle')} */}
            </p>
          </div>
        </div>
      </Container>
    </Section>
  )
}

export default GiveTodaySection
