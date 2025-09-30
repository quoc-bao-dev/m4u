'use client'

import { Container } from '@/core/components'
import { useGetTopThreeProducts } from '@/services/product'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import TopProductCard from './TopProductCard'

const TopProductSection = () => {
  const t = useTranslations()
  const { data: topThreeProducts, isLoading } = useGetTopThreeProducts()
  const items = topThreeProducts?.data ?? []
  const placeholder = '/image/trial/image-question-1.png'

  return (
    <>
      <section className="bg-yellow-100 relative">
        <div className="absolute bottom-0 left-0 z-0 hidden md:block">
          <img
            src="/image/trial/image-decor-01.png"
            alt=""
            className="w-[400px]"
          />
        </div>
        <div className="absolute top-0 right-0 hidden md:block">
          <img
            src="/image/trial/image-decor-02.png"
            alt=""
            className="w-[100px]"
          />
        </div>
        <Container className="relative z-10">
          <div className="grid md:grid-cols-2 grid-cols-1">
            {/* Left */}
            <div className="h-full flex items-center md:pt-0 pt-10">
              <h2 className="text-title-sect text-gray-400 font-bold leading-[120%]">
                <span className="text-gray-900">
                  {t('topProduct.top3Products')}
                </span>{' '}
                {t('topProduct.mostCared')}
              </h2>
            </div>
            {/* Right */}
            <div className="h-full">
              <div className="pt-40 md:pt-50"></div>
              <div className="w-full flex items-center justify-center pt-5">
                <div className="relative w-[700px]">
                  {/* Left position (index 0) */}
                  <div className="absolute left-[17.14%] translate-x-[-50%] top-[17.95%] translate-y-[-50%]">
                    {isLoading ? (
                      <div className="relative z-10 scale-[60%] md:scale-[70%] lg:scale-[100%] size-[140px] rounded-full bg-gray-200 animate-pulse" />
                    ) : (
                      <TopProductCard
                        image={items[1]?.image || placeholder}
                        count={items[1]?.count_join ?? ''}
                        hideMeta={!items[1]}
                      />
                    )}
                  </div>
                  {/* Middle/top (index 1) */}
                  <div className="absolute left-[50.1%] translate-x-[-50%] top-[0%] translate-y-[-50%]">
                    {isLoading ? (
                      <div className="relative z-10 scale-[60%] md:scale-[70%] lg:scale-[100%] size-[140px] rounded-full bg-gray-200 animate-pulse" />
                    ) : (
                      <TopProductCard
                        isTop
                        image={items[0]?.image || placeholder}
                        count={items[0]?.count_join ?? ''}
                        hideMeta={!items[0]}
                      />
                    )}
                  </div>
                  {/* Right position (index 2) */}
                  <div className="absolute left-[82.86%] translate-x-[-50%]  top-[29.0%] translate-y-[-50%]">
                    {isLoading ? (
                      <div className="relative z-10 scale-[60%] md:scale-[70%] lg:scale-[100%] size-[140px] rounded-full bg-gray-200 animate-pulse" />
                    ) : (
                      <TopProductCard
                        image={items[2]?.image || placeholder}
                        count={items[2]?.count_join ?? ''}
                        hideMeta={!items[2]}
                      />
                    )}
                  </div>
                  {/* Names under items, hidden for placeholders and while loading */}
                  {!isLoading && items[1] && (
                    <div className="absolute left-[16.43%] translate-x-[-50%]  bottom-[5.54%] ">
                      <div className="w-[200px] text-center">
                        <p className="w-[50%] md:w-[80%] mx-auto text-gray-50 text-[12px] md:text-base">
                          {items[1].name}
                        </p>
                      </div>
                    </div>
                  )}

                  {!isLoading && items[0] && (
                    <div className="absolute left-[50.71%] translate-x-[-50%] bottom-[5.93%] translate-y-[-50%]">
                      <div className="w-[200px] text-center">
                        <p className="w-[50%] md:w-[80%] mx-auto text-gray-50 text-[12px] md:text-base">
                          {items[0].name}
                        </p>
                      </div>
                    </div>
                  )}

                  {!isLoading && items[2] && (
                    <div className="absolute right-[16.43%]  translate-x-[50%] bottom-[5.54%]">
                      <div className="w-[200px] text-center">
                        <p className="w-[50%] md:w-[80%] mx-auto text-gray-50 text-[12px] md:text-base">
                          {items[2].name}
                        </p>
                      </div>
                    </div>
                  )}
                  <Image
                    src="/image/trial/image-element-01.svg"
                    alt="image-01"
                    className="w-full"
                    width={300}
                    height={300}
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

export default TopProductSection
