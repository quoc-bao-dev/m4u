import { Container } from '@/core/components/common/group'
import FilterSidebar from './FilterSidebar'
import ProductCard from './ProductCard'
import { PRODUCTS_MOCK } from './mock'

const ProductSection = () => (
  <section className="py-[96px]">
    <Container>
      <div className="flex gap-5">
        <div className="md:block hidden">
          <FilterSidebar />
        </div>
        <div className="flex-1">
          <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-5">
            {PRODUCTS_MOCK.map((p) => (
              <div key={p.id}>
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  </section>
)

export default ProductSection
