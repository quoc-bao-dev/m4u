'use client'
import { Skeleton } from '@/components/ui/skeleton'
import Rating from '@/core/components/common/Rating'
import { useDevice } from '@/core/hooks'
import { withAlpha } from '@/core/utils'
import { Link } from '@/locale'
import { StarIcon } from '@phosphor-icons/react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useRef } from 'react'

type SideImage = {
  image: string | any
  rating: number
}

const sideImages: SideImage[] = [
  {
    image:
      'https://cdn2.videowise.com/converted/videos/1747066892278_wid_NjgyMjIwMGMzZjJiOTAwMDU4OGMxZTNm_h264cmobile.mp4',
    rating: 4.9,
  },
  {
    image:
      'https://cdn2.videowise.com/converted/videos/1747066892278_wid_NjgyMjIwMGMzZjJiOTAwMDU4OGMxZTNm_h264cmobile.mp4',
    rating: 4.9,
  },
  {
    image:
      'https://cdn2.videowise.com/converted/videos/1747066892278_wid_NjgyMjIwMGMzZjJiOTAwMDU4OGMxZTNm_h264cmobile.mp4',
    rating: 4.9,
  },
]

const Similar = ({ data, isLoading, isError }: { data: any, isLoading: boolean, isError: boolean }) => {
  console.log(data)
  const { isMobile, isTablet } = useDevice()
  const tProduct = useTranslations('product')
  const firstVideoRefs = useRef<Record<string, HTMLVideoElement | null>>({})

  if (isError || (!isLoading && data?.length === 0)) {
    return null
  }

  return (
    <div className="flex flex-col justify-center items-center gap-4 lg:gap-10 py-12 xl:py-24 w-full px-3 lg:px-0">
      <h2 className="text-gradient-blue-black font-bold text-2xl lg:text-5xl 2xl:text-[64px] xl:leading-[120%] tracking-tight w-full text-center">
        {tProduct('exploreSimilarProducts')}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 xl:gap-10 2xl:gap-16 w-full">
        {isLoading ? (
          <>
            <Skeleton className="w-full aspect-square rounded-3xl" />
            <Skeleton className="w-full aspect-square rounded-3xl" />
          </>
        ) : (
          data?.map((product: any) => (
            <Link
              key={product.id}
              href={`/review-hub/${product.slug}`}
              className="group flex flex-col lg:flex-row gap-3 lg:gap-5 w-full"
            >
              <div className='bg-white rounded-3xl w-full aspect-square group-hover:shadow-[0px_8px_24px_0px_#00000014] transition-all duration-300'>
                <div className="relative rounded-3xl h-full aspect-square"
                  style={{ backgroundColor: withAlpha(product.background_color, 0.1) }}
                >
                  <div className="bg-white absolute bottom-3 left-3 right-3 flex flex-col gap-1 lg:gap-2 rounded-2xl p-4 xl:p-6">
                    <h2 className="text-sm xl:text-base font-bold text-greyscale-900">
                      {product.code}
                    </h2>
                    <h3 className="text-base xl:text-2xl lg:leading-[100%] font-normal text-greyscale-900 group-hover:text-[var(--hover-color)] transition-colors duration-300"
                      style={{
                        '--hover-color': product.background_color
                      } as React.CSSProperties & { '--hover-color': string }}>
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-3">
                      <Rating
                        value={Number(product.average_star ?? 5)}
                        readOnly
                        maxWidth={isMobile || isTablet ? 116 : 136}
                      />
                      <p className="whitespace-nowrap text-sm xl:text-lg 2xl:text-xl leading-[80%] text-greyscale-500">
                        <span className="text-greyscale-900 font-medium">
                          {product.average_star.toFixed(1)}{' '}
                        </span>
                        ({product.quantity_reviews} {tProduct('reviews')})
                      </p>
                    </div>
                  </div>
                  <Image
                    src={product.image}
                    alt="product"
                    width={1000}
                    height={1000}
                    className="size-full object-contain p-2 rounded-3xl"
                  />
                </div>
              </div>

              <div className="flex-shrink-0 flex lg:flex-col gap-3 xl:gap-5 w-full lg:w-fit overflow-auto scroll-hidden">
                {sideImages.map((item: any, index: number) => (
                  <div
                    key={`${product.id}-side-${index}`}
                    className="relative size-[120px] lg:size-[100px] xl:size-[145px] 2xl:size-[190px] flex-shrink-0 rounded-2xl overflow-hidden"
                  >
                    <div className="absolute top-1 lg:top-2 right-1 lg:right-2 py-0.5 px-1 h-fit flex items-center gap-1 bg-white rounded-full">
                      <StarIcon
                        weight="fill"
                        className="size-3 lg:size-4 text-yellow-600"
                      />
                      <span className="text-[10px] xl:text-sm font-medium text-greyscale-900">
                        {item.rating}
                      </span>
                    </div>
                    <video
                      ref={(el) => {
                        if (index === 0) {
                          firstVideoRefs.current[product.id] = el
                        }
                      }}
                      data-product-id={product.id}
                      data-index={index}
                      src={item.image as string}
                      muted
                      loop
                      playsInline
                      autoPlay={index === 0}
                      onMouseEnter={(e) => {
                        // Pause tất cả video khác trong cùng một product
                        sideImages.forEach((_, otherIndex) => {
                          if (otherIndex !== index) {
                            const videoElement = document.querySelector(`video[data-product-id="${product.id}"][data-index="${otherIndex}"]`) as HTMLVideoElement
                            if (videoElement) {
                              videoElement.pause()
                            }
                          }
                        })
                        e.currentTarget.play()
                      }}
                      onMouseLeave={(e) => {
                        if (index !== 0) {
                          const first = firstVideoRefs.current[product.id]
                          if (first) first.pause()
                        }
                      }}
                      width={1000}
                      height={1000}
                      className="cursor-pointer size-full rounded-2xl object-cover bg-[#D5DEDA]"
                    />
                  </div>
                ))}
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}

export default Similar
