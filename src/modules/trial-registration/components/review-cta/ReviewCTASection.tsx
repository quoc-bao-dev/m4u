'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { Container } from '@/core/components'
import { useGetHomePage } from '@/services/home/queries'
import { useTranslations } from 'next-intl'
import { useMemo } from 'react'
import ReviewCTACarousel from './ReviewCTACarousel'

const ReviewCTASection = () => {
  const t = useTranslations('reviewCTA')
  const { isLoading, data: homePage } = useGetHomePage()

  const items = useMemo(() => {
    const list = homePage?.list_review_new ?? []
    return list.slice(0, 3).map((p: any) => {
      const limit = Number(p?.limit_people) || 0
      const joined = Number(p?.count_join) || 0
      const progress =
        limit > 0 ? Math.min(100, Math.max(0, (joined / limit) * 100)) : 0
      const time =
        p?.time_left_dd_hh_mm_ss && p?.time_left_dd_hh_mm_ss !== '0:00:00:00'
          ? p.time_left_dd_hh_mm_ss
          : ''

      return {
        reviewerImage: p?.image || '',
        reviewerAlt: 'reviewer',
        reviewerVideo: p?.video_review || undefined,
        productImage: p?.image_product || '',
        productAlt: p?.slug || 'product',
        brandName: p?.code || 'Brand',
        productName: p?.name || '',
        timeInfo: time,
        progressPercentage: progress,
        participationText: `${joined}/${limit} ${t('participation')}`,
        buttonText: t('registerTrial'),
      }
    })
  }, [homePage, t])

  return (
    <>
      <div className="md:pt-30"></div>

      <section className="py-[96px] bg-[#FBF7F0]">
        <Container className="px-0 md:pr-0!">
          <div className="flex flex-col md:flex-row gap-6 items-center relative">
            <div className="md:w-[40%] flex justify-center">
              <h2 className="text-center text-title-sect leading-[120%] md:text-[56px] lg:text-[64px] font-bold text-gray-400">
                {t('title')}{' '}
                <span className="text-gray-900">{t('become')}</span>
                <br />
                <span className="text-gray-900">{t('reviewerNow')}</span>
              </h2>
            </div>

            {/* Mobile: Center carousel, Desktop: Keep original layout */}
            <div className="w-full md:w-[60%] relative">
              {/* Mobile: Center the carousel */}
              <div className="overflow-hidden  md:absolute md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 w-full flex justify-center px-8 md:px-0">
                <div className="overflow-hidden -ml-[300px] -mr-[300px] md:ml-0 md:mr-0">
                  {isLoading ? (
                    <Skeleton className="w-[900px] max-w-full md:h-[600px] h-[550px] rounded-3xl" />
                  ) : (
                    <ReviewCTACarousel items={items} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
      <div className="md:pt-30"></div>
    </>
  )
}

export default ReviewCTASection
