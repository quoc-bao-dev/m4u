'use client'

import { Container } from '@/core/components/common/group'
import { Link } from '@/locale'
import { useGetProductList } from '@/services/product'
import FilterMobile from '../filters/FilterMobile'
import FilterSidebar from './FilterSidebar'
import ProductCard from './ProductCard'
import ScrollRevealCard from './ScrollRevealCard'
import { PRODUCTS_MOCK } from './mock'
import { useMemo } from 'react'

const ProductSection = () => {
  const { data: productList } = useGetProductList()

  console.log('[productList]', productList)

  const products = useMemo(() => {
    const items = productList?.data ?? []
    return items.map((p) => ({
      id: p.id,
      brand: p.code || 'Brand',
      productName: p.name,
      participation: 0,
      image: p.image,
      imageAlt: p.slug,
      rate: 0,
      // Lấy key màu từ API tại đây (ví dụ: p.color_hex) → gán vào hex/bgColor
      bgColor: undefined,
      hex: undefined,
      time: p.time_left_dd_hh_mm_ss ?? undefined,
    }))
  }, [productList])

  return (
    <>
      <section className="py-[96px] relative z-10">
        <Container>
          {/* Mobile Filter */}
          <FilterMobile />
          <div className="pt-5"></div>

          <div className="flex gap-5">
            <div className="md:block hidden">
              <FilterSidebar />
            </div>
            <div className="flex-1">
              <div className="grid grid-cols-1  md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4  gap-5">
                {(products.length ? products : PRODUCTS_MOCK).map(
                  (p, index) => (
                    <ScrollRevealCard
                      key={p.id}
                      delay={index * 0.1} // Stagger animation for each card
                      duration={0.6}
                    >
                      <Link href={`/product/${p.id}`}>
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
                        />
                      </Link>
                    </ScrollRevealCard>
                  )
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

export default ProductSection
