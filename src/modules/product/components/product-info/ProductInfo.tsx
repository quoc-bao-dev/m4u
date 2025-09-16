'use client'

import { Container, RevertContainer, Timer } from '@/core/components'
import { useGetProductDetail } from '@/services/product'
import useEmblaCarousel from 'embla-carousel-react'
import WheelGesturesPlugin from 'embla-carousel-wheel-gestures'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import RightContent from './RightContent'
import Share from './Share'
import { sProductIdSignal } from '../../store/sProductIdSignal'

const ProductInfo = () => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [emblaRef] = useEmblaCarousel(
    {
      align: 'start',
      containScroll: 'trimSnaps',
      dragFree: true,
      loop: true,
    },
    [WheelGesturesPlugin()]
  )

  const { slug } = useParams()

  const { data: productDetail, isLoading } = useGetProductDetail({
    slug: slug as string,
  })

  useEffect(() => {
    if (productDetail?.data.id) {
      sProductIdSignal.set(productDetail.data.id.toString())
    }
    return () => {
      sProductIdSignal.set(null)
    }
  }, [productDetail])

  const detail = productDetail?.data
  const images = (() => {
    const merged = [
      ...(detail?.image ? [detail.image] : []),
      ...(Array.isArray(detail?.list_images)
        ? detail!.list_images.filter(Boolean)
        : []),
    ]
    // Dedupe while preserving order
    const seen = new Set<string>()
    return merged.filter((src) => {
      if (seen.has(src)) return false
      seen.add(src)
      return true
    })
  })()

  if (isLoading) {
    return (
      <section className="py-[96px]">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-[24px] items-start">
            {/* LEFT Skeleton */}
            <div className="md:col-span-4 md:sticky md:top-20 self-start">
              <div className="relative aspect-[3/3] md:aspect-[6/7.5] w-full rounded-2xl overflow-hidden bg-gray-200 animate-pulse" />
              <div className="mt-2 relative">
                <div className="pointer-events-none absolute right-0 top-0 h-full w-10 md:w-16 z-10 bg-gradient-to-l from-gray-50 to-transparent" />
                <div className="overflow-hidden">
                  <div className="flex">
                    {Array.from({ length: 6 }).map((_, idx) => (
                      <div
                        key={idx}
                        className="size-[80px] md:size-[100px] rounded-lg bg-gray-200 animate-pulse shrink-0 mr-2 last:mr-0"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT Skeleton */}
            <div className="md:col-span-8">
              <div className="md:h-fit">
                <RevertContainer className="md:mx-0!">
                  <div className="w-full bg-yellow-100 py-5 px-6 md:p-[48px] md:rounded-3xl">
                    <div className="h-5 w-20 bg-gray-200 rounded animate-pulse" />
                    <div className="mt-2 h-8 w-2/3 bg-gray-200 rounded animate-pulse" />
                    <div className="mt-4 h-6 w-1/3 bg-gray-200 rounded animate-pulse" />
                    <div className="mt-6 h-10 w-40 bg-gray-200 rounded animate-pulse" />
                    <div className="mt-8 space-y-3">
                      {Array.from({ length: 4 }).map((_, idx) => (
                        <div
                          key={idx}
                          className="h-24 w-full bg-gray-200 rounded animate-pulse"
                        />
                      ))}
                    </div>
                  </div>
                </RevertContainer>
              </div>
            </div>
          </div>
        </Container>
      </section>
    )
  }

  return (
    <section className="py-[96px]">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-[24px] items-start">
          {/* LEFT: Hình ảnh (STICKY) */}
          <div className="md:col-span-4 md:sticky md:top-20 self-start">
            <div className="relative aspect-[3/3] md:aspect-[6/7.5] w-full rounded-2xl overflow-hidden">
              <Image
                src={images[selectedIndex] || '/image/product/image-01.png'}
                alt="product-image"
                fill
                className="object-cover"
                priority
              />
              {detail?.time_left_dd_hh_mm_ss &&
              detail?.time_left_dd_hh_mm_ss !== '0:00:00:00' ? (
                <div className="md:hidden absolute bottom-2 right-2">
                  <Timer
                    initTime={
                      (detail?.time_left_dd_hh_mm_ss as string) || '00:00:00'
                    }
                  />
                </div>
              ) : null}
            </div>

            <div className="mt-2 relative">
              <div className="pointer-events-none absolute right-0 top-0 h-full w-10 md:w-16 z-10 bg-gradient-to-l from-gray-50 to-transparent" />
              <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                  {images.map((src, idx) => (
                    <button
                      key={src}
                      onClick={() => setSelectedIndex(idx)}
                      className="shrink-0 mr-2 cursor-pointer"
                    >
                      <img
                        src={src}
                        alt={`product-thumb-${idx}`}
                        className={`size-[80px] md:size-[100px] object-cover rounded-lg border-2 ${
                          selectedIndex === idx
                            ? 'border-gray-200'
                            : 'border-transparent'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <Share />
          </div>

          {/* RIGHT: Nội dung */}
          <div className="md:col-span-8">
            <div className="md:h-fit">
              <RevertContainer className="md:mx-0!">
                <RightContent
                  name={detail?.name || ''}
                  time={detail?.time_left_dd_hh_mm_ss || undefined}
                  ingredients={detail?.ingredients || []}
                  rate={detail?.average_star || 0}
                  quantityReviews={detail?.quantity_reviews || 0}
                  limitPeople={detail?.limit_people || 0}
                  participation={detail?.count_join || 0}
                />
              </RevertContainer>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

// Icons moved into Share component

export default ProductInfo
