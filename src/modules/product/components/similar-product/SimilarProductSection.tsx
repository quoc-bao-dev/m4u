'use client'

import { Container } from '@/core/components/common/group'
import ProductCard from '@/modules/trial-registration/components/product/ProductCard'
import { useGetProductRelationList } from '@/services/product'
import useEmblaCarousel from 'embla-carousel-react'
import { useMemo } from 'react'
import { sProductIdSignal } from '../../store/sProductIdSignal'

const SimilarProductSection = () => {
  const productId = sProductIdSignal.use()

  const { data: productRelationList, isLoading } = useGetProductRelationList({
    id: productId ?? '',
  })

  // Map dữ liệu từ productRelationList thành carousel items với useMemo
  const carouselItems = useMemo(() => {
    if (!productRelationList?.data) return []

    return productRelationList.data.map((product) => ({
      id: product.id.toString(),
      brand: 'Brand', // Có thể cần lấy từ API hoặc hardcode
      productName: product.name,
      participation: 70, // Default value, có thể cần lấy từ API
      image: product.image,
      imageAlt: product.name,
      rate: 4.9, // Default value, có thể cần lấy từ API
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

  return (
    <section className="py-[40px] md:py-[96px]">
      <Container className="overflow-hidden">
        <div className="text-center">
          <h2 className="text-title-sect font-extrabold leading-tight text-[#0B0B0B]">
            Explore Similar Products
          </h2>
        </div>

        <div className="pt-10"></div>

        <div className="relative xl:px-24">
          {isLoading ? (
            <div className="flex justify-center items-center py-10">
              <div className="text-lg">Loading similar products...</div>
            </div>
          ) : carouselItems.length === 0 ? (
            <div className="flex justify-center items-center py-10">
              <div className="text-lg text-gray-500">
                No similar products found
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
                      <ProductCard
                        brand={p.brand}
                        productName={p.productName}
                        participation={p.participation}
                        image={p.image}
                        imageAlt={p.imageAlt}
                        rate={p.rate}
                        bgColor={p.bgColor}
                        hex={p.hex}
                        time={p.time}
                        classNameImage="xl:h-[400px]"
                        className="h-full flex flex-col"
                      />
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
