'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { Container } from '@/core/components/common/group'
import { Link } from '@/locale'
import { useGetProductList } from '@/services/product'
import { useMemo } from 'react'
import FilterMobile from '../filters/FilterMobile'
import FilterSidebar from './FilterSidebar'
import ProductCard from './ProductCard'
import ScrollRevealCard from './ScrollRevealCard'

const ProductSection = () => {
  const { data: productList, isLoading } = useGetProductList()

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
              <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4  gap-5">
                {isLoading
                  ? Array.from({ length: 8 }).map((_, index) => (
                      <div key={index} className="bg-gray-50- rounded-3xl">
                        <div className="relative shadow-[0px_4px_24px_0px_#0000000F] rounded-3xl h-fit select-none w-full">
                          <div className="rounded-t-3xl relative overflow-hidden w-full">
                            <div className="absolute top-4 left-4 flex items-center gap-1 bg-white rounded-full py-0.5 px-1.5 text-base font-medium">
                              <Skeleton className="h-5 w-16" />
                            </div>
                            <Skeleton className="w-full h-[200px] md:h-[220px] xl:h-[300px] rounded-t-3xl" />
                            <div className="h-[54px]" />
                          </div>
                          <div className="p-4 sm:p-5 flex flex-col gap-2 rounded-b-3xl w-full">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-5 w-3/4" />
                            <div className="py-1">
                              <Skeleton className="h-1.5 w-full" />
                            </div>
                            <Skeleton className="h-4 w-40" />
                            <Skeleton className="h-10 w-40 rounded-full mt-2" />
                          </div>
                        </div>
                      </div>
                    ))
                  : products.map((p, index) => (
                      <ScrollRevealCard
                        key={p.id}
                        delay={index * 0.1}
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
