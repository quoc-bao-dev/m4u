'use client'

import { Container } from '@/core/components/common/group'
import { ProductList } from '.'
import FilterMobile from '../filters/FilterMobile'
import FilterSidebar from './FilterSidebar'

const ProductSection = () => {
  // state and fetching moved down to ProductList

  return (
    <>
      <section className="py-12 xl:py-[96px] relative z-40">
        <Container className="px-3">
          {/* Mobile Filter */}
          <FilterMobile />
          <div className="flex gap-5 re">
            <div className="md:block hidden sticky top-20">
              <FilterSidebar />
            </div>
            <div className="flex-1">
              <ProductList />
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

export default ProductSection
