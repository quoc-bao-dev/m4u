'use client'

import { Container } from '@/core/components/common/group'
import ProductCard from '@/modules/trial-registration/components/product/ProductCard'
import useEmblaCarousel from 'embla-carousel-react'

const SIMILAR_PRODUCTS = [
  {
    id: 'sp-1',
    brand: 'MANYO',
    productName: 'Panthetoin Deep Moisture Mask',
    participation: 70,
    image: '/image/home/deal1.png',
    imageAlt: 'Panthetoin Deep Moisture Mask',
    rate: 4.9,
    bgColor: '#FFE7EF',
    hex: '#FF7896',
    time: '19:25:00',
  },
  {
    id: 'sp-2',
    brand: 'celimax',
    productName: 'Pore Dark Spot Brightening Ampoule',
    participation: 70,
    image: '/image/home/deal2.png',
    imageAlt: 'Brightening Ampoule',
    rate: 4.9,
    bgColor: '#FFF3D6',
    hex: '#FFB200',
    time: '19:25:00',
  },
  {
    id: 'sp-3',
    brand: 'ANUA',
    productName: 'Hyaluronic Deep Moisture Mask',
    participation: 70,
    image: '/image/home/deal3.png',
    imageAlt: 'Hyaluronic Deep Moisture Mask',
    rate: 4.9,
    bgColor: '#E6FFF7',
    hex: '#00D09E',
    time: '19:25:00',
  },
]

const SimilarProductSection = () => {
  const [emblaRef] = useEmblaCarousel({
    loop: true,
    align: 'center',
    containScroll: 'trimSnaps',
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
          <div className="overflow-visible" ref={emblaRef}>
            <div className="flex w-full">
              {SIMILAR_PRODUCTS.map((p) => (
                <div key={p.id} className="px-2 sm:basis-1/3">
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
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default SimilarProductSection
