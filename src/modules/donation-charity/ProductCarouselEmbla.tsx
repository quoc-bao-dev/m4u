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
    containScroll: 'trimSnaps',
    dragFree: false,
    slidesToScroll: 1,
    duration: 40
  })
  
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [previousIndex, setPreviousIndex] = useState(0)
  const [isWrapping, setIsWrapping] = useState(false)

  const originalProducts: Product[] = [
    {
      id: '1',
      brand: 'MANYO',
      productName: 'Panthetoin Deep Moisture Mask',
      contributionPercentage: 5,
      imageSrc: IMAGES.deal2,
      colorScheme: 'yellow'
    },
    {
      id: '2',
      brand: 'MANYO',
      productName: 'Panthetoin Deep Moisture Mask',
      contributionPercentage: 5,
      imageSrc: IMAGES.deal1,
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
    {
      id: '5',
      brand: 'MANYO',
      productName: 'Panthetoin Deep Moisture Mask',
      contributionPercentage: 5,
      imageSrc: IMAGES.deal1,
      colorScheme: 'pink'
    },
    {
      id: '6',
      brand: 'MANYO',
      productName: 'Panthetoin Deep Moisture Mask',
      contributionPercentage: 5,
      imageSrc: IMAGES.deal3,
      colorScheme: 'blue'
    },
    {
      id: '7',
      brand: 'MANYO',
      productName: 'Panthetoin Deep Moisture Mask',
      contributionPercentage: 5,
      imageSrc: IMAGES.deal1,
      colorScheme: 'green'
    },
    {
      id: '8',
      brand: 'MANYO',
      productName: 'Panthetoin Deep Moisture Mask',
      contributionPercentage: 5,
      imageSrc: IMAGES.deal1,
      colorScheme: 'pink'
    },
    {
      id: '9',
      brand: 'MANYO',
      productName: 'Panthetoin Deep Moisture Mask',
      contributionPercentage: 5,
      imageSrc: IMAGES.deal3,
      colorScheme: 'blue'
    },
    
  ]

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
    const total = originalProducts.length
    const wasAtEndToStart = previousIndex === total - 1 && currentIndex === 0
    const wasAtStartToEnd = previousIndex === 0 && currentIndex === total - 1

    if (wasAtEndToStart || wasAtStartToEnd) {
      setIsWrapping(true)
      // Tắt cờ ngay sau một frame để chặn animation vào lúc wrap
      requestAnimationFrame(() => setIsWrapping(false))
    }

    setPreviousIndex(currentIndex)
    setSelectedIndex(currentIndex)
  }, [previousIndex])

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

  return (
    <div className="w-full flex gap-6 items-end will-change-transform transform-gpu">
      <div className="flex-1 overflow-hidden will-change-transform transform-gpu">
        <div className="embla will-change-transform transform-gpu" ref={emblaRef}>
          <div className="embla__container flex items-end will-change-transform transform-gpu">
            {originalProducts.map((product, index) => {
              return (
                <div 
                  key={product.id}
                  className={`embla__slide mr-6 flex-shrink-0 flex justify-end items-end cursor-pointer will-change-transform transform-gpu ${isWrapping ? 'transition-none' : 'transition-transform duration-500 ease-out'}`}
                  onClick={() => handleCardClick(index)}
                >
                  <ProductCard
                    brand={product.brand}
                    productName={product.productName}
                    contributionPercentage={product.contributionPercentage}
                    imageSrc={product.imageSrc}
                    scale={1}
                    colorScheme={product.colorScheme}
                    widthClass="w-[280px]"
                    variant={index === selectedIndex ? 'main' : 'item'}
                    disableEnterAnimation={isWrapping}
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
