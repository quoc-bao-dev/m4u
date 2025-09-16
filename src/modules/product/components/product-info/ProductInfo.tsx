'use client'

import { Container, RevertContainer, Timer } from '@/core/components'
import { useGetProductDetail } from '@/services/product'
import useEmblaCarousel from 'embla-carousel-react'
import WheelGesturesPlugin from 'embla-carousel-wheel-gestures'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import RightContent from './RightContent'
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

            <div className="pt-4 flex items-end gap-3">
              <p>Share:</p>
              <div className="flex gap-6 md:gap-2">
                <FbIcon />
                <XIcon />
                <LinkedinIcon />
                <RedditIcon />
              </div>
            </div>
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

const FbIcon = () => {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21 3.5H16.6667C13.9052 3.5 11.6667 5.73857 11.6667 8.5V11.6667H7V16.3333H11.6667V24.5H16.3333V16.3333H21V11.6667H16.3333V9.16667C16.3333 8.61438 16.781 8.16667 17.3333 8.16667H21V3.5Z"
        fill="#4B5563"
      />
    </svg>
  )
}

const XIcon = () => {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.3807 2.22119H25.3164L16.718 12.0486L26.8333 25.4215H18.9131L12.7097 17.3109L5.61161 25.4215H1.67351L10.8703 14.91L1.16667 2.22119H9.28797L14.8953 9.63458L21.3807 2.22119ZM19.9994 23.0658H22.1802L8.10297 4.45318H5.76271L19.9994 23.0658Z"
        fill="#4B5563"
      />
    </svg>
  )
}

const LinkedinIcon = () => {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_18353_23140)">
        <path
          d="M25.9273 0H2.06719C0.924219 0 0 0.902344 0 2.01797V25.9766C0 27.0922 0.924219 28 2.06719 28H25.9273C27.0703 28 28 27.0922 28 25.982V2.01797C28 0.902344 27.0703 0 25.9273 0ZM8.30703 23.8602H4.15078V10.4945H8.30703V23.8602ZM6.22891 8.67344C4.89453 8.67344 3.81719 7.59609 3.81719 6.26719C3.81719 4.93828 4.89453 3.86094 6.22891 3.86094C7.55781 3.86094 8.63516 4.93828 8.63516 6.26719C8.63516 7.59062 7.55781 8.67344 6.22891 8.67344ZM23.8602 23.8602H19.7094V17.3633C19.7094 15.8156 19.682 13.8195 17.5492 13.8195C15.3891 13.8195 15.0609 15.5094 15.0609 17.2539V23.8602H10.9156V10.4945H14.8969V12.3211H14.9516C15.5039 11.2711 16.8602 10.1609 18.8781 10.1609C23.0836 10.1609 23.8602 12.9281 23.8602 16.5266V23.8602Z"
          fill="#4B5563"
        />
      </g>
      <defs>
        <clipPath id="clip0_18353_23140">
          <rect width="28" height="28" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

const RedditIcon = () => {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.8481 6.60181C17.091 7.63103 18.0152 8.39775 19.1188 8.39775C20.4072 8.39775 21.4517 7.35322 21.4517 6.06478C21.4517 4.77634 20.4072 3.73181 19.1188 3.73181C17.9922 3.73181 17.0527 4.53025 16.8339 5.59228C14.9472 5.79462 13.4739 7.39478 13.4739 9.334C13.4739 9.33837 13.4739 9.34166 13.4739 9.34603C11.4221 9.43244 9.54846 10.0165 8.06096 10.9385C7.50861 10.5109 6.81518 10.256 6.06268 10.256C4.25689 10.256 2.79346 11.7195 2.79346 13.5253C2.79346 14.8356 3.56346 15.9643 4.6758 16.486C4.78408 20.2813 8.91955 23.334 14.0066 23.334C19.0936 23.334 23.2346 20.2781 23.3374 16.4795C24.441 15.9545 25.2044 14.829 25.2044 13.5263C25.2044 11.7206 23.741 10.2571 21.9352 10.2571C21.186 10.2571 20.4958 10.5098 19.9446 10.9342C18.4439 10.0056 16.5496 9.4215 14.4769 9.34384C14.4769 9.34056 14.4769 9.33838 14.4769 9.33509C14.4769 7.94603 15.5094 6.79322 16.8481 6.604V6.60181ZM7.92971 15.6001C7.98439 14.4145 8.77189 13.5045 9.68736 13.5045C10.6028 13.5045 11.3028 14.4659 11.2481 15.6515C11.1935 16.8371 10.5099 17.2681 9.5933 17.2681C8.67674 17.2681 7.87502 16.7857 7.92971 15.6001ZM18.3269 13.5045C19.2435 13.5045 20.031 14.4145 20.0846 15.6001C20.1392 16.7857 19.3364 17.2681 18.421 17.2681C17.5055 17.2681 16.8208 16.8382 16.7661 15.6515C16.7114 14.4659 17.4103 13.5045 18.3269 13.5045ZM17.2375 18.3432C17.4092 18.3607 17.5186 18.539 17.4519 18.6987C16.8886 20.0451 15.5586 20.9912 14.0066 20.9912C12.4546 20.9912 11.1256 20.0451 10.5613 18.6987C10.4946 18.539 10.6039 18.3607 10.7756 18.3432C11.7819 18.2415 12.8702 18.1857 14.0066 18.1857C15.143 18.1857 16.2302 18.2415 17.2375 18.3432Z"
        fill="#4B5563"
      />
    </svg>
  )
}

export default ProductInfo
