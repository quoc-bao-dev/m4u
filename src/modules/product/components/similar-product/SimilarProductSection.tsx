'use client'

import { Container } from '@/core/components/common/group'
import ProductCard from '@/modules/trial-registration/components/product/ProductCard'
import { useGetProductRelationList } from '@/services/product'
import useEmblaCarousel from 'embla-carousel-react'
import { useMemo } from 'react'
import { sProductIdSignal } from '../../store/sProductIdSignal'
import { Link, useTranslation } from '@/locale'

const SimilarProductSection = () => {
  const { t } = useTranslation()
  const productId = sProductIdSignal.use()

  const { data: productRelationList, isLoading } = useGetProductRelationList({
    id: productId ?? '',
  })

  // Map dữ liệu từ productRelationList thành carousel items với useMemo
  const carouselItems = useMemo(() => {
    if (!productRelationList?.data) return []

    return productRelationList.data.map((product) => ({
      id: product.id.toString(),
      slug: product.slug,
      brand: 'Brand', // Có thể cần lấy từ API hoặc hardcode
      productName: product.name,
      participation: product.count_join, // Default value, có thể cần lấy từ API
      rate: product.average_star,
      limitPeople: product.limit_people,
      image: product.image,
      imageAlt: product.name,
      bgColor: product.background_color || '#FFF7ED',
      hex: product.color_header || '#FF8500',
      time:
        product.time_left_dd_hh_mm_ss === '0:00:00:00' ||
        !product.time_left_dd_hh_mm_ss
          ? undefined
          : product.time_left_dd_hh_mm_ss,
    }))
  }, [productRelationList?.data])

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    containScroll: 'trimSnaps',
    slidesToScroll: 1,
    dragFree: false,
    inViewThreshold: 0.7,
    duration: 25,
    breakpoints: {
      '(min-width: 640px)': {
        slidesToScroll: 1,
        dragFree: false,
        inViewThreshold: 0.7,
        duration: 25,
      },
      '(min-width: 768px)': {
        slidesToScroll: 1,
        dragFree: false,
        inViewThreshold: 0.7,
        duration: 25,
      },
    },
  })

  if (carouselItems.length === 0) {
    return null
  }

  return (
    <section className="py-[40px] md:py-[96px]">
      <Container className="overflow-hidden">
        <div className="text-center">
          <h2 className="text-title-sect font-extrabold leading-tight text-[#0B0B0B]">
            {t('product.exploreSimilarProducts')}
          </h2>
        </div>

        <div className="pt-10"></div>

        <div className="relative xl:px-24">
          {isLoading ? (
            <div className="overflow-visible sm:overflow-hidden">
              <div className="flex w-full">
                {[1, 2, 3].map((index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-4/5 sm:w-1/2 md:w-1/3 px-2 h-full flex justify-center"
                  >
                    <div className="h-full w-full max-w-sm xl:max-w-md">
                      <div className="bg-gray-50 rounded-3xl shadow-[0px_4px_24px_0px_#0000000F] h-fit select-none w-full animate-pulse">
                        <div className="rounded-t-3xl relative overflow-hidden w-full">
                          <div className="w-full h-[400px] md:h-[320px] lg:h-[370px] xl:h-[400px] bg-gray-200 rounded-t-3xl"></div>
                        </div>
                        <div className="p-4 sm:p-5 flex flex-col gap-1 rounded-b-3xl w-full bg-gray-100">
                          <div className="h-4 bg-gray-200 rounded w-16"></div>
                          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                          <div className="py-1">
                            <div className="h-1 sm:h-1.5 bg-gray-200 rounded-full w-full"></div>
                          </div>
                          <div className="h-4 bg-gray-200 rounded w-20"></div>
                          <div className="h-10 bg-gray-200 rounded-2xl w-full mt-2"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div
              className="overflow-visible sm:overflow-hidden"
              ref={emblaRef}
              style={{
                touchAction: 'pan-y pinch-zoom',
                WebkitOverflowScrolling: 'touch',
              }}
            >
              <div className="flex w-full">
                {carouselItems.map((p) => (
                  <div
                    key={p.id}
                    className="flex-shrink-0 w-4/5 sm:w-1/2 md:w-1/3 px-2 h-full flex justify-center"
                  >
                    <div className="h-full w-full max-w-sm xl:max-w-md">
                      <Link href={`/product/${p.slug}`}>
                        <ProductCard
                          brand={p.brand}
                          productName={p.productName}
                          participation={p.participation}
                          limitPeople={p.limitPeople}
                          image={p.image}
                          imageAlt={p.imageAlt}
                          rate={p.rate}
                          bgColor={p.bgColor}
                          hex={p.hex}
                          time={p.time}
                          classNameImage="xl:h-[400px]"
                          className="h-full flex flex-col"
                        />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  )
}

export default SimilarProductSection
