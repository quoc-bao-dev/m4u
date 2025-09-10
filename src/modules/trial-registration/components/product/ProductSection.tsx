'use client'

import { Container } from '@/core/components/common/group'
import FilterMobile from '../filters/FilterMobile'
import FilterSidebar from './FilterSidebar'
import ProductCard from './ProductCard'
import ScrollRevealCard from './ScrollRevealCard'
import { PRODUCTS_MOCK } from './mock'
import { Link } from '@/locale'

const ProductSection = () => (
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
            <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-5">
              {PRODUCTS_MOCK.map((p, index) => (
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
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  </>
)

export default ProductSection
