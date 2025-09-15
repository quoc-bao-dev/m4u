'use client'

import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { IMAGES } from '@/core/constants/IMAGES'
import ProductCard from './ProductCard'

interface Product {
  id: string
  brand: string
  productName: string
  contributionPercentage: number
  imageSrc: string
  colorScheme: 'yellow' | 'pink' | 'blue' | 'green'
}

const ProductCarouselEmbla = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'start',
    containScroll: false,
    dragFree: false,
    slidesToScroll: 1
  })
  
  const [selectedIndex, setSelectedIndex] = useState(0)

  const originalProducts: Product[] = [
    {
      id: '1',
      brand: 'MANYO',
      productName: 'Panthetoin Deep Moisture Mask',
      contributionPercentage: 5,
      imageSrc: IMAGES.deal1,
      colorScheme: 'yellow'
    },
    {
      id: '2',
      brand: 'MANYO',
      productName: 'Panthetoin Deep Moisture Mask',
      contributionPercentage: 5,
      imageSrc: IMAGES.deal2,
      colorScheme: 'pink'
    },
    {
      id: '3',
      brand: 'MANYO',
      productName: 'Panthetoin Deep Moisture Mask',
      contributionPercentage: 5,
      imageSrc: IMAGES.deal3,
      colorScheme: 'blue'
    },
    {
      id: '4',
      brand: 'MANYO',
      productName: 'Panthetoin Deep Moisture Mask',
      contributionPercentage: 5,
      imageSrc: IMAGES.deal1,
      colorScheme: 'green'
    },
  ]

  // Tạo array để loop - duplicate products để có đủ slides
  const loopedProducts = [...originalProducts, ...originalProducts, ...originalProducts]

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) {
      emblaApi.scrollTo(index)
    }
  }, [emblaApi])

  const onInit = useCallback(() => {
    // Embla initialized
  }, [])

  const onSelect = useCallback((emblaApi: any) => {
    const currentIndex = emblaApi.selectedScrollSnap()
    // Tính toán index thực tế trong originalProducts
    const realIndex = currentIndex % originalProducts.length
    setSelectedIndex(realIndex)
  }, [originalProducts.length])

  useEffect(() => {
    if (emblaApi) {
      onInit()
      onSelect(emblaApi)
      emblaApi.on('reInit', onInit)
      emblaApi.on('select', onSelect)
    }
  }, [emblaApi, onInit, onSelect])

  const handleCardClick = (index: number) => {
    const originalIndex = index % originalProducts.length
    setSelectedIndex(originalIndex)
    scrollTo(index)
  }

  // Khởi tạo carousel ở giữa để có thể loop
  useEffect(() => {
    if (emblaApi) {
      // Bắt đầu từ slide giữa để có thể scroll cả 2 hướng
      const middleIndex = originalProducts.length
      emblaApi.scrollTo(middleIndex, false) // false = không animation
    }
  }, [emblaApi, originalProducts.length])

  return (
    <div className="w-full">
      <div className="embla" ref={emblaRef}>
        <div className="embla__container flex items-end">
          {loopedProducts.map((product, index) => {
            const originalIndex = index % originalProducts.length
            return (
              <div 
                key={`${product.id}-${index}`}
                className="embla__slide flex-shrink-0 flex justify-center cursor-pointer"
                onClick={() => handleCardClick(index)}
              >
                <ProductCard
                  brand={product.brand}
                  productName={product.productName}
                  contributionPercentage={product.contributionPercentage}
                  imageSrc={product.imageSrc}
                  scale={originalIndex === selectedIndex ? 1 : 0.8}
                  colorScheme={product.colorScheme}
                  className={originalIndex === selectedIndex ? '' : ''}
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ProductCarouselEmbla
