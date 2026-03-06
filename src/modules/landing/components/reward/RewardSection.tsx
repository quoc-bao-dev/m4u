'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { Container, Section } from '@/core/components'
import { useGetHomePage } from '@/services/home/queries'
import Image from 'next/image'
import React from 'react'
import RewardCard from './RewardCard'

interface RewardCardData {
  img: string
  subtitle: string
  title: string
}

const RewardSection = () => {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null)
  const { isLoading, data: homePage } = useGetHomePage()
  const data = homePage?.section3
  const rewardCards: RewardCardData[] = data?.tab || []

  return (
    <div className="py-[48px] md:py-[96px]">
      <Section>
        {isLoading ? (
          <Skeleton className="w-4/5 h-24 mx-auto" />
        ) : (
          <h2
            className="text-[24px] sm:text-[32px] md:text-[64px] text-gray-700 font-bold text-center"
            dangerouslySetInnerHTML={{ __html: data?.title }}
          >
            {/* ✨ Khám phá những ưu đãi đặc biệt */}
          </h2>
        )}
        {isLoading ? (
          <Skeleton className="w-3/5 mt-2 h-9 mx-auto" />
        ) : (
          <div
            className="text-[18px] md:text-[24px] text-gray-700 text-center"
            dangerouslySetInnerHTML={{ __html: data?.subtitle }}
          >
            {/* Trải nghiệm các sản phẩm hot nhất mà không tốn một xu. */}
          </div>
        )}

        <div className="md:pt-20"></div>
        <Container className="max-w-full md:max-w-[1150px] px-4">
          <div className="mt-10 relative flex  md:flex-row items-stretch justify-between gap-4 md:gap-10 w-full">
            {isLoading
              ? // Skeleton loading cho reward cards
                Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="flex-1">
                    <Skeleton className="w-full h-48 rounded-lg" />
                  </div>
                ))
              : rewardCards.map((card: RewardCardData, index: number) => {
                  // Cấu hình màu sắc và icon cho từng card
                  const cardConfigs = [
                    {
                      bgColor: 'bg-[#E8FBF5]',
                      elasticColor: '#E8FBF5',
                      baseRotate: 0,
                      rotateOnHover: 0,
                      disableElastic: false,
                    },
                    {
                      bgColor: 'bg-[#FDEAB7]',
                      elasticColor: '#FDEAB7',
                      baseRotate: -10,
                      rotateOnHover: -8,
                      disableElastic: false,
                    },
                    {
                      bgColor: 'bg-[#E7F7FE]',
                      elasticColor: '#E7F7FE',
                      baseRotate: 0,
                      rotateOnHover: -8,
                      disableElastic: true,
                    },
                  ]

                  const config = cardConfigs[index] || cardConfigs[0]

                  return (
                    <div
                      key={index}
                      className={`transition-transform duration-200 ease-out ${
                        activeIndex !== null && activeIndex !== index
                          ? 'md:translate-x-6'
                          : ''
                      }`}
                    >
                      <RewardCard
                        icon={
                          <Image
                            src={card.img}
                            alt={card.title ||''}
                            width={31}
                            height={31}
                          />
                        }
                        label={card.title}
                        title={card.subtitle}
                        bgColor={config.bgColor}
                        // iconColor={config.iconColor}
                        elasticColor={config.elasticColor}
                        isActive={activeIndex === index}
                        isDimmed={activeIndex !== null && activeIndex !== index}
                        onMouseEnter={() => setActiveIndex(index)}
                        onMouseLeave={() => setActiveIndex(null)}
                        baseRotate={config.baseRotate}
                        rotateOnHover={config.rotateOnHover}
                        disableElastic={config.disableElastic}
                        activeScale={activeIndex === index ? 1.08 : 1.05}
                      />
                    </div>
                  )
                })}
          </div>
        </Container>
      </Section>
    </div>
  )
}

export default RewardSection
