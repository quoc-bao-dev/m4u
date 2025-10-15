'use client'
import { useGetDonationsAndCharity } from '@/services/donations-and-charity'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useMemo } from 'react'

const GiveToDay = () => {
  const t = useTranslations('donationCharity.giveToday')

  const { data: donationsAndCharity, isLoading } = useGetDonationsAndCharity()

  const content = useMemo(() => {
    return donationsAndCharity?.data?.section4
  }, [donationsAndCharity])

  return (
    <div className="px-3 md:px-0 w-full">
      <div className="container-custom">
        <div className="w-full flex flex-col md:flex-row items-center gap-6 xl:gap-10 rounded-3xl bg-[#FFFAED] pb-10 md:pb-0">
          {/* Left: Image */}
          <div className="relative w-full md:w-1/2 aspect-[845/600] overflow-hidden rounded-3xl">
            {isLoading || !content?.image ? (
              <div className="absolute inset-0 bg-gray-200 animate-pulse" />
            ) : (
              <Image
                src={content?.image ?? ''}
                alt="influencer"
                fill
                className="object-cover"
                priority
              />
            )}
          </div>

          {/* Right: Content */}
          <div className="w-full md:flex-1 xl:pr-24 flex flex-col gap-2 lg:gap-4 text-left px-3 md:px-0">
            <h2
              className="text-[24px] lg:text-[40px] 2xl:text-[64px] font-bold leading-tight "
              {...(!isLoading && content?.title
                ? { dangerouslySetInnerHTML: { __html: content.title } }
                : {})}
            >
              {isLoading || !content?.title ? (
                <span className="inline-block w-5/6 h-8 lg:h-10 2xl:h-12 bg-gray-200 rounded animate-pulse" />
              ) : null}
              {/* {t('titleLead')}{' '}
              <span className="text-gradient-blue-black">{t('titleEnd')}</span>{' '}
              🫶🏻 */}
            </h2>
            <p
              className="text-gray-600 text-base lg:text-lg"
              {...(!isLoading && content?.content
                ? { dangerouslySetInnerHTML: { __html: content.content } }
                : {})}
            >
              {isLoading || !content?.content ? (
                <>
                  <span className="block w-full h-4 bg-gray-200 rounded animate-pulse mb-2" />
                  <span className="block w-4/5 h-4 bg-gray-200 rounded animate-pulse" />
                </>
              ) : null}
              {/* {t('subtitle')} */}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GiveToDay
