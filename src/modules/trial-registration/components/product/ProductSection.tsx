'use client'

import { Container } from '@/core/components/common/group'
import { Link } from '@/locale'
import { useGetProductList } from '@/services/product'
import { useMemo } from 'react'
import FilterMobile from '../filters/FilterMobile'
import FilterSidebar from './FilterSidebar'
import ProductCard from './ProductCard'
import ScrollRevealCard from './ScrollRevealCard'

const ProductSection = () => {
  const { data: productList } = useGetProductList()

  console.log('[productList]', productList)

  const products = useMemo(() => {
    const items = productList?.data ?? []
    return items.map((p) => ({
      id: p.id,
      slug: p.slug,
      brand: p.code || 'Brand',
      productName: p.name,
      participation: 70,
      image: p.image,
      imageAlt: p.slug,
      rate: 0,
      // Lấy key màu từ API tại đây (ví dụ: p.color_hex) → gán vào hex/bgColor
      bgColor: p.color_header,
      hex: p.background_color,
      time:
        p.time_left_dd_hh_mm_ss === '0:00:00:00'
          ? undefined
          : p.time_left_dd_hh_mm_ss,
    }))
  }, [productList])

  console.log('[products]', products)

  return (
    <>
      <section className="py-[96px] relative z-40">
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
                {products.map((p, index) => (
                  <ScrollRevealCard
                    key={p.id}
                    delay={index * 0.1} // Stagger animation for each card
                    duration={0.6}
                  >
                    <Link href={`/product/${p.slug}`}>
                      <ProductCard
                        brand={p.brand}
                        productName={p.productName}
                        participation={p.participation}
                        image={p.image}
                        imageAlt={p.imageAlt}
                        rate={p.rate}
                        bgColor={p.bgColor!}
                        hex={p.hex!}
                        time={p.time!}
                      />
                    </Link>
                  </ScrollRevealCard>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

export default ProductSection
