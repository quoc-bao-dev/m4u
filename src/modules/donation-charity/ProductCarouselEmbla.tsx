'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { IMAGES } from '@/core/constants/IMAGES'
import ProductCard from './ProductCard'
import { useGetProductDonationList } from '@/services/product-donation'

interface Product {
  id: string
  brand: string
  productName: string
  contributionPercentage: number
  imageSrc: string
  customColorHex?: string | null
}

const ProductCarouselEmbla = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true,
    slidesToScroll: 1,
    duration: 40,
  })

  const [selectedIndex, setSelectedIndex] = useState(0)

  const { data: products, isLoading } = useGetProductDonationList()

  const mappedProducts: Product[] = useMemo(() => {
    const list = (products?.data ?? []) as Array<any>

    return list.map((item: any, index: number) => {
      return {
        id: String(item.id),
        brand: item.code ?? '',
        productName: item.name ?? '',
        contributionPercentage: Number((item as any).contribute ?? 0),
        imageSrc: item.image || IMAGES.deal1,
        customColorHex: item.background_color ?? null,
      }
    })
  }, [products])

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) {
        emblaApi.scrollTo(index)
      }
    },
    [emblaApi]
  )

  const onInit = useCallback(() => {
    // Embla initialized
  }, [])

  const onSelect = useCallback((emblaApi: any) => {
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onInit()
    onSelect(emblaApi)
    emblaApi.on('reInit', onInit)
    emblaApi.on('select', onSelect)

    return () => {
      emblaApi.off('reInit', onInit)
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi, onInit, onSelect])

  const handleCardClick = (index: number) => {
    scrollTo(index)
  }

  return (
    <div className="w-full flex gap-6 items-end will-change-transform transform-gpu">
      <div className="flex-1 overflow-hidden will-change-transform transform-gpu">
        <div
          className="-mt-[10%] lg:-mt-[5%] 2xl:-mt-[0%] embla will-change-transform transform-gpu"
          ref={emblaRef}
        >
          <div className="embla__container flex items-end will-change-transform transform-gpu">
            {isLoading &&
              Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={`skeleton-${index}`}
                  className={`embla__slide mr-3 xl:mr-6 flex-shrink-0 flex justify-end items-end will-change-transform transform-gpu`}
                >
                  <div className="w-[150px] lg:w-[280px] flex flex-col items-center">
                    <div className="relative w-[90%] aspect-[265/298]">
                      <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-md" />
                    </div>
                    <div className="w-full mt-4 bg-gray-200 h-4 rounded animate-pulse" />
                    <div className="w-3/4 mt-2 bg-gray-100 h-3 rounded animate-pulse" />
                    <div className="w-full mt-3 h-6 bg-gray-200 rounded-b-md animate-pulse" />
                  </div>
                </div>
              ))}

            {!isLoading &&
              mappedProducts.map((product, index) => {
                return (
                  <div
                    key={product.id}
                    className={`embla__slide mr-3 xl:mr-6 flex-shrink-0 flex justify-end items-end cursor-pointer will-change-transform transform-gpu`}
                    onClick={() => handleCardClick(index)}
                  >
                    <ProductCard
                      brand={product.brand}
                      productName={product.productName}
                      contributionPercentage={product.contributionPercentage}
                      imageSrc={product.imageSrc}
                      scale={1}
                      customColorHex={product.customColorHex || undefined}
                      widthClass="w-[150px] lg:w-[380px]"
                      variant={index === selectedIndex ? 'main' : 'item'}
                      disableEnterAnimation={false}
                      className={index === selectedIndex ? '' : ''}
                    />
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCarouselEmbla
